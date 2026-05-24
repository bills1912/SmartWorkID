import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Briefcase, TrendingUp, Users, Brain, GraduationCap,
  BarChart3, Target, ArrowUpRight, ArrowDownRight, Clock,
  MapPin, Building2, CheckCircle2, Sparkles, CalendarDays,
  FileText, Star, Zap,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
} from "recharts";

const matchData = [
  { month: "Jan", matches: 120, applied: 45 },
  { month: "Feb", matches: 180, applied: 67 },
  { month: "Mar", matches: 240, applied: 89 },
  { month: "Apr", matches: 310, applied: 112 },
  { month: "Mei", matches: 390, applied: 145 },
  { month: "Jun", matches: 450, applied: 178 },
];

const skillRadarData = [
  { skill: "JavaScript", current: 85, required: 90 },
  { skill: "React", current: 80, required: 85 },
  { skill: "Python", current: 60, required: 75 },
  { skill: "SQL", current: 70, required: 80 },
  { skill: "Leadership", current: 65, required: 70 },
  { skill: "Communication", current: 75, required: 80 },
];

const regionData = [
  { region: "Jakarta", jobs: 15200 },
  { region: "Bandung", jobs: 4800 },
  { region: "Surabaya", jobs: 6300 },
  { region: "Yogyakarta", jobs: 3200 },
  { region: "Bali", jobs: 2800 },
  { region: "Medan", jobs: 3600 },
];

const pieData = [
  { name: "Teknologi", value: 35 },
  { name: "Keuangan", value: 22 },
  { name: "Kesehatan", value: 15 },
  { name: "Pendidikan", value: 12 },
  { name: "Lainnya", value: 16 },
];
const PIE_COLORS = [
  "hsl(210, 80%, 45%)",
  "hsl(185, 72%, 42%)",
  "hsl(160, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(215, 15%, 70%)",
];

const recentMatches = [
  { title: "Senior Frontend Developer", company: "Tokopedia", match: 96, status: "new" },
  { title: "Full Stack Engineer", company: "Gojek", match: 92, status: "applied" },
  { title: "React Developer", company: "Traveloka", match: 89, status: "interview" },
  { title: "UI Engineer", company: "Bukalapak", match: 85, status: "new" },
  { title: "Tech Lead", company: "Shopee", match: 82, status: "applied" },
];

const statusColors = {
  new: "accent",
  applied: "info",
  interview: "success",
};
const statusLabels = {
  new: "Baru",
  applied: "Dilamar",
  interview: "Interview",
};

