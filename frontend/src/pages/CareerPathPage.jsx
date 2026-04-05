import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ArrowRight, ArrowDown, ChevronRight, TrendingUp, DollarSign,
  Clock, Target, Sparkles, GraduationCap, Briefcase, Award,
  CheckCircle2, Star, Zap, GitBranch, MapPin, Brain,
  BookOpen, Users, BarChart3, Lock, Unlock, CircleDot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const careerPaths = {
  frontend: {
    currentRole: "Junior Frontend Developer",
    currentSalary: "Rp 6-10 Jt",
    currentLevel: 1,
    paths: [
      {
        id: "specialist",
        name: "Frontend Specialist Track",
        description: "Mendalami frontend engineering, dari UI hingga arsitektur",
        nodes: [
          {
            level: 1, role: "Junior Frontend Dev", salary: "Rp 6-10 Jt", timeline: "Sekarang",
            status: "current",
            skills: ["HTML/CSS", "JavaScript", "React Basics"],
            milestones: ["Build 3+ production apps", "Master CSS layouts"],
          },
          {
            level: 2, role: "Mid Frontend Dev", salary: "Rp 12-18 Jt", timeline: "1-2 tahun",
            status: "next",
            skills: ["TypeScript", "State Management", "Testing", "Performance"],
            milestones: ["Lead a frontend module", "Implement design system"],
            gap: { skill: "TypeScript", current: 40, needed: 75 },
          },
          {
            level: 3, role: "Senior Frontend Dev", salary: "Rp 20-35 Jt", timeline: "3-5 tahun",
            status: "future",
            skills: ["Architecture", "Mentoring", "CI/CD", "System Design"],
            milestones: ["Design frontend architecture", "Mentor 3+ juniors"],
            gap: { skill: "System Design", current: 15, needed: 80 },
          },
          {
            level: 4, role: "Staff Engineer / Principal", salary: "Rp 40-65 Jt", timeline: "6-8 tahun",
            status: "future",
            skills: ["Technical Strategy", "Cross-team Leadership", "Innovation"],
            milestones: ["Define technical direction", "Impact company-wide"],
            gap: { skill: "Technical Leadership", current: 5, needed: 85 },
          },
        ],
      },
      {
        id: "fullstack",
        name: "Fullstack Track",
        description: "Memperluas ke backend dan menjadi engineer serba bisa",
        nodes: [
          {
            level: 1, role: "Junior Frontend Dev", salary: "Rp 6-10 Jt", timeline: "Sekarang",
            status: "current",
            skills: ["HTML/CSS", "JavaScript", "React Basics"],
            milestones: ["Build 3+ production apps"],
          },
          {
            level: 2, role: "Fullstack Developer", salary: "Rp 14-22 Jt", timeline: "1.5-3 tahun",
            status: "next",
            skills: ["Node.js", "PostgreSQL", "REST/GraphQL", "Docker"],
            milestones: ["Build full features end-to-end", "Deploy to production"],
            gap: { skill: "Backend (Node.js)", current: 20, needed: 70 },
          },
          {
            level: 3, role: "Senior Fullstack Engineer", salary: "Rp 25-40 Jt", timeline: "4-6 tahun",
            status: "future",
            skills: ["Microservices", "Cloud", "DevOps", "Architecture"],
            milestones: ["Design system architecture", "Lead engineering team"],
            gap: { skill: "Cloud & DevOps", current: 10, needed: 75 },
          },
          {
            level: 4, role: "Engineering Manager / CTO", salary: "Rp 50-100 Jt", timeline: "7-10 tahun",
            status: "future",
            skills: ["People Management", "Business Strategy", "Budgeting"],
            milestones: ["Manage engineering org", "Drive product strategy"],
            gap: { skill: "Management", current: 5, needed: 80 },
          },
        ],
      },
      {
        id: "product",
        name: "Product/Design Track",
        description: "Beralih ke product management atau UX dengan dasar teknis",
        nodes: [
          {
            level: 1, role: "Junior Frontend Dev", salary: "Rp 6-10 Jt", timeline: "Sekarang",
            status: "current",
            skills: ["HTML/CSS", "JavaScript", "React"],
            milestones: ["Understand user needs"],
          },
          {
            level: 2, role: "UI Developer / Design Engineer", salary: "Rp 12-18 Jt", timeline: "1-2 tahun",
            status: "next",
            skills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
            milestones: ["Create a design system", "Run usability tests"],
            gap: { skill: "UX Design", current: 25, needed: 70 },
          },
          {
            level: 3, role: "Product Manager", salary: "Rp 20-35 Jt", timeline: "3-5 tahun",
            status: "future",
            skills: ["Product Strategy", "Analytics", "Agile", "Stakeholder Mgmt"],
            milestones: ["Own a product feature", "Drive business metrics"],
            gap: { skill: "Product Strategy", current: 10, needed: 80 },
          },
          {
            level: 4, role: "VP Product / CPO", salary: "Rp 50-100 Jt", timeline: "7-10 tahun",
            status: "future",
            skills: ["Vision", "P&L", "Organization Building"],
            milestones: ["Define product vision", "Build product team"],
            gap: { skill: "Business Leadership", current: 5, needed: 85 },
          },
        ],
      },
    ],
  },
  data: {
    currentRole: "Junior Data Analyst",
    currentSalary: "Rp 7-12 Jt",
    currentLevel: 1,
    paths: [
      {
        id: "ds",
        name: "Data Science Track",
        description: "Menjadi data scientist dan machine learning engineer",
        nodes: [
          { level: 1, role: "Junior Data Analyst", salary: "Rp 7-12 Jt", timeline: "Sekarang", status: "current", skills: ["SQL", "Excel", "Python Basics"], milestones: ["Automate 3+ reports"] },
          { level: 2, role: "Data Scientist", salary: "Rp 18-30 Jt", timeline: "2-3 tahun", status: "next", skills: ["ML Algorithms", "Statistics", "TensorFlow"], milestones: ["Deploy ML model to prod"], gap: { skill: "Machine Learning", current: 20, needed: 80 } },
          { level: 3, role: "Senior Data Scientist", salary: "Rp 30-50 Jt", timeline: "4-6 tahun", status: "future", skills: ["Deep Learning", "NLP", "MLOps"], milestones: ["Lead DS team"], gap: { skill: "Deep Learning", current: 5, needed: 75 } },
          { level: 4, role: "Head of Data / Chief Data Officer", salary: "Rp 60-120 Jt", timeline: "7-10 tahun", status: "future", skills: ["Data Strategy", "Org Leadership"], milestones: ["Define data strategy"], gap: { skill: "Leadership", current: 10, needed: 85 } },
        ],
      },
      {
        id: "de",
        name: "Data Engineering Track",
        description: "Membangun data infrastructure dan pipeline",
        nodes: [
          { level: 1, role: "Junior Data Analyst", salary: "Rp 7-12 Jt", timeline: "Sekarang", status: "current", skills: ["SQL", "Excel", "Python"], milestones: ["Master SQL"] },
          { level: 2, role: "Data Engineer", salary: "Rp 16-25 Jt", timeline: "1.5-3 tahun", status: "next", skills: ["Spark", "Airflow", "Cloud (AWS/GCP)"], milestones: ["Build ETL pipeline"], gap: { skill: "Data Engineering", current: 15, needed: 75 } },
          { level: 3, role: "Senior Data Engineer", salary: "Rp 28-45 Jt", timeline: "4-6 tahun", status: "future", skills: ["Architecture", "Real-time Processing", "Data Governance"], milestones: ["Design data platform"], gap: { skill: "System Architecture", current: 5, needed: 80 } },
          { level: 4, role: "Principal Engineer / VP Engineering", salary: "Rp 50-90 Jt", timeline: "7-10 tahun", status: "future", skills: ["Technical Vision", "Org Leadership"], milestones: ["Scale data org"], gap: { skill: "Vision", current: 5, needed: 85 } },
        ],
      },
    ],
  },
};

