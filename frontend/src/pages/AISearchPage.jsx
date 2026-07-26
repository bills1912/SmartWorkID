import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Send, Sparkles, User, Brain, MapPin, Building2, Clock,
  TrendingUp, CheckCircle2, ArrowRight, Target, Briefcase,
  Lightbulb, RefreshCw, Star, DollarSign, Zap, Heart, Trash2,
  AlertCircle, ChevronRight, GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip,
} from "recharts";

// ─── Suggestion prompts ──────────────────────────────────────────────────────
const SUGGESTION_PROMPTS = [
  "Saya lulusan statistika, menguasai Python dan SQL, fresh graduate, ingin kerja di data science startup Jakarta, ekspektasi gaji 8-12 juta",
  "Saya lulusan teknik informatika dengan 2 tahun pengalaman React, cari kerja remote gaji minimal 15 juta",
  "Saya fresh graduate manajemen, ingin kerja di startup fintech Jakarta",
  "Saya punya pengalaman 5 tahun di marketing digital, ingin pindah ke product management",
  "Cari pekerjaan data scientist yang menerima self-taught tanpa gelar S2",
];

// ─── Job result datasets ─────────────────────────────────────────────────────

// Dataset khusus untuk persona Rina (statistika + Python + SQL + data science + Jakarta)
const RINA_JOBS = [
  {
    title: "Junior Data Analyst",
    company: "Tokopedia",
    location: "Jakarta (Hybrid)",
    salary: "Rp 8-14 Jt",
    match: 91,
    type: "Full-time",
    mode: "Hybrid",
    matchBreakdown: {
      skill: 91,
      experience: 62,
      culture: 88,
      salary: 95,
      growth: 90,
      location: 100,
    },
    reason:
      "Python dan SQL Anda cocok dengan requirement utama posisi ini. Gap utama: pengalaman SQL production minimal 1 tahun.",
    aiSummary: {
      strengths: [
        "Python dan SQL sesuai requirement teknis posisi ini",
        "Latar belakang statistika relevan untuk analisis data",
        "Ekspektasi gaji dalam range yang ditawarkan perusahaan",
      ],
      gaps: [
        "Pengalaman SQL production: posisi ini mensyaratkan minimal 1 tahun — gap 35%",
        "TensorFlow / ML framework belum terdeteksi di profil Anda — gap 40%",
      ],
      opportunities: [
        "Ambil kursus SQL for Analytics di Dicoding untuk menutup gap pengalaman",
        "Mulai proyek portofolio analisis data sederhana menggunakan dataset publik",
      ],
    },
    skills: ["Python", "SQL", "Data Analysis", "Statistics"],
  },
  {
    title: "Data Analyst — Fintech",
    company: "GoPay",
    location: "Jakarta (On-site)",
    salary: "Rp 9-15 Jt",
    match: 84,
    type: "Full-time",
    mode: "On-site",
    matchBreakdown: {
      skill: 85,
      experience: 58,
      culture: 82,
      salary: 90,
      growth: 88,
      location: 100,
    },
    reason:
      "Skill statistika dan Python sangat relevan. Posisi ini cocok untuk fresh graduate dengan kemampuan analitis kuat.",
    aiSummary: {
      strengths: [
        "Background statistika menjadi nilai tambah di lingkungan fintech",
        "Python memenuhi requirement teknis utama",
        "Gaji sesuai ekspektasi Anda",
      ],
      gaps: [
        "SQL production experience masih minim untuk lingkungan data warehouse skala besar",
        "Belum ada pengalaman di domain keuangan/fintech",
      ],
      opportunities: [
        "Pelajari dasar-dasar analisis keuangan untuk memperkuat konteks domain",
        "Buat proyek analisis transaksi menggunakan dataset publik Kaggle",
      ],
    },
    skills: ["Python", "SQL", "Statistics", "Excel"],
  },
  {
    title: "Business Intelligence Analyst",
    company: "Traveloka",
    location: "Jakarta (Remote)",
    salary: "Rp 10-16 Jt",
    match: 78,
    type: "Full-time",
    mode: "Remote",
    matchBreakdown: {
      skill: 75,
      experience: 55,
      culture: 80,
      salary: 92,
      growth: 85,
      location: 100,
    },
    reason:
      "Posisi ini lebih cocok untuk Anda di 6-12 bulan mendatang setelah menambah pengalaman SQL dan visualisasi data.",
    aiSummary: {
      strengths: [
        "Gaji di atas ekspektasi Anda — ruang negosiasi yang baik",
        "Remote work sesuai preferensi fleksibilitas",
        "Python relevan untuk kebutuhan analisis mereka",
      ],
      gaps: [
        "Butuh pengalaman dengan tools BI seperti Tableau atau Metabase",
        "SQL tingkat lanjut (window functions, CTE) menjadi requirement utama",
      ],
      opportunities: [
        "Pelajari Metabase atau Tableau Public (gratis) untuk membangun portofolio BI",
        "Ikuti kursus Advanced SQL di Coursera untuk memperkuat gap ini",
      ],
    },
    skills: ["SQL", "Tableau", "Python", "BI Tools"],
  },
];