export default function DashboardPage() {
  const [period, setPeriod] = useState("6m");

  const stats = [
    {
      label: "Total Match",
      value: "1,690",
      change: "+18.2%",
      trend: "up",
      icon: Brain,
      color: "text-primary",
      bg: "bg-primary/8",
    },
    {
      label: "Dilamar",
      value: "636",
      change: "+12.5%",
      trend: "up",
      icon: Briefcase,
      color: "text-accent",
      bg: "bg-accent/8",
    },
    {
      label: "Interview",
      value: "24",
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "text-success",
      bg: "bg-success/8",
    },
    {
      label: "Skill Score",
      value: "78%",
      change: "+5.1%",
      trend: "up",
      icon: Target,
      color: "text-chart-4",
      bg: "bg-warning/8",
    },
  ];

  return (
    <AppLayout title="Dashboard" subtitle="Selamat datang kembali! Berikut ringkasan aktivitas Anda.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">{stat.label}</p>
                    <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-destructive" />
                  )}
                  <span className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">dari bulan lalu</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Match Trend */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-heading">Tren Job Matching</CardTitle>
                <CardDescription>Jumlah match dan lamaran per bulan</CardDescription>
              </div>
              <Tabs value={period} onValueChange={setPeriod}>
                <TabsList className="h-8">
                  <TabsTrigger value="3m" className="text-xs px-2.5">3 Bln</TabsTrigger>
                  <TabsTrigger value="6m" className="text-xs px-2.5">6 Bln</TabsTrigger>
                  <TabsTrigger value="1y" className="text-xs px-2.5">1 Thn</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={matchData}>
                <defs>
                  <linearGradient id="matchGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 80%, 45%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(210, 80%, 45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="applyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(185, 72%, 42%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(185, 72%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 15%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(215, 15%, 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="matches" stroke="hsl(210, 80%, 45%)" fill="url(#matchGrad)" strokeWidth={2} name="Match" />
                <Area type="monotone" dataKey="applied" stroke="hsl(185, 72%, 42%)" fill="url(#applyGrad)" strokeWidth={2} name="Dilamar" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Industry Distribution */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-heading">Distribusi Industri</CardTitle>
            <CardDescription>Lowongan berdasarkan sektor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(215, 15%, 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: PIE_COLORS[i] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium text-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Radar */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-heading">Analisis Skill</CardTitle>
            <CardDescription>Skill Anda vs Persyaratan Pasar</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={skillRadarData}>
                <PolarGrid stroke="hsl(215, 15%, 90%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
                <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="hsl(215, 15%, 90%)" />
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

        {/* Recent Matches */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-heading">Match Terbaru</CardTitle>
                <CardDescription>Rekomendasi AI terbaru untuk Anda</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-accent">
                Lihat Semua
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMatches.map((match, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:border-accent/20 hover:bg-muted/30 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{match.title}</p>
                    <p className="text-xs text-muted-foreground">{match.company}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={statusColors[match.status]} className="text-xs">
                      {statusLabels[match.status]}
                    </Badge>
                    <span className="text-sm font-bold text-accent">{match.match}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goals + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Weekly Goals */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-accent" />
                  Target Minggu Ini
                </CardTitle>
                <CardDescription>Progres menuju tujuan karir mingguan Anda</CardDescription>
              </div>
              <Badge variant="accent" className="text-xs">Minggu ke-21</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Lamaran Dikirim", current: 6, target: 10, icon: FileText, color: "text-primary" },
              { label: "Lowongan Ditinjau", current: 23, target: 30, icon: Briefcase, color: "text-accent" },
              { label: "Skill Ditingkatkan", current: 2, target: 3, icon: Brain, color: "text-success" },
              { label: "Kursus Diselesaikan", current: 1, target: 2, icon: GraduationCap, color: "text-chart-4" },
            ].map((goal) => {
              const Icon = goal.icon;
              const pct = Math.round((goal.current / goal.target) * 100);
              return (
                <div key={goal.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon className={`w-4 h-4 ${goal.color}`} />
                      <span className="font-medium text-foreground">{goal.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{goal.current}/{goal.target}</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  Aktivitas Terbaru
                </CardTitle>
                <CardDescription>Riwayat aktivitas akun Anda</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { text: "Lamaran dikirim ke Tokopedia — Senior Frontend Dev", time: "2 jam lalu", color: "bg-accent/10", icon: Briefcase, iconColor: "text-accent" },
                { text: "AI match baru: 96% untuk React Developer di Gojek", time: "5 jam lalu", color: "bg-primary/10", icon: Sparkles, iconColor: "text-primary" },
                { text: "Kursus TypeScript diselesaikan — +10 skill points", time: "Kemarin", color: "bg-success/10", icon: CheckCircle2, iconColor: "text-success" },
                { text: "Profil diperbarui — skor profil naik ke 87%", time: "2 hari lalu", color: "bg-chart-4/10", icon: Star, iconColor: "text-chart-4" },
                { text: "Diundang interview oleh Traveloka", time: "3 hari lalu", color: "bg-success/10", icon: Users, iconColor: "text-success" },
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${act.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${act.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground leading-relaxed">{act.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{act.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Jobs */}
      <Card className="mt-6 border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading">Lowongan per Wilayah</CardTitle>
          <CardDescription>Distribusi lowongan kerja di kota-kota utama Indonesia</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 15%, 90%)" />
              <XAxis dataKey="region" tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(215, 15%, 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="jobs" fill="hsl(185, 72%, 42%)" radius={[6, 6, 0, 0]} name="Lowongan" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
