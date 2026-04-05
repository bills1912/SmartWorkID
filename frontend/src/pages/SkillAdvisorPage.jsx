import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Brain, Target, TrendingUp, AlertTriangle, CheckCircle2,
  ArrowRight, Sparkles, GraduationCap, BarChart3, Zap,
  BookOpen, Clock, Award, ChevronRight, Star,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip,
} from "recharts";
import { toast } from "sonner";

const roleProfiles = {
  frontend: {
    title: "Frontend Developer",
    skills: [
      { name: "JavaScript", current: 80, required: 90, category: "technical" },
      { name: "React/Vue", current: 75, required: 85, category: "technical" },
      { name: "TypeScript", current: 55, required: 80, category: "technical" },
      { name: "CSS/Design", current: 70, required: 80, category: "technical" },
      { name: "Testing", current: 45, required: 70, category: "technical" },
      { name: "Performance", current: 50, required: 75, category: "technical" },
      { name: "Communication", current: 80, required: 75, category: "soft" },
      { name: "Problem Solving", current: 70, required: 85, category: "soft" },
    ],
  },
  data_scientist: {
    title: "Data Scientist",
    skills: [
      { name: "Python", current: 70, required: 90, category: "technical" },
      { name: "Machine Learning", current: 50, required: 85, category: "technical" },
      { name: "Statistics", current: 60, required: 85, category: "technical" },
      { name: "SQL", current: 65, required: 80, category: "technical" },
      { name: "Data Viz", current: 55, required: 75, category: "technical" },
      { name: "Deep Learning", current: 35, required: 70, category: "technical" },
      { name: "Communication", current: 75, required: 80, category: "soft" },
      { name: "Critical Thinking", current: 70, required: 85, category: "soft" },
    ],
  },
  product_manager: {
    title: "Product Manager",
    skills: [
      { name: "Strategy", current: 60, required: 85, category: "technical" },
      { name: "Analytics", current: 55, required: 80, category: "technical" },
      { name: "User Research", current: 50, required: 80, category: "technical" },
      { name: "Agile/Scrum", current: 65, required: 85, category: "technical" },
      { name: "SQL", current: 40, required: 65, category: "technical" },
      { name: "Roadmapping", current: 55, required: 80, category: "technical" },
      { name: "Leadership", current: 70, required: 85, category: "soft" },
      { name: "Communication", current: 80, required: 90, category: "soft" },
    ],
  },
};

const trainingRecommendations = [
  {
    title: "Advanced TypeScript Masterclass",
    provider: "Dicoding",
    duration: "40 jam",
    level: "Intermediate",
    rating: 4.8,
    relevance: 95,
    skill: "TypeScript",
  },
  {
    title: "React Testing Library Complete Guide",
    provider: "Coursera",
    duration: "25 jam",
    level: "Intermediate",
    rating: 4.7,
    relevance: 90,
    skill: "Testing",
  },
  {
    title: "Web Performance Optimization",
    provider: "Udemy",
    duration: "30 jam",
    level: "Advanced",
    rating: 4.6,
    relevance: 88,
    skill: "Performance",
  },
  {
    title: "Problem Solving for Developers",
    provider: "LinkedIn Learning",
    duration: "15 jam",
    level: "Beginner",
    rating: 4.5,
    relevance: 82,
    skill: "Problem Solving",
  },
];

