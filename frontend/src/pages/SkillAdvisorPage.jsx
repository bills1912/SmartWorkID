import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Brain, Target, TrendingUp, AlertTriangle, CheckCircle2,
  ArrowRight, Sparkles, GraduationCap, BarChart3, Zap,
  BookOpen, Clock, Award, ChevronRight, Star, ExternalLink,
  AlertCircle, ArrowLeft,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Cell, ReferenceLine,
} from "recharts";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// ─── Role profiles ────────────────────────────────────────────────────────────
// data_scientist dibuat persis sesuai script: TensorFlow gap 40%, SQL production gap 35%

const roleProfiles = {
  data_scientist: {
    title: "Data Scientist",
    description: "Mengembangkan model machine learning dan menganalisis data kompleks untuk insight bisnis",
    skills: [
      { name: "Python", current: 70, required: 90, category: "technical", gap: 20 },
      { name: "SQL Production", current: 45, required: 80, category: "technical", gap: 35 },
      { name: "Machine Learning", current: 40, required: 85, category: "technical", gap: 45 },
      { name: "TensorFlow", current: 30, required: 70, category: "technical", gap: 40 },
      { name: "Statistics", current: 75, required: 85, category: "technical", gap: 10 },
      { name: "Data Viz", current: 55, required: 75, category: "technical", gap: 20 },
      { name: "Communication", current: 75, required: 80, category: "soft", gap: 5 },
      { name: "Critical Thinking", current: 70, required: 85, category: "soft", gap: 15 },
    ],
    courses: [
      {
        title: "Machine Learning Terapan",
        provider: "Dicoding",
        duration: "50 jam",
        level: "Intermediate",
        rating: 4.9,
        relevance: 98,
        skill: "Machine Learning",
        url: "https://dicoding.com",
        gap: 45,
        price: "Gratis",
      },
      {
        title: "TensorFlow Developer Certificate",
        provider: "Coursera",
        duration: "60 jam",
        level: "Intermediate",
        rating: 4.8,
        relevance: 95,
        skill: "TensorFlow",
        url: "https://coursera.org",
        gap: 40,
        price: "Rp 200 ribu/bulan",
      },
      {
        title: "SQL for Analytics & Data Science",
        provider: "Dicoding",
        duration: "35 jam",
        level: "Intermediate",
        rating: 4.8,
        relevance: 93,
        skill: "SQL Production",
        url: "https://dicoding.com",
        gap: 35,
        price: "Gratis",
      },
      {
        title: "Python for Data Science",
        provider: "Coursera",
        duration: "40 jam",
        level: "Beginner",
        rating: 4.7,
        relevance: 88,
        skill: "Python",
        url: "https://coursera.org",
        gap: 20,
        price: "Rp 200 ribu/bulan",
      },
      {
        title: "Data Visualization with Python",
        provider: "Udemy",
        duration: "25 jam",
        level: "Intermediate",
        rating: 4.6,
        relevance: 82,
        skill: "Data Viz",
        url: "https://udemy.com",
        gap: 20,
        price: "Rp 120 ribu",
      },
    ],
  },
  frontend: {
    title: "Frontend Developer",
    description: "Membangun antarmuka pengguna yang interaktif dan responsif menggunakan teknologi web modern",
    skills: [
      { name: "JavaScript", current: 80, required: 90, category: "technical", gap: 10 },
      { name: "React/Vue", current: 75, required: 85, category: "technical", gap: 10 },
      { name: "TypeScript", current: 55, required: 80, category: "technical", gap: 25 },
      { name: "CSS/Design", current: 70, required: 80, category: "technical", gap: 10 },
      { name: "Testing", current: 45, required: 70, category: "technical", gap: 25 },
      { name: "Performance", current: 50, required: 75, category: "technical", gap: 25 },
      { name: "Communication", current: 80, required: 75, category: "soft", gap: 0 },
      { name: "Problem Solving", current: 70, required: 85, category: "soft", gap: 15 },
    ],
    courses: [
      {
        title: "Advanced TypeScript Masterclass",
        provider: "Dicoding",
        duration: "40 jam",
        level: "Intermediate",
        rating: 4.8,
        relevance: 95,
        skill: "TypeScript",
        url: "https://dicoding.com",
        gap: 25,
        price: "Gratis",
      },
      {
        title: "React Testing Library Complete Guide",
        provider: "Coursera",
        duration: "25 jam",
        level: "Intermediate",
        rating: 4.7,
        relevance: 90,
        skill: "Testing",
        url: "https://coursera.org",
        gap: 25,
        price: "Rp 200 ribu/bulan",
      },
      {
        title: "Web Performance Optimization",
        provider: "Udemy",
        duration: "30 jam",
        level: "Advanced",
        rating: 4.6,
        relevance: 88,
        skill: "Performance",
        url: "https://udemy.com",
        gap: 25,
        price: "Rp 120 ribu",
      },
    ],
  },
  product_manager: {
    title: "Product Manager",
    description: "Memimpin pengembangan produk dari ideasi hingga peluncuran dengan pendekatan berbasis data",
    skills: [
      { name: "Strategy", current: 60, required: 85, category: "technical", gap: 25 },
      { name: "Analytics", current: 55, required: 80, category: "technical", gap: 25 },
      { name: "User Research", current: 50, required: 80, category: "technical", gap: 30 },
      { name: "Agile/Scrum", current: 65, required: 85, category: "technical", gap: 20 },
      { name: "SQL", current: 40, required: 65, category: "technical", gap: 25 },
      { name: "Roadmapping", current: 55, required: 80, category: "technical", gap: 25 },
      { name: "Leadership", current: 70, required: 85, category: "soft", gap: 15 },
      { name: "Communication", current: 80, required: 90, category: "soft", gap: 10 },
    ],
    courses: [
      {
        title: "Product Management Fundamentals",
        provider: "Coursera",
        duration: "45 jam",
        level: "Beginner",
        rating: 4.8,
        relevance: 96,
        skill: "Strategy",
        url: "https://coursera.org",
        gap: 25,
        price: "Rp 200 ribu/bulan",
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getGapColor = (gap) => {
  if (gap <= 0) return "text-green-600";
  if (gap <= 15) return "text-yellow-600";
  if (gap <= 30) return "text-orange-500";
  return "text-red-500";
};

const getGapBg = (gap) => {
  if (gap <= 0) return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30";
  if (gap <= 15) return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/30";
  if (gap <= 30) return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/30";
  return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30";
};

const getGapLabel = (gap) => {
  if (gap <= 0) return "✓ Terpenuhi";
  if (gap <= 15) return "△ Gap Kecil";
  if (gap <= 30) return "▲ Gap Sedang";
  return "⚠ Gap Besar";
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillAdvisorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Jika datang dari AISearchPage dengan state autoRole, langsung auto-analyze
  const autoRole = location.state?.autoRole || null;

  const [selectedRole, setSelectedRole] = useState(autoRole || "data_scientist");
  const [analysisComplete, setAnalysisComplete] = useState(!!autoRole);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const profile = roleProfiles[selectedRole];

  // Sort courses by gap (highest gap = most urgent)
  const sortedCourses = [...profile.courses].sort((a, b) => b.gap - a.gap);

  // Radar data
  const radarData = profile.skills.map((s) => ({
    skill: s.name.length > 10 ? s.name.slice(0, 10) + "…" : s.name,
    Anda: s.current,
    Required: s.required,
    fullMark: 100,
  }));

  // Bar chart data — sorted by gap descending
  const barData = [...profile.skills]
    .filter((s) => s.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .map((s) => ({ name: s.name, gap: s.gap }));

  // Overall gap score
  const totalGap = profile.skills.reduce((sum, s) => sum + Math.max(s.gap, 0), 0);
  const maxGap = profile.skills.length * 100;
  const readinessScore = Math.round(100 - (totalGap / maxGap) * 100);

  // Auto-trigger analyze if coming from AISearchPage
  useEffect(() => {
    if (autoRole && !analysisComplete) {
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalysisComplete(true);
        toast.success("Analisis skill gap selesai!");
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      toast.success("Analisis skill gap selesai!");
    }, 2000);
  };

  return (
    <AppLayout
      title="Skill Gap Advisor"
      subtitle="Analisis kesenjangan kompetensi Anda secara kuantitatif dan dapatkan rekomendasi kursus yang tepat"
    >
      <div className="space-y-6 max-w-5xl mx-auto">

        {/* Back button jika datang dari AI Search */}
        {autoRole && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground -ml-2 mb-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke AI Search
            </Button>
          </motion.div>
        )}

        {/* Role selector */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Pilih Target Role
                </p>
                <p className="text-xs text-muted-foreground">
                  Sistem akan menghitung gap antara profil Anda dan requirement standar industri
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(roleProfiles).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedRole(key);
                      setAnalysisComplete(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                      selectedRole === key
                        ? "bg-accent text-white border-accent"
                        : "border-border/50 text-muted-foreground hover:border-accent/30 hover:text-foreground"
                    }`}
                  >
                    {val.title}
                  </button>
                ))}
              </div>
              {!analysisComplete && (
                <Button
                  variant="hero"
                  size="sm"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="gap-1.5 shrink-0"
                >
                  {analyzing ? (
                    <>
                      <Brain className="w-4 h-4 animate-pulse" /> Menganalisis...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Analisis Sekarang
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading */}
        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-12 gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-accent animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground">
                Menghitung gap kompetensi Anda untuk role <strong>{profile.title}</strong>...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis results */}
        <AnimatePresence>
          {analysisComplete && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Summary header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Readiness score */}
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-accent">{readinessScore}%</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kesiapan Profil</p>
                      <p className="text-sm font-semibold text-foreground">untuk {profile.title}</p>
                      <Progress value={readinessScore} className="h-1.5 mt-1.5" />
                    </div>
                  </CardContent>
                </Card>

                {/* Gap count */}
                <Card className="border-orange-200 dark:border-orange-800/30 bg-orange-50 dark:bg-orange-950/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-7 h-7 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Skill dengan Gap</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {profile.skills.filter((s) => s.gap > 0).length}
                      </p>
                      <p className="text-xs text-muted-foreground">dari {profile.skills.length} skill</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Top gap */}
                <Card className="border-red-200 dark:border-red-800/30 bg-red-50 dark:bg-red-950/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                      <Target className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gap Terbesar</p>
                      <p className="text-sm font-bold text-red-600">
                        {[...profile.skills].sort((a, b) => b.gap - a.gap)[0]?.name}
                      </p>
                      <p className="text-xs text-red-500">
                        -{[...profile.skills].sort((a, b) => b.gap - a.gap)[0]?.gap}% dari required
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="overview" className="gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Detail Skill
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Kursus
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Overview */}
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Radar */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Profil vs Requirement</CardTitle>
                        <CardDescription className="text-xs">
                          Biru = profil Anda · Merah = standar industri
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="h-[220px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                              <PolarGrid stroke="hsl(215,15%,85%)" />
                              <PolarAngleAxis
                                dataKey="skill"
                                tick={{ fontSize: 10, fill: "hsl(215,15%,45%)" }}
                              />
                              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar
                                name="Profil Anda"
                                dataKey="Anda"
                                stroke="hsl(185,72%,42%)"
                                fill="hsl(185,72%,42%)"
                                fillOpacity={0.3}
                                strokeWidth={2}
                              />
                              <Radar
                                name="Required"
                                dataKey="Required"
                                stroke="hsl(0,72%,50%)"
                                fill="hsl(0,72%,50%)"
                                fillOpacity={0.1}
                                strokeWidth={2}
                                strokeDasharray="4 2"
                              />
                              <Tooltip
                                formatter={(v, name) => [`${v}%`, name]}
                                contentStyle={{ fontSize: 11, borderRadius: 8 }}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Gap bar chart */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Gap per Skill (urutan prioritas)</CardTitle>
                        <CardDescription className="text-xs">
                          Skill dengan gap terbesar = prioritas belajar utama
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="h-[220px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 16 }}>
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                              <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 10 }} />
                              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                              <Tooltip
                                formatter={(v) => [`${v}%`, "Gap"]}
                                contentStyle={{ fontSize: 11, borderRadius: 8 }}
                              />
                              <Bar dataKey="gap" radius={[0, 4, 4, 0]}>
                                {barData.map((entry, index) => (
                                  <Cell
                                    key={index}
                                    fill={
                                      entry.gap >= 35
                                        ? "hsl(0,72%,50%)"
                                        : entry.gap >= 20
                                        ? "hsl(38,92%,50%)"
                                        : "hsl(185,72%,42%)"
                                    }
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tab 2: Detail Skill */}
                <TabsContent value="skills" className="mt-4">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      {profile.skills
                        .sort((a, b) => b.gap - a.gap)
                        .map((skill, i) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <div
                              className={`rounded-lg border p-3 ${getGapBg(skill.gap)}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-foreground">
                                    {skill.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px] px-1.5"
                                  >
                                    {skill.category === "technical" ? "Technical" : "Soft Skill"}
                                  </Badge>
                                </div>
                                <span className={`text-xs font-bold ${getGapColor(skill.gap)}`}>
                                  {getGapLabel(skill.gap)}
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-muted-foreground w-16">Anda:</span>
                                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-accent rounded-full transition-all duration-700"
                                      style={{ width: `${skill.current}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-bold text-foreground w-8 text-right">
                                    {skill.current}%
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-muted-foreground w-16">Required:</span>
                                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-red-400/70 rounded-full transition-all duration-700"
                                      style={{ width: `${skill.required}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-bold text-foreground w-8 text-right">
                                    {skill.required}%
                                  </span>
                                </div>
                              </div>

                              {skill.gap > 0 && (
                                <p className="text-[10px] text-muted-foreground mt-1.5">
                                  Perlu peningkatan <strong className={getGapColor(skill.gap)}>{skill.gap}%</strong> untuk memenuhi standar posisi ini
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 3: Rekomendasi Kursus */}
                <TabsContent value="courses" className="mt-4">
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground px-1">
                      Diurutkan berdasarkan gap terbesar — kursus dengan prioritas tertinggi ditampilkan pertama
                    </p>
                    {sortedCourses.map((course, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <Card className="border-border/50 hover:border-accent/30 transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              {/* Priority rank */}
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                                  i === 0
                                    ? "bg-red-100 dark:bg-red-900/20 text-red-600"
                                    : i === 1
                                    ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                                    : "bg-accent/10 text-accent"
                                }`}
                              >
                                {i + 1}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div>
                                    <h4 className="text-sm font-semibold text-foreground">
                                      {course.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <Badge variant="secondary" className="text-[10px]">
                                        {course.provider}
                                      </Badge>
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                        <Clock className="w-2.5 h-2.5" /> {course.duration}
                                      </span>
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                        <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" /> {course.rating}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <p className="text-xs font-bold text-accent">{course.price}</p>
                                    <p className="text-[10px] text-muted-foreground">{course.level}</p>
                                  </div>
                                </div>

                                {/* Gap relevance indicator */}
                                <div className="flex items-center gap-2 mt-2">
                                  <div
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                      course.gap >= 35
                                        ? "bg-red-100 dark:bg-red-900/20 text-red-600"
                                        : course.gap >= 20
                                        ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                                        : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600"
                                    }`}
                                  >
                                    Menutup gap {course.skill}: -{course.gap}%
                                  </div>
                                  <div className="text-[10px] text-muted-foreground">
                                    Relevansi {course.relevance}%
                                  </div>
                                </div>

                                <Button
                                  variant={i === 0 ? "hero" : "outline"}
                                  size="sm"
                                  className="gap-1.5 mt-3"
                                  onClick={() => {
                                    toast.success(`Mendaftar kursus: ${course.title}`);
                                  }}
                                >
                                  <GraduationCap className="w-3.5 h-3.5" />
                                  {i === 0 ? "Mulai Belajar Sekarang" : "Daftar Kursus"}
                                  <ExternalLink className="w-3 h-3 opacity-60" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!analysisComplete && !analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Brain className="w-10 h-10 text-accent" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Siap menganalisis profil Anda?
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Pilih target role di atas dan klik Analisis Sekarang untuk melihat gap kompetensi
                Anda secara kuantitatif.
              </p>
            </div>
            <Button variant="hero" size="sm" onClick={handleAnalyze} className="gap-1.5">
              <Sparkles className="w-4 h-4" /> Mulai Analisis
            </Button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}