const NodeCard = ({ node, isLast, onSelect, isSelected }) => {
  const statusConfig = {
    current: { icon: CircleDot, color: "text-accent", bg: "bg-accent/10", border: "border-accent/40", badge: "Posisi Saat Ini" },
    next: { icon: Target, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", badge: "Target Berikutnya" },
    future: { icon: Lock, color: "text-muted-foreground", bg: "bg-muted", border: "border-border/50", badge: "" },
  };
  const config = statusConfig[node.status];
  const Icon = config.icon;

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() => onSelect(node)}
        className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 ${
          isSelected ? "border-accent shadow-card" : config.border
        } ${node.status === "future" ? "opacity-80" : ""}`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-heading text-base font-semibold text-foreground">{node.role}</h4>
              {config.badge && <Badge variant={node.status === "current" ? "accent" : "info"} className="text-[10px]">{config.badge}</Badge>}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{node.salary}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{node.timeline}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {node.skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
              ))}
            </div>
            {node.gap && (
              <div className="mt-3 p-2.5 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Gap: <span className="font-medium text-foreground">{node.gap.skill}</span></span>
                  <span className="text-warning font-semibold">{node.gap.needed - node.gap.current}% gap</span>
                </div>
                <div className="relative h-1.5 bg-border rounded-full">
                  <div className="absolute h-full bg-accent rounded-full transition-all" style={{ width: `${node.gap.current}%` }} />
                  <div className="absolute h-full border-r-2 border-dashed border-primary/50" style={{ left: `${node.gap.needed}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {!isLast && (
        <div className="flex justify-center py-2">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-border" />
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function CareerPathPage() {
  const [selectedField, setSelectedField] = useState("frontend");
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const field = careerPaths[selectedField];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowAnalysis(true);
      toast.success("Analisis career path selesai!");
    }, 2000);
  };

  return (
    <AppLayout title="Career Path Analyzer" subtitle="Peta jalan karir interaktif berbasis AI — ketahui langkah menuju posisi impian">
      {/* Config */}
      <Card className="border-border/50 mb-6">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium">Bidang Saat Ini</Label>
              <Select value={selectedField} onValueChange={(v) => { setSelectedField(v); setShowAnalysis(false); setSelectedPath(null); setSelectedNode(null); }}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Development</SelectItem>
                  <SelectItem value="data">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="hero" size="lg" onClick={handleAnalyze} disabled={analyzing} className="gap-2">
              {analyzing ? (<>Menganalisis... <Sparkles className="w-4 h-4 animate-pulse" /></>) : (<>Analisis Career Path <GitBranch className="w-4 h-4" /></>)}
            </Button>
          </div>
          {showAnalysis && (
            <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">Insight AI</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sebagai <span className="font-semibold text-foreground">{field.currentRole}</span> ({field.currentSalary}),
                Anda memiliki <span className="font-semibold text-accent">{field.paths.length} jalur karir</span> yang bisa ditempuh.
                {selectedField === "frontend"
                  ? " Berdasarkan tren 2026, Frontend Specialist Track memiliki demand tertinggi dengan kenaikan gaji rata-rata 25% per tahun. Namun Fullstack Track memberikan fleksibilitas karir lebih luas."
                  : " Data Science Track saat ini memiliki demand tertinggi, tetapi Data Engineering menawarkan gaji 15-20% lebih tinggi di level senior."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {showAnalysis && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Path Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-accent" /> Pilih Jalur Karir
            </h3>
            {field.paths.map((path) => (
              <Card
                key={path.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPath?.id === path.id ? "border-accent shadow-card" : "border-border/50 hover:border-accent/30"
                }`}
                onClick={() => { setSelectedPath(path); setSelectedNode(null); }}
              >
                <CardContent className="p-4">
                  <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{path.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{path.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground">{path.nodes.length} tahap</span>
                    <span className="text-accent font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {path.nodes[path.nodes.length - 1].salary}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Salary Projection */}
            {selectedPath && (
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-heading flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-accent" /> Proyeksi Gaji
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedPath.nodes.map((node, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        node.status === "current" ? "bg-accent" : node.status === "next" ? "bg-primary" : "bg-muted-foreground/30"
                      }`} />
                      <span className="text-xs text-muted-foreground flex-1 truncate">{node.role}</span>
                      <span className="text-xs font-semibold text-foreground">{node.salary}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Path Roadmap */}
          <div className="lg:col-span-2">
            {selectedPath ? (
              <div className="space-y-0">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" /> Roadmap: {selectedPath.name}
                </h3>
                {selectedPath.nodes.map((node, i) => (
                  <NodeCard
                    key={i}
                    node={node}
                    isLast={i === selectedPath.nodes.length - 1}
                    onSelect={setSelectedNode}
                    isSelected={selectedNode?.role === node.role}
                  />
                ))}

                {/* Selected Node Detail */}
                <AnimatePresence>
                  {selectedNode && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="mt-6"
                    >
                      <Card className="border-accent/30">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-heading">{selectedNode.role}</CardTitle>
                          <CardDescription>Detail dan milestone yang perlu dicapai</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-muted/50">
                              <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-accent" /> Milestone
                              </p>
                              <ul className="space-y-1.5">
                                {selectedNode.milestones.map((m, mi) => (
                                  <li key={mi} className="flex items-start gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />{m}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/50">
                              <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-accent" /> Skill yang Dibutuhkan
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedNode.skills.map((s) => (
                                  <Badge key={s} variant="accent" className="text-xs">{s}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          {selectedNode.status !== "current" && (
                            <div className="flex gap-2 mt-4">
                              <Button variant="hero" size="sm" className="gap-1">
                                Mulai Pelatihan <GraduationCap className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="heroOutline" size="sm" className="gap-1">
                                Lihat Lowongan <Briefcase className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <GitBranch className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Pilih Jalur Karir</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Pilih salah satu jalur karir di sebelah kiri untuk melihat roadmap interaktif lengkap dengan skill gap dan proyeksi gaji.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial State */}
      {!showAnalysis && !analyzing && (
        <div className="text-center py-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6"
          >
            <GitBranch className="w-10 h-10 text-accent" />
          </motion.div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-3">Peta Jalan Karir Interaktif</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
            AI akan menganalisis posisi Anda saat ini dan menampilkan berbagai jalur karir yang bisa ditempuh, lengkap dengan skill gap, proyeksi gaji, dan timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            {["Visualisasi Career Path", "Skill Gap per Tahap", "Proyeksi Gaji", "Training Roadmap"].map((f, i) => (
              <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-accent" />{f}</span>
            ))}
          </div>
        </div>
      )}

      {analyzing && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-accent" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-3">AI Sedang Menganalisis Career Path...</h3>
          <p className="text-sm text-muted-foreground">Memetakan jalur karir berdasarkan posisi {field.currentRole} Anda</p>
        </div>
      )}
    </AppLayout>
  );
}