export default function SkillAdvisorPage() {
  const [selectedRole, setSelectedRole] = useState("frontend");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const profile = roleProfiles[selectedRole];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      toast.success("Analisis skill gap selesai!");
    }, 2000);
  };

  const radarData = profile.skills.map((s) => ({
    skill: s.name,
    current: s.current,
    required: s.required,
  }));

  const overallScore = Math.round(
    profile.skills.reduce((sum, s) => sum + s.current, 0) / profile.skills.length
  );
  const overallRequired = Math.round(
    profile.skills.reduce((sum, s) => sum + s.required, 0) / profile.skills.length
  );
  const gapPercentage = overallRequired - overallScore;

  const criticalGaps = profile.skills
    .filter((s) => s.required - s.current >= 20)
    .sort((a, b) => (b.required - b.current) - (a.required - a.current));

  const strengths = profile.skills
    .filter((s) => s.current >= s.required)
    .sort((a, b) => b.current - a.current);

  return (
    <AppLayout title="Skill Gap Advisor" subtitle="Analisis dan tingkatkan keterampilan Anda berdasarkan target karir">
      {/* Role Selection */}
      <Card className="border-border/50 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium text-foreground">Target Karir</Label>
              <Select value={selectedRole} onValueChange={(val) => { setSelectedRole(val); setAnalysisComplete(false); }}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="data_scientist">Data Scientist</SelectItem>
                  <SelectItem value="product_manager">Product Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="gap-2"
            >
              {analyzing ? (
                <>Menganalisis... <Sparkles className="w-4 h-4 animate-pulse" /></>
              ) : (
                <>Analisis Skill Gap <Brain className="w-4 h-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisComplete && (
        <div className="space-y-6">
          {/* Score Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">Skor Skill Saat Ini</p>
                <p className="font-heading text-3xl font-bold text-foreground">{overallScore}%</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">Target yang Dibutuhkan</p>
                <p className="font-heading text-3xl font-bold text-foreground">{overallRequired}%</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-warning/8 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">Gap yang Harus Ditutup</p>
                <p className="font-heading text-3xl font-bold text-foreground">{gapPercentage}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detail Skill</TabsTrigger>
              <TabsTrigger value="recommendations">Rekomendasi</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Radar Chart */}
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-heading">Peta Skill</CardTitle>
                    <CardDescription>Perbandingan skill Anda dengan persyaratan {profile.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(215, 15%, 90%)" />
                        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
                        <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="hsl(215, 15%, 90%)" domain={[0, 100]} />
                        <Radar name="Skill Anda" dataKey="current" stroke="hsl(185, 72%, 42%)" fill="hsl(185, 72%, 42%)" fillOpacity={0.2} strokeWidth={2} />
                        <Radar name="Persyaratan" dataKey="required" stroke="hsl(210, 80%, 45%)" fill="hsl(210, 80%, 45%)" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(0, 0%, 100%)",
                            border: "1px solid hsl(215, 15%, 90%)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Gaps & Strengths */}
                <div className="space-y-6">
                  {/* Critical Gaps */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-heading flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        Area yang Perlu Ditingkatkan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {criticalGaps.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-medium text-foreground">{skill.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {skill.current}% / {skill.required}%
                              </span>
                            </div>
                            <div className="relative">
                              <Progress value={skill.current} className="h-2" />
                              <div
                                className="absolute top-0 h-2 border-r-2 border-dashed border-primary/50"
                                style={{ left: `${skill.required}%` }}
                              />
                            </div>
                            <p className="text-xs text-warning mt-1">
                              Gap: {skill.required - skill.current}% — Perlu peningkatan
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Strengths */}
                  {strengths.length > 0 && (
                    <Card className="border-border/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-heading flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          Kekuatan Anda
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {strengths.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-3">
                              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                              <span className="text-sm text-foreground flex-1">{skill.name}</span>
                              <Badge variant="success" className="text-xs">{skill.current}%</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-heading">Detail Semua Skill</CardTitle>
                  <CardDescription>Analisis mendetail setiap keterampilan untuk posisi {profile.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {profile.skills.map((skill) => {
                      const gap = skill.required - skill.current;
                      const isStrength = gap <= 0;
                      return (
                        <div key={skill.name} className="p-4 rounded-xl border border-border/50 hover:border-accent/20 transition-colors duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                              <Badge variant={skill.category === "technical" ? "info" : "accent"} className="text-xs">
                                {skill.category === "technical" ? "Technical" : "Soft Skill"}
                              </Badge>
                            </div>
                            {isStrength ? (
                              <Badge variant="success" className="text-xs">Tercapai</Badge>
                            ) : (
                              <Badge variant="warning" className="text-xs">Gap {gap}%</Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Skill Anda</p>
                              <Progress value={skill.current} className="h-2.5" />
                              <p className="text-xs font-medium text-foreground mt-1">{skill.current}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Target</p>
                              <Progress value={skill.required} className="h-2.5" />
                              <p className="text-xs font-medium text-foreground mt-1">{skill.required}%</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <div className="grid sm:grid-cols-2 gap-5">
                {trainingRecommendations.map((course, i) => (
                  <Card key={i} className="h-full flex flex-col border-border/50 hover:border-accent/30 hover:shadow-card-hover transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Badge variant="accent" className="text-xs mb-2">{course.skill}</Badge>
                        <Badge variant="success" className="text-xs">{course.relevance}% Relevan</Badge>
                      </div>
                      <CardTitle className="text-base font-heading">{course.title}</CardTitle>
                      <CardDescription>{course.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{course.level}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning" />{course.rating}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button variant="heroOutline" size="sm" className="w-full gap-1">
                        Mulai Belajar <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Initial State */}
      {!analysisComplete && !analyzing && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-accent/8 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-accent" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-3">
            Mulai Analisis Skill Gap
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Pilih target karir Anda dan klik "Analisis Skill Gap" untuk mendapatkan
            rekomendasi yang dipersonalisasi berdasarkan AI.
          </p>
          <div className="flex justify-center gap-6">
            {["Identifikasi Gap", "Rekomendasi Training", "Action Plan"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{i + 1}</span>
                </div>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyzing State */}
      {analyzing && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-accent/8 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-accent" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-3">
            AI Sedang Menganalisis...
          </h3>
          <p className="text-sm text-muted-foreground">
            Membandingkan profil Anda dengan persyaratan {profile.title}
          </p>
        </div>
      )}
    </AppLayout>
  );
}
