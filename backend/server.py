from fastapi import FastAPI, APIRouter, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'kerjaai')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="KerjaAI API", version="1.0.0", description="AI-powered Job Platform for Indonesia")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ─── Models ──────────────────────────────────────────────────────────────────

class ApplicationCreate(BaseModel):
    job_id: str
    user_name: str
    user_email: str
    cover_letter: Optional[str] = None

class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    user_name: str
    user_email: str
    cover_letter: Optional[str] = None
    applied_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class StatusCheckCreate(BaseModel):
    client_name: str

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ─── Health & Status ─────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "KerjaAI API v1.0.0", "status": "online"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c['timestamp'], str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return checks


# ─── Jobs ────────────────────────────────────────────────────────────────────

@api_router.get("/jobs", response_model=List[Dict[str, Any]])
async def get_jobs(
    search: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    mode: Optional[str] = Query(None),
    industry: Optional[str] = Query(None),
    sort_by: str = Query("match"),
    limit: int = Query(50, le=100),
    skip: int = Query(0),
):
    query: Dict[str, Any] = {}
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"company": {"$regex": search, "$options": "i"}},
            {"skills": {"$elemMatch": {"$regex": search, "$options": "i"}}},
        ]
    if region and region != "all":
        query["region"] = region
    if mode and mode != "all":
        query["mode"] = {"$regex": mode, "$options": "i"}
    if industry and industry != "all":
        query["industry"] = industry

    sort_key = "match" if sort_by in ("match", "salary") else "_id"
    sort_dir = -1 if sort_by in ("match", "salary") else 1

    jobs = await db.jobs.find(query, {"_id": 0}).sort(sort_key, sort_dir).skip(skip).limit(limit).to_list(limit)
    return jobs


@api_router.get("/jobs/{job_id}", response_model=Dict[str, Any])
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


# ─── Applications ─────────────────────────────────────────────────────────────

@api_router.post("/applications", response_model=Dict[str, Any])
async def create_application(data: ApplicationCreate):
    job = await db.jobs.find_one({"id": data.job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing = await db.applications.find_one({"job_id": data.job_id, "user_email": data.user_email})
    if existing:
        raise HTTPException(status_code=409, detail="Anda sudah melamar pekerjaan ini")

    application = Application(**data.model_dump())
    doc = application.model_dump()
    doc['applied_at'] = doc['applied_at'].isoformat()
    await db.applications.insert_one(doc)
    await db.jobs.update_one({"id": data.job_id}, {"$inc": {"applicants": 1}})

    return {"success": True, "application_id": application.id, "message": "Lamaran berhasil dikirim!"}


@api_router.get("/applications", response_model=List[Dict[str, Any]])
async def get_applications(email: str = Query(...)):
    apps = await db.applications.find({"user_email": email}, {"_id": 0}).to_list(200)
    for a in apps:
        if isinstance(a.get('applied_at'), str):
            a['applied_at'] = a['applied_at']
    return apps


# ─── Courses ─────────────────────────────────────────────────────────────────

@api_router.get("/courses", response_model=List[Dict[str, Any]])
async def get_courses(
    category: Optional[str] = Query(None),
    level: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
):
    query: Dict[str, Any] = {}
    if category and category != "all":
        query["category"] = category
    if level and level != "all":
        query["level"] = level
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"provider": {"$regex": search, "$options": "i"}},
            {"skills": {"$elemMatch": {"$regex": search, "$options": "i"}}},
        ]
    courses = await db.courses.find(query, {"_id": 0}).sort("rating", -1).to_list(100)
    return courses


@api_router.get("/courses/{course_id}", response_model=Dict[str, Any])
async def get_course(course_id: int):
    course = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


# ─── Career Paths ─────────────────────────────────────────────────────────────

@api_router.get("/career-paths", response_model=List[Dict[str, Any]])
async def get_career_paths():
    paths = await db.career_paths.find({}, {"_id": 0}).to_list(50)
    return paths


@api_router.get("/career-paths/{path_id}", response_model=Dict[str, Any])
async def get_career_path(path_id: str):
    path = await db.career_paths.find_one({"id": path_id}, {"_id": 0})
    if not path:
        raise HTTPException(status_code=404, detail="Career path not found")
    return path


# ─── Dashboard Stats ─────────────────────────────────────────────────────────

@api_router.get("/stats")
async def get_stats():
    stats = await db.stats.find_one({"type": "dashboard"}, {"_id": 0})
    if not stats:
        return {
            "totalMatches": 1690,
            "applied": 636,
            "interviews": 24,
            "skillScore": 78,
            "activeJobs": 50000,
            "totalUsers": 200000,
            "companies": 5000,
            "aiAccuracy": 94,
        }
    stats.pop("type", None)
    return stats


@api_router.get("/stats/regions", response_model=List[Dict[str, Any]])
async def get_region_stats():
    regions = await db.region_stats.find({}, {"_id": 0}).to_list(20)
    return regions


@api_router.get("/stats/industries", response_model=List[Dict[str, Any]])
async def get_industry_stats():
    industries = await db.industry_stats.find({}, {"_id": 0}).to_list(20)
    return industries


# ─── Skill Profiles ─────────────────────────────────────────────────────────

@api_router.get("/skill-profiles/{role}", response_model=Dict[str, Any])
async def get_skill_profile(role: str):
    profile = await db.skill_profiles.find_one({"id": role}, {"_id": 0})
    if not profile:
        raise HTTPException(status_code=404, detail="Skill profile not found")
    return profile


@api_router.get("/skill-profiles", response_model=List[Dict[str, Any]])
async def get_skill_profiles():
    profiles = await db.skill_profiles.find({}, {"_id": 0}).to_list(50)
    return profiles


# ─── App Assembly ────────────────────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    try:
        from seed import (
            JOBS, COURSES, CAREER_PATHS, SKILL_PROFILES,
            REGION_STATS, INDUSTRY_STATS, DASHBOARD_STATS,
        )
        collections = {
            "jobs": JOBS, "courses": COURSES,
            "career_paths": CAREER_PATHS, "skill_profiles": SKILL_PROFILES,
            "region_stats": REGION_STATS, "industry_stats": INDUSTRY_STATS,
        }
        for col_name, data in collections.items():
            if data and await db[col_name].count_documents({}) == 0:
                await db[col_name].insert_many(data)
                logger.info(f"Seeded {col_name}: {len(data)} dokumen")
        await db.stats.update_one(
            {"type": "dashboard"}, {"$set": DASHBOARD_STATS}, upsert=True
        )
        await db.jobs.create_index([("id", 1)], unique=True)
        await db.jobs.create_index([("region", 1), ("match", -1)])
        await db.jobs.create_index([("title", "text"), ("company", "text")])
        await db.courses.create_index([("id", 1)], unique=True)
        await db.courses.create_index([("category", 1), ("rating", -1)])
        await db.career_paths.create_index([("id", 1)], unique=True)
        await db.skill_profiles.create_index([("id", 1)], unique=True)
        await db.applications.create_index(
            [("job_id", 1), ("user_email", 1)], unique=True
        )
    except Exception as e:
        logger.error(f"Startup seed error: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=False)
