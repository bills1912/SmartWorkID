import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Search, MapPin, Clock, Building2, DollarSign, Filter,
  Globe2, Heart, ArrowRight, Briefcase, Star, CheckCircle2,
  Users, Calendar, X, BookmarkPlus, Brain, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AIMatchDetail } from "@/pages/AIMatchAnalysis";

const allJobs = [
  {
    id: 1, title: "Senior Frontend Developer", company: "Tokopedia", location: "Jakarta",
    type: "Full-time", mode: "Hybrid", salary: "Rp 20-35 Jt", match: 96,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    posted: "2 hari lalu", applicants: 45, region: "jakarta", industry: "tech",
    description: "Kami mencari Senior Frontend Developer yang berpengalaman untuk memimpin pengembangan antarmuka pengguna produk kami.",
    requirements: ["Minimal 5 tahun pengalaman di React", "Pengalaman dengan TypeScript", "Familiar dengan CI/CD", "Kemampuan leadership yang baik"],
    matchBreakdown: { skill: 97, experience: 94, culture: 96, salary: 95, growth: 98 },
  },
  {
    id: 2, title: "Data Scientist", company: "Gojek", location: "Jakarta",
    type: "Full-time", mode: "On-site", salary: "Rp 25-40 Jt", match: 88,
    skills: ["Python", "TensorFlow", "SQL", "Statistics"],
    posted: "3 hari lalu", applicants: 62, region: "jakarta", industry: "tech",
    description: "Bergabunglah dengan tim data science kami untuk mengembangkan model machine learning yang berdampak.",
    requirements: ["Master degree di bidang terkait", "3+ tahun pengalaman ML", "Expert di Python dan SQL", "Pengalaman dengan cloud platform"],
    matchBreakdown: { skill: 90, experience: 85, culture: 88, salary: 90, growth: 87 },
  },
  {
    id: 3, title: "Product Manager", company: "Bukalapak", location: "Bandung",
    type: "Full-time", mode: "Hybrid", salary: "Rp 18-30 Jt", match: 82,
    skills: ["Agile", "Analytics", "Strategy", "SQL"],
    posted: "1 hari lalu", applicants: 38, region: "bandung", industry: "tech",
    description: "Kami mencari Product Manager yang berpengalaman untuk memimpin pengembangan fitur baru.",
    requirements: ["3+ tahun pengalaman PM", "Pemahaman Agile/Scrum", "Kemampuan analitis yang kuat", "Komunikasi yang baik"],
    matchBreakdown: { skill: 80, experience: 78, culture: 85, salary: 84, growth: 86 },
  },
  {
    id: 4, title: "UI/UX Designer", company: "Traveloka", location: "Jakarta",
    type: "Full-time", mode: "Remote", salary: "Rp 15-25 Jt", match: 91,
    skills: ["Figma", "Design System", "User Research", "Prototyping"],
    posted: "5 hari lalu", applicants: 71, region: "jakarta", industry: "tech",
    description: "Posisi untuk designer yang passionate dalam menciptakan pengalaman pengguna yang luar biasa.",
    requirements: ["Portfolio yang kuat", "3+ tahun pengalaman UX", "Expert di Figma", "Pemahaman design thinking"],
    matchBreakdown: { skill: 92, experience: 88, culture: 94, salary: 90, growth: 91 },
  },
  {
    id: 5, title: "DevOps Engineer", company: "OVO", location: "Surabaya",
    type: "Full-time", mode: "On-site", salary: "Rp 20-32 Jt", match: 79,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    posted: "1 minggu lalu", applicants: 28, region: "surabaya", industry: "fintech",
    description: "Bergabunglah untuk mengelola infrastruktur cloud kami yang melayani jutaan pengguna.",
    requirements: ["4+ tahun pengalaman DevOps", "AWS/GCP certified", "Expert Docker & K8s", "Scripting (Bash/Python)"],
    matchBreakdown: { skill: 76, experience: 80, culture: 82, salary: 78, growth: 80 },
  },
  {
    id: 6, title: "Marketing Analyst", company: "Shopee", location: "Jakarta",
    type: "Full-time", mode: "Hybrid", salary: "Rp 12-18 Jt", match: 75,
    skills: ["Google Analytics", "SQL", "Excel", "Marketing Strategy"],
    posted: "4 hari lalu", applicants: 89, region: "jakarta", industry: "ecommerce",
    description: "Kami mencari Marketing Analyst yang data-driven untuk mengoptimalkan kampanye marketing.",
    requirements: ["2+ tahun pengalaman marketing analytics", "Expert Google Analytics", "SQL proficiency", "Strong communication"],
    matchBreakdown: { skill: 72, experience: 74, culture: 78, salary: 76, growth: 75 },
  },
  {
    id: 7, title: "Mobile Developer (Flutter)", company: "Dana", location: "Yogyakarta",
    type: "Full-time", mode: "Remote", salary: "Rp 15-25 Jt", match: 86,
    skills: ["Flutter", "Dart", "Firebase", "REST API"],
    posted: "2 hari lalu", applicants: 34, region: "yogyakarta", industry: "fintech",
    description: "Kembangkan aplikasi mobile fintech yang digunakan oleh jutaan pengguna Indonesia.",
    requirements: ["3+ tahun Flutter development", "Published apps di store", "Pemahaman state management", "Testing experience"],
    matchBreakdown: { skill: 88, experience: 84, culture: 86, salary: 85, growth: 88 },
  },
  {
    id: 8, title: "Backend Engineer (Go)", company: "Xendit", location: "Jakarta",
    type: "Full-time", mode: "Hybrid", salary: "Rp 22-38 Jt", match: 84,
    skills: ["Go", "PostgreSQL", "gRPC", "Microservices"],
    posted: "6 hari lalu", applicants: 41, region: "jakarta", industry: "fintech",
    description: "Bangun sistem payment infrastructure yang reliable dan scalable.",
    requirements: ["4+ tahun Go development", "Microservices architecture", "Database optimization", "System design skills"],
    matchBreakdown: { skill: 82, experience: 84, culture: 86, salary: 85, growth: 83 },
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [dialogTab, setDialogTab] = useState("info");

  const filteredJobs = useMemo(() => {
    let jobs = [...allJobs];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (regionFilter !== "all") {
      jobs = jobs.filter((j) => j.region === regionFilter);
    }
    if (typeFilter !== "all") {
      jobs = jobs.filter((j) => j.mode.toLowerCase() === typeFilter);
    }
    if (sortBy === "match") jobs.sort((a, b) => b.match - a.match);
    if (sortBy === "newest") jobs.sort((a, b) => a.id - b.id);
    if (sortBy === "salary") jobs.sort((a, b) => b.match - a.match);
    return jobs;
  }, [searchQuery, regionFilter, typeFilter, sortBy]);

  const handleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
      toast.info("Lowongan dihapus dari simpanan");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success("Lowongan disimpan!");
    }
  };

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      toast.success("Lamaran berhasil dikirim!");
      setSelectedJob(null);
    }
  };

  return (
    <AppLayout title="Lowongan Kerja" subtitle="Temukan peluang karir terbaik yang dicocokkan AI untuk Anda">
      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari posisi, perusahaan, atau skill..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-11">
              <Globe2 className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Wilayah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Wilayah</SelectItem>
              <SelectItem value="jakarta">Jakarta</SelectItem>
              <SelectItem value="bandung">Bandung</SelectItem>
              <SelectItem value="surabaya">Surabaya</SelectItem>
              <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[160px] h-11">
              <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Tipe Kerja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="on-site">On-site</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[160px] h-11">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Match Tertinggi</SelectItem>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="salary">Gaji Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredJobs.length}</span> lowongan ditemukan
          {regionFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {regionFilter}
              <button onClick={() => setRegionFilter("all")}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className="group h-full flex flex-col border-border/50 hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedJob(job)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-heading truncate">{job.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{job.company}</span>
                  </div>
                </div>
                <Badge variant="success" className="text-xs flex-shrink-0">
                  {job.match}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />{job.mode}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />{job.posted}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">{job.salary}</p>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-normal">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    +{job.skills.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="gap-2 mt-auto">
              <Button
                variant="heroOutline"
                size="sm"
                className="flex-1"
                onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
              >
                Detail
              </Button>
              <Button
                variant={savedJobs.includes(job.id) ? "accent" : "ghost"}
                size="icon"
                className="flex-shrink-0"
                onClick={(e) => { e.stopPropagation(); handleSave(job.id); }}
              >
                <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Tidak ada hasil</h3>
          <p className="text-sm text-muted-foreground">Coba ubah filter pencarian Anda</p>
        </div>
      )}

      {/* Job Detail Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => { setSelectedJob(null); setDialogTab("info"); }}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
          {selectedJob && (
            <>
              <Tabs value={dialogTab} onValueChange={setDialogTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1 gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Detail Lowongan
                  </TabsTrigger>
                  <TabsTrigger value="ai-analysis" className="flex-1 gap-1.5">
                    <Brain className="w-3.5 h-3.5" /> Analisis AI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-4">
                  <div className="space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground">{selectedJob.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Building2 className="w-4 h-4" />
                          {selectedJob.company} &bull; {selectedJob.location}
                        </p>
                      </div>
                      <Badge variant="success" className="text-sm">{selectedJob.match}% Match</Badge>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <Badge variant="secondary">{selectedJob.type}</Badge>
                      <Badge variant="secondary">{selectedJob.mode}</Badge>
                      <Badge variant="secondary">{selectedJob.salary}</Badge>
                    </div>

                    <div>
                      <h4 className="font-heading text-sm font-semibold text-foreground mb-2">Deskripsi</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h4 className="font-heading text-sm font-semibold text-foreground mb-2">Persyaratan</h4>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-heading text-sm font-semibold text-foreground mb-2">Skill</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill) => (
                          <Badge key={skill} variant="accent" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {selectedJob.applicants} pelamar</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedJob.posted}</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai-analysis" className="mt-4">
                  <AIMatchDetail job={selectedJob} />
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4 gap-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSave(selectedJob.id)}
                  className="gap-1.5"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  {savedJobs.includes(selectedJob.id) ? "Tersimpan" : "Simpan"}
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  disabled={appliedJobs.includes(selectedJob.id)}
                  onClick={() => handleApply(selectedJob.id)}
                  className="gap-1.5"
                >
                  {appliedJobs.includes(selectedJob.id) ? (
                    <><CheckCircle2 className="w-4 h-4" /> Sudah Dilamar</>
                  ) : (
                    <>Lamar Sekarang <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
