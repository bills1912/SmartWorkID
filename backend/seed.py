"""
KerjaAI Database Seed Script
Jalankan: python seed.py
Atau saat di Railway: python seed.py (satu kali setelah deploy)
"""
import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'kerjaai')

# ─── Seed Data ───────────────────────────────────────────────────────────────

JOBS = [
    {
        "id": "job-1", "title": "Senior Frontend Developer", "company": "Tokopedia",
        "location": "Jakarta", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 20-35 Jt", "match": 96,
        "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        "posted": "2 hari lalu", "applicants": 45, "region": "jakarta", "industry": "tech",
        "description": "Kami mencari Senior Frontend Developer yang berpengalaman untuk memimpin pengembangan antarmuka pengguna produk kami yang melayani jutaan pengguna di Indonesia.",
        "requirements": [
            "Minimal 5 tahun pengalaman di React",
            "Pengalaman mendalam dengan TypeScript",
            "Familiar dengan CI/CD pipeline",
            "Kemampuan leadership dan mentoring yang baik",
            "Pengalaman dengan design system skala besar",
        ],
        "matchBreakdown": {"skill": 97, "experience": 94, "culture": 96, "salary": 95, "growth": 98},
    },
    {
        "id": "job-2", "title": "Data Scientist", "company": "Gojek",
        "location": "Jakarta", "type": "Full-time", "mode": "On-site",
        "salary": "Rp 25-40 Jt", "match": 88,
        "skills": ["Python", "TensorFlow", "SQL", "Statistics"],
        "posted": "3 hari lalu", "applicants": 62, "region": "jakarta", "industry": "tech",
        "description": "Bergabunglah dengan tim data science kami untuk mengembangkan model machine learning yang berdampak langsung pada produk yang digunakan jutaan pengguna setiap hari.",
        "requirements": [
            "Master/S2 di bidang Computer Science, Statistics, atau bidang terkait",
            "3+ tahun pengalaman Machine Learning production",
            "Expert di Python, Pandas, scikit-learn, TensorFlow/PyTorch",
            "Pengalaman dengan cloud platform (GCP/AWS)",
            "Kemampuan komunikasi data yang baik",
        ],
        "matchBreakdown": {"skill": 90, "experience": 85, "culture": 88, "salary": 90, "growth": 87},
    },
    {
        "id": "job-3", "title": "Product Manager", "company": "Bukalapak",
        "location": "Bandung", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 18-30 Jt", "match": 82,
        "skills": ["Agile", "Analytics", "Strategy", "SQL"],
        "posted": "1 hari lalu", "applicants": 38, "region": "bandung", "industry": "tech",
        "description": "Kami mencari Product Manager yang berpengalaman untuk memimpin pengembangan fitur baru platform e-commerce kami.",
        "requirements": [
            "3+ tahun pengalaman sebagai Product Manager",
            "Pemahaman Agile/Scrum yang kuat",
            "Kemampuan analitis dan data-driven decision making",
            "Komunikasi lintas fungsi yang sangat baik",
            "Pengalaman dengan product analytics tools",
        ],
        "matchBreakdown": {"skill": 80, "experience": 78, "culture": 85, "salary": 84, "growth": 86},
    },
    {
        "id": "job-4", "title": "UI/UX Designer", "company": "Traveloka",
        "location": "Jakarta", "type": "Full-time", "mode": "Remote",
        "salary": "Rp 15-25 Jt", "match": 91,
        "skills": ["Figma", "Design System", "User Research", "Prototyping"],
        "posted": "5 hari lalu", "applicants": 71, "region": "jakarta", "industry": "tech",
        "description": "Posisi untuk designer yang passionate dalam menciptakan pengalaman pengguna yang luar biasa untuk produk travel kami.",
        "requirements": [
            "Portfolio yang kuat dengan case studies",
            "3+ tahun pengalaman UX/Product Design",
            "Expert di Figma dan tools prototyping",
            "Pemahaman design thinking dan human-centered design",
            "Pengalaman dengan usability testing",
        ],
        "matchBreakdown": {"skill": 92, "experience": 88, "culture": 94, "salary": 90, "growth": 91},
    },
    {
        "id": "job-5", "title": "DevOps Engineer", "company": "OVO",
        "location": "Surabaya", "type": "Full-time", "mode": "On-site",
        "salary": "Rp 20-32 Jt", "match": 79,
        "skills": ["AWS", "Docker", "Kubernetes", "Terraform"],
        "posted": "1 minggu lalu", "applicants": 28, "region": "surabaya", "industry": "fintech",
        "description": "Bergabunglah untuk mengelola infrastruktur cloud kami yang melayani jutaan transaksi setiap hari.",
        "requirements": [
            "4+ tahun pengalaman DevOps/SRE",
            "AWS/GCP certified (minimal Associate level)",
            "Expert Docker & Kubernetes orchestration",
            "Scripting lanjutan (Bash, Python)",
            "Pengalaman dengan monitoring stack (Grafana, Prometheus)",
        ],
        "matchBreakdown": {"skill": 76, "experience": 80, "culture": 82, "salary": 78, "growth": 80},
    },
    {
        "id": "job-6", "title": "Marketing Analyst", "company": "Shopee",
        "location": "Jakarta", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 12-18 Jt", "match": 75,
        "skills": ["Google Analytics", "SQL", "Excel", "Marketing Strategy"],
        "posted": "4 hari lalu", "applicants": 89, "region": "jakarta", "industry": "ecommerce",
        "description": "Kami mencari Marketing Analyst yang data-driven untuk mengoptimalkan kampanye marketing e-commerce kami.",
        "requirements": [
            "2+ tahun pengalaman marketing analytics",
            "Expert Google Analytics & Google Ads",
            "SQL proficiency untuk data extraction",
            "Strong presentation dan communication skills",
            "Pengalaman A/B testing",
        ],
        "matchBreakdown": {"skill": 72, "experience": 74, "culture": 78, "salary": 76, "growth": 75},
    },
    {
        "id": "job-7", "title": "Mobile Developer (Flutter)", "company": "Dana",
        "location": "Yogyakarta", "type": "Full-time", "mode": "Remote",
        "salary": "Rp 15-25 Jt", "match": 86,
        "skills": ["Flutter", "Dart", "Firebase", "REST API"],
        "posted": "2 hari lalu", "applicants": 34, "region": "yogyakarta", "industry": "fintech",
        "description": "Kembangkan aplikasi mobile fintech yang digunakan oleh jutaan pengguna di Indonesia.",
        "requirements": [
            "3+ tahun Flutter/Dart development",
            "Apps yang sudah published di Play Store/App Store",
            "Pemahaman state management (Bloc/Riverpod)",
            "Pengalaman integrasi payment gateway",
            "Unit & widget testing experience",
        ],
        "matchBreakdown": {"skill": 88, "experience": 84, "culture": 86, "salary": 85, "growth": 88},
    },
    {
        "id": "job-8", "title": "Backend Engineer (Go)", "company": "Xendit",
        "location": "Jakarta", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 22-38 Jt", "match": 84,
        "skills": ["Go", "PostgreSQL", "gRPC", "Microservices"],
        "posted": "6 hari lalu", "applicants": 41, "region": "jakarta", "industry": "fintech",
        "description": "Bangun sistem payment infrastructure yang reliable, scalable, dan aman untuk transaksi lintas negara.",
        "requirements": [
            "4+ tahun Go development di production",
            "Microservices architecture pattern",
            "Database optimization PostgreSQL/MySQL",
            "System design untuk high-traffic systems",
            "Pengalaman dengan message queues (Kafka/RabbitMQ)",
        ],
        "matchBreakdown": {"skill": 82, "experience": 84, "culture": 86, "salary": 85, "growth": 83},
    },
    {
        "id": "job-9", "title": "Cloud Architect", "company": "Telkom Indonesia",
        "location": "Jakarta", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 35-55 Jt", "match": 72,
        "skills": ["AWS", "Azure", "Cloud Architecture", "Security"],
        "posted": "3 hari lalu", "applicants": 19, "region": "jakarta", "industry": "telco",
        "description": "Rancang dan implementasikan arsitektur cloud enterprise untuk transformasi digital Telkom Indonesia.",
        "requirements": [
            "7+ tahun pengalaman cloud architecture",
            "Multi-cloud expertise (AWS, Azure, GCP)",
            "Enterprise security & compliance knowledge",
            "Experience dengan cloud migration projects",
            "Cloud certifications (Professional/Expert level)",
        ],
        "matchBreakdown": {"skill": 70, "experience": 73, "culture": 75, "salary": 80, "growth": 72},
    },
    {
        "id": "job-10", "title": "QA Engineer (Automation)", "company": "Grab",
        "location": "Jakarta", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 14-22 Jt", "match": 80,
        "skills": ["Selenium", "Cypress", "Python", "API Testing"],
        "posted": "Hari ini", "applicants": 23, "region": "jakarta", "industry": "tech",
        "description": "Pastikan kualitas produk ride-hailing dan fintech kami melalui automation testing yang komprehensif.",
        "requirements": [
            "3+ tahun QA Automation experience",
            "Expert Selenium WebDriver / Cypress",
            "API testing dengan Postman/RestAssured",
            "CI/CD integration (Jenkins/GitHub Actions)",
            "Performance testing (JMeter/k6)",
        ],
        "matchBreakdown": {"skill": 82, "experience": 78, "culture": 82, "salary": 80, "growth": 79},
    },
    {
        "id": "job-11", "title": "Business Intelligence Analyst", "company": "Indofood",
        "location": "Surabaya", "type": "Full-time", "mode": "On-site",
        "salary": "Rp 10-15 Jt", "match": 69,
        "skills": ["Power BI", "SQL", "Excel", "Data Warehousing"],
        "posted": "5 hari lalu", "applicants": 56, "region": "surabaya", "industry": "fmcg",
        "description": "Bantu tim eksekutif membuat keputusan bisnis berbasis data untuk salah satu perusahaan FMCG terbesar di Indonesia.",
        "requirements": [
            "2+ tahun BI/Data Analytics",
            "Expert Power BI atau Tableau",
            "SQL untuk data manipulation",
            "Pemahaman business process FMCG/Retail",
            "Presentasi eksekutif yang efektif",
        ],
        "matchBreakdown": {"skill": 68, "experience": 70, "culture": 72, "salary": 68, "growth": 67},
    },
    {
        "id": "job-12", "title": "iOS Developer (Swift)", "company": "Bank BCA",
        "location": "Jakarta", "type": "Full-time", "mode": "Hybrid",
        "salary": "Rp 18-28 Jt", "match": 78,
        "skills": ["Swift", "SwiftUI", "Xcode", "Core Data"],
        "posted": "1 minggu lalu", "applicants": 31, "region": "jakarta", "industry": "fintech",
        "description": "Develop fitur baru untuk aplikasi mobile banking BCA yang digunakan puluhan juta nasabah.",
        "requirements": [
            "4+ tahun iOS/Swift development",
            "SwiftUI & UIKit proficiency",
            "Experience dengan banking/fintech security",
            "App Store deployment experience",
            "Unit testing & TDD",
        ],
        "matchBreakdown": {"skill": 80, "experience": 76, "culture": 80, "salary": 79, "growth": 77},
    },
]