// Dataset umum (default)
const DEFAULT_JOBS = [
  {
    title: "Frontend Developer",
    company: "Tokopedia",
    location: "Jakarta (Remote)",
    salary: "Rp 15-25 Jt",
    match: 94,
    type: "Full-time",
    mode: "Remote",
    matchBreakdown: { skill: 96, experience: 90, culture: 92, salary: 95, growth: 93, location: 88 },
    reason: "Profil React Anda sangat cocok. Pengalaman 2 tahun memenuhi requirement minimum. Perusahaan mendukung remote work.",
    aiSummary: {
      strengths: ["React dan TypeScript sesuai requirement utama", "Pengalaman 2 tahun memenuhi standar minimum", "Remote work tersedia sesuai preferensi Anda"],
      gaps: ["Next.js belum terdeteksi — akan meningkatkan match score secara signifikan"],
      opportunities: ["Tambahkan proyek Next.js ke portfolio untuk memperkuat aplikasi ini"],
    },
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    title: "React Native Developer",
    company: "Gojek",
    location: "Jakarta (Hybrid)",
    salary: "Rp 18-28 Jt",
    match: 87,
    type: "Full-time",
    mode: "Hybrid",
    matchBreakdown: { skill: 88, experience: 85, culture: 90, salary: 88, growth: 85, location: 80 },
    reason: "Skill React Anda transferable ke React Native. Gaji di atas minimum yang Anda minta. Perlu sedikit adaptasi ke mobile.",
    aiSummary: {
      strengths: ["React experience sangat transferable ke React Native", "Gaji kompetitif di atas ekspektasi Anda"],
      gaps: ["Mobile development experience belum ada — perlu waktu adaptasi"],
      opportunities: ["Buat satu proyek React Native sederhana untuk membuktikan adaptasi Anda"],
    },
    skills: ["React Native", "TypeScript", "Mobile"],
  },
];

