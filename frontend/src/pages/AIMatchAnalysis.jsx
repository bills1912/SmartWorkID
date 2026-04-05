import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Brain, Target, TrendingUp, CheckCircle2, AlertTriangle,
  Sparkles, ArrowRight, Heart, DollarSign, Users,
  MapPin, Building2, Award, Zap, GraduationCap,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip,
} from "recharts";

const dimensionIcons = {
  "Technical Skill": Brain,
  "Pengalaman": Award,
  "Budaya Kerja": Users,
  "Kesesuaian Gaji": DollarSign,
  "Potensi Pertumbuhan": TrendingUp,
  "Lokasi": MapPin,
};

export const AIMatchDetail = ({ job, onClose, onApply }) => {
  if (!job) return null;

  const matchDimensions = [
    { dimension: "Technical Skill", score: job.matchBreakdown?.skill || 85, weight: "30%", detail: "Kecocokan skill teknis Anda dengan persyaratan posisi" },
    { dimension: "Pengalaman", score: job.matchBreakdown?.experience || 78, weight: "25%", detail: "Relevansi pengalaman kerja Anda" },
    { dimension: "Budaya Kerja", score: job.matchBreakdown?.culture || 82, weight: "15%", detail: "Kesesuaian dengan budaya dan nilai perusahaan" },
    { dimension: "Kesesuaian Gaji", score: job.matchBreakdown?.salary || 90, weight: "15%", detail: "Kecocokan ekspektasi gaji Anda dengan range yang ditawarkan" },
    { dimension: "Potensi Pertumbuhan", score: job.matchBreakdown?.growth || 88, weight: "10%", detail: "Peluang pengembangan karir di posisi ini" },
    { dimension: "Lokasi", score: 92, weight: "5%", detail: "Kesesuaian lokasi dengan preferensi Anda" },
  ];

  const radarData = matchDimensions.map((d) => ({
    subject: d.dimension,
    score: d.score,
    fullMark: 100,
  }));

  const overallScore = job.match || Math.round(
    matchDimensions.reduce((sum, d) => sum + d.score * (parseInt(d.weight) / 100), 0)
  );

  const strengths = matchDimensions.filter((d) => d.score >= 85);
  const gaps = matchDimensions.filter((d) => d.score < 75);
  const improvements = matchDimensions.filter((d) => d.score >= 75 && d.score < 85);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <svg width={80} height={80} className="-rotate-90">
            <circle cx={40} cy={40} r={34} fill="none" stroke="hsl(215, 15%, 90%)" strokeWidth={6} />
            <circle cx={40} cy={40} r={34} fill="none" stroke="hsl(185, 72%, 42%)" strokeWidth={6}
              strokeDasharray={2 * Math.PI * 34} strokeDashoffset={(2 * Math.PI * 34) * (1 - overallScore / 100)}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-xl font-bold text-foreground">{overallScore}%</span>
          </div>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">{job.title}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />{job.company} &bull; {job.location}
          </p>
          <Badge variant={overallScore >= 85 ? "success" : overallScore >= 70 ? "accent" : "warning"} className="mt-1 text-xs">
            {overallScore >= 85 ? "Sangat Cocok" : overallScore >= 70 ? "Cocok" : "Cukup Cocok"}
          </Badge>
        </div>
      </div>

      {/* Radar Chart */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-accent" /> Analisis Multi-Dimensi AI
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(215, 15%, 90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" />
              <PolarRadiusAxis tick={{ fontSize: 9 }} stroke="hsl(215, 15%, 90%)" domain={[0, 100]} />
              <Radar dataKey="score" stroke="hsl(185, 72%, 42%)" fill="hsl(185, 72%, 42%)" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(215, 15%, 90%)", borderRadius: "8px", fontSize: "11px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Dimension Breakdown */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-accent" /> Breakdown Kecocokan
        </p>
        {matchDimensions.map((dim) => {
          const Icon = dimensionIcons[dim.dimension] || Brain;
          return (
            <div key={dim.dimension} className="p-3 rounded-lg border border-border/30 hover:border-accent/20 transition-colors duration-200">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground flex-1">{dim.dimension}</span>
                <span className="text-xs text-muted-foreground">Bobot: {dim.weight}</span>
                <span className={`text-xs font-bold ${
                  dim.score >= 85 ? "text-success" : dim.score >= 70 ? "text-accent" : "text-warning"
                }`}>{dim.score}%</span>
              </div>
              <Progress value={dim.score} className="h-1.5 mb-1" />
              <p className="text-[10px] text-muted-foreground">{dim.detail}</p>
            </div>
          );
        })}
      </div>

      {/* AI Summary */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Ringkasan AI
          </p>
          {strengths.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] text-success font-semibold uppercase tracking-wider mb-1">Kekuatan</p>
              <ul className="space-y-1">
                {strengths.map((s) => (
                  <li key={s.dimension} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-success mt-0.5" />
                    {s.dimension}: skor {s.score}% — di atas rata-rata pelamar
                  </li>
                ))}
              </ul>
            </div>
          )}
          {gaps.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] text-warning font-semibold uppercase tracking-wider mb-1">Perlu Ditingkatkan</p>
              <ul className="space-y-1">
                {gaps.map((g) => (
                  <li key={g.dimension} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-warning mt-0.5" />
                    {g.dimension}: skor {g.score}% — ambil kursus terkait untuk meningkatkan
                  </li>
                ))}
              </ul>
            </div>
          )}
          {improvements.length > 0 && (
            <div>
              <p className="text-[10px] text-info font-semibold uppercase tracking-wider mb-1">Peluang Peningkatan</p>
              <ul className="space-y-1">
                {improvements.map((im) => (
                  <li key={im.dimension} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <Zap className="w-3 h-3 text-info mt-0.5" />
                    {im.dimension}: sedikit peningkatan akan meningkatkan match rate secara signifikan
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIMatchDetail;