COURSES = [
    {
        "id": 1, "title": "Fullstack JavaScript Developer Path",
        "provider": "Dicoding Indonesia", "category": "web", "level": "Intermediate",
        "duration": "120 jam", "students": 15420, "rating": 4.9, "price": "Rp 299.000",
        "progress": 0, "enrolled": False, "modules": 12, "completed": 0,
        "description": "Kuasai JavaScript dari dasar hingga fullstack development dengan React dan Node.js. Dilengkapi proyek nyata dan sertifikat.",
        "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Express.js"],
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
    },
    {
        "id": 2, "title": "Data Science & Machine Learning",
        "provider": "Coursera (deeplearning.ai)", "category": "data", "level": "Advanced",
        "duration": "80 jam", "students": 23100, "rating": 4.8, "price": "Rp 499.000",
        "progress": 0, "enrolled": False, "modules": 10, "completed": 0,
        "description": "Pelajari data science dan machine learning dari nol hingga mahir bersama Andrew Ng. Bahasa Python.",
        "skills": ["Python", "TensorFlow", "Statistics", "SQL", "Pandas"],
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    },
    {
        "id": 3, "title": "Product Management Fundamentals",
        "provider": "LinkedIn Learning", "category": "business", "level": "Beginner",
        "duration": "40 jam", "students": 8930, "rating": 4.7, "price": "Rp 199.000",
        "progress": 0, "enrolled": False, "modules": 8, "completed": 0,
        "description": "Fondasi product management untuk memulai atau berpindah karir menjadi Product Manager.",
        "skills": ["Agile", "Analytics", "Strategy", "UX", "Roadmapping"],
        "image": "https://images.pexels.com/photos/7654403/pexels-photo-7654403.jpeg?w=400&h=250&fit=crop",
    },
    {
        "id": 4, "title": "UI/UX Design Masterclass",
        "provider": "Udemy", "category": "design", "level": "Intermediate",
        "duration": "60 jam", "students": 12500, "rating": 4.8, "price": "Rp 349.000",
        "progress": 0, "enrolled": False, "modules": 15, "completed": 0,
        "description": "Kuasai desain UI/UX dari teori hingga praktik dengan Figma. Dari wireframe hingga high-fidelity prototype.",
        "skills": ["Figma", "Design System", "Prototyping", "User Research", "Accessibility"],
        "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    },
    {
        "id": 5, "title": "Cloud Computing with AWS",
        "provider": "AWS Academy", "category": "cloud", "level": "Intermediate",
        "duration": "50 jam", "students": 6780, "rating": 4.6, "price": "Rp 399.000",
        "progress": 0, "enrolled": False, "modules": 9, "completed": 0,
        "description": "Belajar cloud computing dan persiapan sertifikasi AWS Solutions Architect Associate.",
        "skills": ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
        "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
    },
    {
        "id": 6, "title": "TypeScript Advanced Patterns",
        "provider": "Frontend Masters", "category": "web", "level": "Advanced",
        "duration": "35 jam", "students": 5200, "rating": 4.9, "price": "Rp 249.000",
        "progress": 0, "enrolled": False, "modules": 7, "completed": 0,
        "description": "Kuasai TypeScript tingkat lanjut: generics, utility types, decorators, dan type-safe patterns.",
        "skills": ["TypeScript", "JavaScript", "Design Patterns", "Node.js"],
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    },
    {
        "id": 7, "title": "Digital Marketing & Growth Hacking",
        "provider": "Google Digital Garage", "category": "marketing", "level": "Beginner",
        "duration": "45 jam", "students": 18900, "rating": 4.6, "price": "Gratis",
        "progress": 0, "enrolled": False, "modules": 10, "completed": 0,
        "description": "Pelajari digital marketing, SEO, SEM, social media marketing, dan growth hacking dari Google.",
        "skills": ["Google Analytics", "SEO", "SEM", "Social Media", "Content Marketing"],
        "image": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop",
    },
    {
        "id": 8, "title": "Flutter Mobile Development",
        "provider": "Udemy", "category": "mobile", "level": "Intermediate",
        "duration": "75 jam", "students": 9340, "rating": 4.7, "price": "Rp 279.000",
        "progress": 0, "enrolled": False, "modules": 14, "completed": 0,
        "description": "Buat aplikasi Android dan iOS dari satu codebase dengan Flutter dan Dart. Termasuk state management dan Firebase.",
        "skills": ["Flutter", "Dart", "Firebase", "REST API", "Bloc Pattern"],
        "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    },
]

CAREER_PATHS = [
    {
        "id": "frontend",
        "title": "Frontend Developer",
        "icon": "Code",
        "currentRole": "Junior Frontend Developer",
        "currentSalary": "Rp 6-10 Jt",
        "paths": [
            {
                "id": "specialist",
                "name": "Frontend Specialist Track",
                "description": "Mendalami frontend engineering, dari UI hingga arsitektur",
                "nodes": [
                    {
                        "level": 1, "role": "Junior Frontend Dev", "salary": "Rp 6-10 Jt",
                        "timeline": "Sekarang", "status": "current",
                        "skills": ["HTML/CSS", "JavaScript", "React Basics"],
                        "milestones": ["Build 3+ production apps", "Master CSS layouts"],
                    },
                    {
                        "level": 2, "role": "Mid Frontend Dev", "salary": "Rp 12-18 Jt",
                        "timeline": "1-2 tahun", "status": "next",
                        "skills": ["TypeScript", "State Management", "Testing", "Performance"],
                        "milestones": ["Lead a frontend module", "Implement design system"],
                        "gap": {"skill": "TypeScript", "current": 40, "needed": 75},
                    },
                    {
                        "level": 3, "role": "Senior Frontend Dev", "salary": "Rp 20-35 Jt",
                        "timeline": "3-5 tahun", "status": "future",
                        "skills": ["Architecture", "Mentoring", "CI/CD", "System Design"],
                        "milestones": ["Design frontend architecture", "Mentor 3+ juniors"],
                        "gap": {"skill": "System Design", "current": 15, "needed": 80},
                    },
                    {
                        "level": 4, "role": "Staff Engineer / Principal", "salary": "Rp 40-65 Jt",
                        "timeline": "6-8 tahun", "status": "future",
                        "skills": ["Technical Strategy", "Cross-team Leadership", "Innovation"],
                        "milestones": ["Define technical direction", "Impact company-wide"],
                        "gap": {"skill": "Technical Leadership", "current": 5, "needed": 85},
                    },
                ],
            },
            {
                "id": "management",
                "name": "Engineering Manager Track",
                "description": "Dari engineer ke people manager dan engineering leader",
                "nodes": [
                    {
                        "level": 1, "role": "Junior Frontend Dev", "salary": "Rp 6-10 Jt",
                        "timeline": "Sekarang", "status": "current",
                        "skills": ["HTML/CSS", "JavaScript", "Teamwork"],
                        "milestones": ["Master fundamentals", "Contribute to team"],
                    },
                    {
                        "level": 2, "role": "Mid Frontend Dev", "salary": "Rp 12-18 Jt",
                        "timeline": "2-3 tahun", "status": "next",
                        "skills": ["Technical Skills", "Leadership Basics", "Project Management"],
                        "milestones": ["Lead small project", "Mentor 1 junior"],
                        "gap": {"skill": "Leadership", "current": 35, "needed": 65},
                    },
                    {
                        "level": 3, "role": "Tech Lead", "salary": "Rp 25-40 Jt",
                        "timeline": "4-6 tahun", "status": "future",
                        "skills": ["Team Leadership", "Architecture", "Stakeholder Management"],
                        "milestones": ["Lead team of 5+", "Deliver major projects"],
                        "gap": {"skill": "People Management", "current": 10, "needed": 75},
                    },
                    {
                        "level": 4, "role": "Engineering Manager", "salary": "Rp 40-70 Jt",
                        "timeline": "7-10 tahun", "status": "future",
                        "skills": ["People Management", "Strategy", "Budget"],
                        "milestones": ["Grow engineering org", "Define hiring strategy"],
                        "gap": {"skill": "Org Management", "current": 5, "needed": 80},
                    },
                ],
            },
        ],
    },
    {
        "id": "data_scientist",
        "title": "Data Scientist",
        "icon": "BarChart3",
        "currentRole": "Junior Data Analyst",
        "currentSalary": "Rp 7-12 Jt",
        "paths": [
            {
                "id": "ml_engineer",
                "name": "ML Engineer Track",
                "description": "Dari data analyst ke machine learning engineer",
                "nodes": [
                    {
                        "level": 1, "role": "Junior Data Analyst", "salary": "Rp 7-12 Jt",
                        "timeline": "Sekarang", "status": "current",
                        "skills": ["SQL", "Python Basics", "Excel", "Data Viz"],
                        "milestones": ["Build 5+ dashboards", "Complete SQL certification"],
                    },
                    {
                        "level": 2, "role": "Data Analyst", "salary": "Rp 12-20 Jt",
                        "timeline": "1-2 tahun", "status": "next",
                        "skills": ["Advanced Python", "Statistics", "ML Basics", "Pandas"],
                        "milestones": ["Deploy 1st ML model", "Lead analytics project"],
                        "gap": {"skill": "Machine Learning", "current": 30, "needed": 70},
                    },
                    {
                        "level": 3, "role": "Data Scientist", "salary": "Rp 20-35 Jt",
                        "timeline": "3-5 tahun", "status": "future",
                        "skills": ["Deep Learning", "MLOps", "Feature Engineering", "A/B Testing"],
                        "milestones": ["Deploy production ML systems", "Improve key metrics 10%+"],
                        "gap": {"skill": "Deep Learning", "current": 15, "needed": 75},
                    },
                    {
                        "level": 4, "role": "Senior Data Scientist / ML Lead", "salary": "Rp 40-60 Jt",
                        "timeline": "6-8 tahun", "status": "future",
                        "skills": ["Research", "Team Leadership", "Strategy", "Innovation"],
                        "milestones": ["Publish research", "Lead data science org"],
                        "gap": {"skill": "Research & Innovation", "current": 5, "needed": 80},
                    },
                ],
            },
        ],
    },
    {
        "id": "product_manager",
        "title": "Product Manager",
        "icon": "Target",
        "currentRole": "Associate Product Manager",
        "currentSalary": "Rp 10-16 Jt",
        "paths": [
            {
                "id": "product_leader",
                "name": "Product Leader Track",
                "description": "Dari APM ke Chief Product Officer",
                "nodes": [
                    {
                        "level": 1, "role": "Associate PM", "salary": "Rp 10-16 Jt",
                        "timeline": "Sekarang", "status": "current",
                        "skills": ["Agile Basics", "User Research", "Wireframing"],
                        "milestones": ["Launch 1st feature", "Complete PM certification"],
                    },
                    {
                        "level": 2, "role": "Product Manager", "salary": "Rp 18-28 Jt",
                        "timeline": "2-3 tahun", "status": "next",
                        "skills": ["Strategy", "SQL Analytics", "Stakeholder Mgmt", "Roadmapping"],
                        "milestones": ["Own a product area", "Drive measurable OKRs"],
                        "gap": {"skill": "Product Strategy", "current": 45, "needed": 80},
                    },
                    {
                        "level": 3, "role": "Senior PM / Group PM", "salary": "Rp 30-50 Jt",
                        "timeline": "4-7 tahun", "status": "future",
                        "skills": ["Vision Setting", "Cross-functional Leadership", "Metrics"],
                        "milestones": ["Lead product domain", "Mentor PMs"],
                        "gap": {"skill": "Product Vision", "current": 20, "needed": 80},
                    },
                    {
                        "level": 4, "role": "VP Product / CPO", "salary": "Rp 70-120 Jt",
                        "timeline": "8-12 tahun", "status": "future",
                        "skills": ["Company Strategy", "Executive Leadership", "P&L"],
                        "milestones": ["Define company product direction", "Build PM org"],
                        "gap": {"skill": "Executive Leadership", "current": 5, "needed": 90},
                    },
                ],
            },
        ],
    },
]

SKILL_PROFILES = [
    {
        "id": "frontend",
        "title": "Frontend Developer",
        "skills": [
            {"name": "JavaScript", "current": 80, "required": 90, "category": "technical"},
            {"name": "React/Vue", "current": 75, "required": 85, "category": "technical"},
            {"name": "TypeScript", "current": 55, "required": 80, "category": "technical"},
            {"name": "CSS/Design", "current": 70, "required": 80, "category": "technical"},
            {"name": "Testing", "current": 45, "required": 70, "category": "technical"},
            {"name": "Performance", "current": 50, "required": 75, "category": "technical"},
            {"name": "Communication", "current": 80, "required": 75, "category": "soft"},
            {"name": "Problem Solving", "current": 70, "required": 85, "category": "soft"},
        ],
    },
    {
        "id": "data_scientist",
        "title": "Data Scientist",
        "skills": [
            {"name": "Python", "current": 70, "required": 90, "category": "technical"},
            {"name": "Machine Learning", "current": 50, "required": 85, "category": "technical"},
            {"name": "Statistics", "current": 60, "required": 85, "category": "technical"},
            {"name": "SQL", "current": 65, "required": 80, "category": "technical"},
            {"name": "Data Viz", "current": 55, "required": 75, "category": "technical"},
            {"name": "Deep Learning", "current": 35, "required": 70, "category": "technical"},
            {"name": "Communication", "current": 75, "required": 80, "category": "soft"},
            {"name": "Critical Thinking", "current": 70, "required": 85, "category": "soft"},
        ],
    },
    {
        "id": "product_manager",
        "title": "Product Manager",
        "skills": [
            {"name": "Strategy", "current": 60, "required": 85, "category": "technical"},
            {"name": "Analytics", "current": 55, "required": 80, "category": "technical"},
            {"name": "User Research", "current": 50, "required": 80, "category": "technical"},
            {"name": "Agile/Scrum", "current": 65, "required": 85, "category": "technical"},
            {"name": "SQL", "current": 40, "required": 65, "category": "technical"},
            {"name": "Roadmapping", "current": 55, "required": 80, "category": "technical"},
            {"name": "Leadership", "current": 70, "required": 85, "category": "soft"},
            {"name": "Communication", "current": 80, "required": 90, "category": "soft"},
        ],
    },
    {
        "id": "devops",
        "title": "DevOps Engineer",
        "skills": [
            {"name": "Linux/Bash", "current": 75, "required": 90, "category": "technical"},
            {"name": "Docker", "current": 70, "required": 85, "category": "technical"},
            {"name": "Kubernetes", "current": 50, "required": 80, "category": "technical"},
            {"name": "AWS/GCP", "current": 60, "required": 85, "category": "technical"},
            {"name": "CI/CD", "current": 65, "required": 80, "category": "technical"},
            {"name": "Terraform", "current": 40, "required": 75, "category": "technical"},
            {"name": "Monitoring", "current": 55, "required": 75, "category": "technical"},
            {"name": "Problem Solving", "current": 80, "required": 90, "category": "soft"},
        ],
    },
]

DASHBOARD_STATS = {
    "type": "dashboard",
    "totalMatches": 1690,
    "applied": 636,
    "interviews": 24,
    "skillScore": 78,
    "activeJobs": 50000,
    "totalUsers": 200000,
    "companies": 5000,
    "aiAccuracy": 94,
    "matchTrend": [
        {"month": "Jan", "matches": 120, "applied": 45},
        {"month": "Feb", "matches": 180, "applied": 67},
        {"month": "Mar", "matches": 240, "applied": 89},
        {"month": "Apr", "matches": 310, "applied": 112},
        {"month": "Mei", "matches": 390, "applied": 145},
        {"month": "Jun", "matches": 450, "applied": 178},
    ],
}

REGION_STATS = [
    {"region": "Jakarta", "jobs": 15200},
    {"region": "Bandung", "jobs": 4800},
    {"region": "Surabaya", "jobs": 6300},
    {"region": "Yogyakarta", "jobs": 3200},
    {"region": "Bali", "jobs": 2800},
    {"region": "Medan", "jobs": 3600},
    {"region": "Semarang", "jobs": 2100},
    {"region": "Makassar", "jobs": 1900},
]

INDUSTRY_STATS = [
    {"name": "Teknologi", "value": 35},
    {"name": "Keuangan", "value": 22},
    {"name": "Kesehatan", "value": 15},
    {"name": "Pendidikan", "value": 12},
    {"name": "Lainnya", "value": 16},
]


# ─── Migration Runner ─────────────────────────────────────────────────────────

async def seed():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    print(f"🔌 Connected to MongoDB: {MONGO_URL}")
    print(f"📦 Database: {DB_NAME}")

    collections = {
        "jobs": JOBS,
        "courses": COURSES,
        "career_paths": CAREER_PATHS,
        "skill_profiles": SKILL_PROFILES,
        "region_stats": REGION_STATS,
        "industry_stats": INDUSTRY_STATS,
    }

    for col_name, data in collections.items():
        existing = await db[col_name].count_documents({})
        if existing > 0:
            print(f"  ⚠️  {col_name}: {existing} dokumen sudah ada — skip (gunakan --force untuk overwrite)")
        else:
            await db[col_name].insert_many(data)
            print(f"  ✅  {col_name}: {len(data)} dokumen disisipkan")

    # Stats (upsert)
    await db.stats.update_one(
        {"type": "dashboard"},
        {"$set": DASHBOARD_STATS},
        upsert=True,
    )
    print("  ✅  stats: dashboard upserted")

    # Indexes
    await db.jobs.create_index([("id", 1)], unique=True)
    await db.jobs.create_index([("region", 1), ("match", -1)])
    await db.jobs.create_index([("industry", 1)])
    await db.jobs.create_index([("title", "text"), ("company", "text")])
    await db.courses.create_index([("id", 1)], unique=True)
    await db.courses.create_index([("category", 1), ("rating", -1)])
    await db.career_paths.create_index([("id", 1)], unique=True)
    await db.skill_profiles.create_index([("id", 1)], unique=True)
    await db.applications.create_index([("job_id", 1), ("user_email", 1)], unique=True)
    await db.applications.create_index([("user_email", 1)])
    print("  ✅  Indexes dibuat")

    client.close()
    print("\n🎉 Seed selesai!")


async def force_seed():
    """Drop semua collection lalu seed ulang dari nol."""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    drop_cols = ["jobs", "courses", "career_paths", "skill_profiles",
                 "stats", "region_stats", "industry_stats"]
    for col in drop_cols:
        await db[col].drop()
        print(f"  🗑️   {col} dihapus")

    client.close()
    await seed()


if __name__ == "__main__":
    import sys
    if "--force" in sys.argv:
        print("⚡ Mode force: menghapus data lama dan seed ulang...")
        asyncio.run(force_seed())
    else:
        print("🌱 Menjalankan seed (skip jika koleksi sudah ada)...")
        print("   Gunakan --force untuk overwrite data lama\n")
        asyncio.run(seed())