// Dataset career change
const CAREER_CHANGE_JOBS = [
  {
    title: "Associate Product Manager",
    company: "Bukalapak",
    location: "Jakarta",
    salary: "Rp 15-22 Jt",
    match: 76,
    type: "Full-time",
    mode: "Hybrid",
    matchBreakdown: { skill: 70, experience: 75, culture: 82, salary: 80, growth: 90, location: 85 },
    reason: "Background marketing digital Anda sangat berguna untuk PM role. Perlu belajar product analytics dan Agile.",
    aiSummary: {
      strengths: ["Pengalaman marketing digital sangat relevan untuk growth PM", "Pemahaman user behavior dari sisi marketing menjadi keunggulan"],
      gaps: ["Product analytics dan Agile/Scrum belum terdeteksi", "Technical understanding perlu diperkuat"],
      opportunities: ["Ambil sertifikasi Product Management dari Coursera atau Product School"],
    },
    skills: ["Product Strategy", "Agile", "Analytics"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Deteksi apakah input adalah persona Rina
const isRinaPersona = (msg) => {
  const lower = msg.toLowerCase();
  const hasStatistika = lower.includes("statistika") || lower.includes("statistik");
  const hasPythonSQL = lower.includes("python") && lower.includes("sql");
  const hasDataScience = lower.includes("data science") || lower.includes("data scientist") || lower.includes("data analyst");
  const hasJakarta = lower.includes("jakarta");
  return (hasStatistika || hasPythonSQL) && (hasDataScience || hasJakarta);
};

const isCareerChange = (msg) => {
  const lower = msg.toLowerCase();
  return lower.includes("pindah") || lower.includes("career change") || lower.includes("beralih");
};

// Analisis input pengguna
const analyzeInput = (msg) => {
  const lower = msg.toLowerCase();
  const detected = {
    skills: [],
    experience: "Belum terdeteksi",
    preference: [],
    salary: "Belum disebutkan",
    role: "Belum terdeteksi",
  };

  // Skill detection
  if (lower.includes("python")) detected.skills.push("Python");
  if (lower.includes("sql")) detected.skills.push("SQL");
  if (lower.includes("statistika") || lower.includes("statistik")) detected.skills.push("Statistika");
  if (lower.includes("react")) detected.skills.push("React");
  if (lower.includes("javascript") || lower.includes("js")) detected.skills.push("JavaScript");
  if (lower.includes("typescript")) detected.skills.push("TypeScript");
  if (lower.includes("data")) detected.skills.push("Data Analysis");
  if (lower.includes("marketing")) detected.skills.push("Digital Marketing");
  if (lower.includes("desain") || lower.includes("design")) detected.skills.push("Design");
  if (lower.includes("manajemen") || lower.includes("management")) detected.skills.push("Management");
  if (lower.includes("informatika") || lower.includes("teknik")) detected.skills.push("Computer Science");
  if (detected.skills.length === 0) detected.skills.push("General");

  // Experience detection
  const expMatch = lower.match(/(\d+)\s*tahun/);
  if (expMatch) detected.experience = `${expMatch[1]} tahun`;
  if (lower.includes("fresh graduate")) detected.experience = "Fresh Graduate";

  // Preference detection
  if (lower.includes("remote")) detected.preference.push("Remote");
  if (lower.includes("hybrid")) detected.preference.push("Hybrid");
  if (lower.includes("jakarta")) detected.preference.push("Jakarta");
  if (lower.includes("bandung")) detected.preference.push("Bandung");
  if (lower.includes("part-time")) detected.preference.push("Part-time");
  if (lower.includes("startup")) detected.preference.push("Startup");
  if (lower.includes("fintech")) detected.preference.push("Fintech");
  if (detected.preference.length === 0) detected.preference.push("Fleksibel");

  // Salary detection
  const salaryMatch = lower.match(/(\d+)\s*(?:-\s*(\d+))?\s*juta/);
  if (salaryMatch) {
    detected.salary = salaryMatch[2]
      ? `Rp ${salaryMatch[1]}–${salaryMatch[2]} Jt`
      : `Min. Rp ${salaryMatch[1]} Jt`;
  }

  // Role detection
  if (lower.includes("data science") || lower.includes("data scientist")) detected.role = "Data Scientist";
  else if (lower.includes("data analyst") || lower.includes("data analysis")) detected.role = "Data Analyst";
  else if (lower.includes("frontend") || lower.includes("react")) detected.role = "Frontend Developer";
  else if (lower.includes("backend")) detected.role = "Backend Developer";
  else if (lower.includes("product manager") || lower.includes("pm ")) detected.role = "Product Manager";
  else if (lower.includes("marketing")) detected.role = "Digital Marketing";
  else if (lower.includes("statistika")) detected.role = "Data / Statistik";

  return detected;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-accent"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground ml-2">AI sedang menganalisis profil Anda...</span>
  </div>
);

const MatchRadial = ({ value, size = 56 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color =
    value >= 85 ? "hsl(160, 60%, 40%)" : value >= 70 ? "hsl(185, 72%, 42%)" : "hsl(38, 92%, 50%)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(215, 15%, 90%)" strokeWidth={4} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{value}%</span>
      </div>
    </div>
  );
};

// Radar chart data builder untuk 6 dimensi
const buildRadarData = (breakdown) => [
  { dimension: "Skill", value: breakdown.skill, fullMark: 100 },
  { dimension: "Pengalaman", value: breakdown.experience, fullMark: 100 },
  { dimension: "Budaya", value: breakdown.culture, fullMark: 100 },
  { dimension: "Gaji", value: breakdown.salary, fullMark: 100 },
  { dimension: "Pertumbuhan", value: breakdown.growth, fullMark: 100 },
  { dimension: "Lokasi", value: breakdown.location, fullMark: 100 },
];

// Expanded job card dengan radar chart + AI summary (sesuai script)
const JobDetailPanel = ({ job, navigate }) => {
  const radarData = buildRadarData(job.matchBreakdown);
  const dimLabels = {
    skill: "Skill", experience: "Pengalaman", culture: "Budaya",
    salary: "Gaji", growth: "Pertumbuhan", location: "Lokasi",
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <Separator className="my-3" />

      {/* Tab header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
          <Brain className="w-3 h-3 text-accent" />
          <span className="text-[11px] font-semibold text-accent">AI Match Analysis</span>
        </div>
      </div>

      {/* Radar chart + dimensi scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Radar */}
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(215,15%,85%)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 10, fill: "hsl(215,15%,45%)" }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Match"
                dataKey="value"
                stroke="hsl(185, 72%, 42%)"
                fill="hsl(185, 72%, 42%)"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                formatter={(v) => [`${v}%`, "Score"]}
                contentStyle={{ fontSize: 11, borderRadius: 8 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension breakdown bars */}
        <div className="space-y-2">
          {Object.entries(job.matchBreakdown).map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[11px] text-muted-foreground">{dimLabels[key]}</span>
                <span
                  className={`text-[11px] font-bold ${
                    val >= 85 ? "text-green-600" : val >= 70 ? "text-accent" : "text-orange-500"
                  }`}
                >
                  {val}%
                </span>
              </div>
              <Progress value={val} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary — Strengths, Gaps, Opportunities */}
      {job.aiSummary && (
        <div className="space-y-3 mb-4">
          {/* Strengths */}
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 p-3">
            <p className="text-[11px] font-semibold text-green-700 dark:text-green-400 mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Kekuatan Profil Anda
            </p>
            <ul className="space-y-1">
              {job.aiSummary.strengths.map((s, i) => (
                <li key={i} className="text-xs text-green-800 dark:text-green-300 flex items-start gap-1.5">
                  <span className="mt-0.5 shrink-0">•</span>{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}
          <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 p-3">
            <p className="text-[11px] font-semibold text-orange-700 dark:text-orange-400 mb-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Gap yang Perlu Ditutup
            </p>
            <ul className="space-y-1">
              {job.aiSummary.gaps.map((g, i) => (
                <li key={i} className="text-xs text-orange-800 dark:text-orange-300 flex items-start gap-1.5">
                  <span className="mt-0.5 shrink-0">•</span>{g}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 p-3">
            <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Langkah yang Disarankan
            </p>
            <ul className="space-y-1">
              {job.aiSummary.opportunities.map((o, i) => (
                <li key={i} className="text-xs text-blue-800 dark:text-blue-300 flex items-start gap-1.5">
                  <span className="mt-0.5 shrink-0">•</span>{o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="hero"
          size="sm"
          className="gap-1"
          onClick={(e) => { e.stopPropagation(); toast.success("Lamaran berhasil dikirim!"); }}
        >
          Lamar Sekarang <ArrowRight className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-accent/30 text-accent hover:bg-accent/5"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/skill-advisor", { state: { autoRole: "data_scientist" } });
          }}
        >
          <GraduationCap className="w-3.5 h-3.5" /> Lihat Skill Gap Saya
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={(e) => { e.stopPropagation(); toast.success("Disimpan ke wishlist!"); }}
        >
          <Heart className="w-3.5 h-3.5" /> Simpan
        </Button>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AISearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const initialQuerySent = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const initialQuery = location.state?.initialQuery;
    if (initialQuery && !initialQuerySent.current) {
      initialQuerySent.current = true;
      setMessages([{ role: "user", type: "text", content: initialQuery }]);
      simulateAIResponse(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setExpandedJob(null);
    initialQuerySent.current = false;
  };

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);

    // Pilih dataset yang tepat berdasarkan input
    const rina = isRinaPersona(userMessage);
    const career = isCareerChange(userMessage);
    const jobs = rina ? RINA_JOBS : career ? CAREER_CHANGE_JOBS : DEFAULT_JOBS;

    const intro = rina
      ? "Berdasarkan profil statistika dan kemampuan Python + SQL Anda, berikut 3 posisi yang paling sesuai:"
      : career
      ? "Berdasarkan pengalaman Anda dan keinginan untuk beralih karir, berikut rekomendasi yang paling relevan:"
      : "Berdasarkan profil dan preferensi Anda, berikut pekerjaan yang paling cocok:";

    const tips = rina
      ? [
          "Perbarui LinkedIn dengan proyek analisis data menggunakan Python dan SQL",
          "Ikuti kursus SQL for Analytics di Dicoding untuk menutup gap pengalaman production",
          "Buat portfolio analisis data di GitHub menggunakan dataset publik Kaggle",
          "Daftarkan diri ke komunitas data analyst Indonesia di Telegram atau Discord",
        ]
      : career
      ? [
          "Untuk career change, sorot transferable skills di CV Anda",
          "Ambil sertifikasi yang relevan untuk memperkuat profil baru Anda",
          "Networking dengan profesional di bidang target akan sangat membantu",
          "Mulai dari role junior / associate tidak masalah sebagai langkah pertama",
        ]
      : [
          "Perbarui portfolio GitHub Anda dengan proyek terbaru",
          "Tambahkan TypeScript di CV karena banyak dicari perusahaan tech",
          "Negosiasi gaji lebih baik setelah lolos technical test",
          "Prepare system design interview untuk senior role",
        ];

    // Step 1: analysis card
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", type: "analysis", content: analyzeInput(userMessage) },
      ]);

      // Step 2: job results
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "ai", type: "jobs", content: { intro, jobs } },
        ]);

        // Step 3: tips
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "ai", type: "tips", content: tips },
          ]);

          // Step 4: CTA ke Skill Advisor (khusus persona Rina / data)
          if (rina) {
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { role: "ai", type: "skill_cta", content: null },
              ]);
            }, 800);
          }

          setIsTyping(false);
        }, 1200);
      }, 1800);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", type: "text", content: userMsg }]);
    simulateAIResponse(userMsg);
  };

  const handleSuggestion = (prompt) => {
    setInput("");
    setMessages((prev) => [...prev, { role: "user", type: "text", content: prompt }]);
    simulateAIResponse(prompt);
  };

  return (
    <AppLayout
      title="AI Job Search"
      subtitle="Ceritakan profil dan keinginan Anda, AI akan mencarikan pekerjaan terbaik"
    >
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        {/* Header actions */}
        {messages.length > 0 && (
          <div className="flex justify-end mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-destructive"
              onClick={handleReset}
              disabled={isTyping}
            >
              <Trash2 className="w-4 h-4" />
              Percakapan Baru
            </Button>
          </div>
        )}

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2">

          {/* Welcome state */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6"
              >
                <Sparkles className="w-10 h-10 text-accent" />
              </motion.div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Halo! Saya AI Asisten KerjaAI
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg text-center mb-8">
                Ceritakan tentang diri Anda — latar belakang, skill, pengalaman, dan pekerjaan
                impian Anda. Saya akan menganalisis dan mencarikan pekerjaan yang paling cocok.
              </p>
              <div className="w-full max-w-2xl space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 text-center">
                  Coba salah satu contoh:
                </p>
                {SUGGESTION_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleSuggestion(prompt)}
                    className="w-full text-left px-4 py-3 rounded-xl border border-border/50 bg-card hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 text-sm text-foreground cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{prompt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* User message */}
                {msg.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-2xl bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 text-sm">
                      {msg.content}
                    </div>
                  </div>

                /* Analysis card */
                ) : msg.type === "analysis" ? (
                  <div className="flex gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-4 h-4 text-accent" />
                    </div>
                    <Card className="flex-1 border-accent/20">
                      <CardContent className="p-4">
                        <p className="text-xs font-semibold text-accent mb-3 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Profil Terdeteksi dari Input Anda
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {msg.content.skills.map((s) => (
                                <Badge key={s} variant="accent" className="text-[10px] px-1.5 py-0">{s}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Pengalaman</p>
                            <p className="text-sm font-semibold text-foreground">{msg.content.experience}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Preferensi</p>
                            <div className="flex flex-wrap gap-1">
                              {msg.content.preference.map((p) => (
                                <Badge key={p} variant="secondary" className="text-[10px] px-1.5 py-0">{p}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Gaji</p>
                            <p className="text-sm font-semibold text-foreground">{msg.content.salary}</p>
                          </div>
                        </div>
                        {msg.content.role && msg.content.role !== "Belum terdeteksi" && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-accent" />
                            <span className="text-xs text-muted-foreground">
                              Role target terdeteksi: <strong className="text-foreground">{msg.content.role}</strong>
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                /* Job results */
                ) : msg.type === "jobs" ? (
                  <div className="flex gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Briefcase className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-sm text-foreground">{msg.content.intro}</p>
                      {msg.content.jobs.map((job, ji) => (
                        <Card
                          key={ji}
                          className={`border-border/50 hover:border-accent/30 transition-all duration-200 cursor-pointer ${
                            expandedJob === `${i}-${ji}` ? "border-accent/40 shadow-card" : ""
                          }`}
                          onClick={() =>
                            setExpandedJob(expandedJob === `${i}-${ji}` ? null : `${i}-${ji}`)
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <MatchRadial value={job.match} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="font-heading text-sm font-semibold text-foreground">
                                      {job.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                      <Building2 className="w-3 h-3" />{job.company} &bull;{" "}
                                      <MapPin className="w-3 h-3" />{job.location}
                                    </p>
                                  </div>
                                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                                    {job.salary}
                                  </Badge>
                                </div>
                                <p className="text-xs text-accent mt-2 leading-relaxed">
                                  <Sparkles className="w-3 h-3 inline mr-1" />
                                  {job.reason}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {job.skills.map((s) => (
                                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                                  ))}
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                                  <ChevronRight className="w-3 h-3" />
                                  {expandedJob === `${i}-${ji}` ? "Klik untuk tutup AI Analysis" : "Klik untuk buka AI Match Analysis"}
                                </p>
                              </div>
                            </div>

                            {/* Expanded AI Analysis */}
                            <AnimatePresence>
                              {expandedJob === `${i}-${ji}` && (
                                <JobDetailPanel job={job} navigate={navigate} />
                              )}
                            </AnimatePresence>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                /* Tips */
                ) : msg.type === "tips" ? (
                  <div className="flex gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Lightbulb className="w-4 h-4 text-accent" />
                    </div>
                    <Card className="flex-1 border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-accent" /> Tips AI untuk Meningkatkan Peluang
                        </p>
                        <ul className="space-y-2">
                          {msg.content.map((tip, ti) => (
                            <li key={ti} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                /* Skill Advisor CTA (muncul setelah hasil Rina) */
                ) : msg.type === "skill_cta" ? (
                  <div className="flex gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="w-4 h-4 text-accent" />
                    </div>
                    <Card className="flex-1 border-accent/30 bg-accent/5">
                      <CardContent className="p-4">
                        <p className="text-xs font-semibold text-accent mb-1 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Ingin tahu gap kompetensi Anda secara detail?
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Skill Advisor akan menghitung secara kuantitatif gap skill Anda untuk posisi
                          Data Scientist dan merekomendasikan kursus yang paling relevan.
                        </p>
                        <Button
                          variant="hero"
                          size="sm"
                          className="gap-1.5"
                          onClick={() =>
                            navigate("/skill-advisor", { state: { autoRole: "data_scientist" } })
                          }
                        >
                          <GraduationCap className="w-3.5 h-3.5" />
                          Buka Skill Advisor — Analisis Gap Saya
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}
        </div>

        {/* Input Area */}
        <div className="border-t border-border pt-4 mt-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ceritakan latar belakang, skill, dan pekerjaan impian Anda..."
                className="pr-12 h-12 text-sm"
                disabled={isTyping}
              />
            </div>
            <Button
              variant="hero"
              size="icon"
              className="h-12 w-12"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Sistem mengekstrak profil Anda dan mencocokkan dengan database lowongan menggunakan
            scoring 6 dimensi: Skill · Pengalaman · Budaya · Gaji · Pertumbuhan · Lokasi
          </p>
        </div>
      </div>
    </AppLayout>
  );
}