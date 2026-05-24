import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const SUGGESTION_PROMPTS = [
  "Saya lulusan teknik informatika dengan 2 tahun pengalaman React, cari kerja remote gaji minimal 15 juta",
  "Saya fresh graduate manajemen, ingin kerja di startup fintech Jakarta",
  "Saya punya pengalaman 5 tahun di marketing digital, ingin pindah ke product management",
  "Cari pekerjaan data scientist yang menerima self-taught tanpa gelar S2",
  "Saya ibu rumah tangga yang ingin kembali bekerja part-time di bidang desain",
];

const AI_JOB_RESULTS = {
  default: [
    {
      title: "Frontend Developer", company: "Tokopedia", location: "Jakarta (Remote)",
      salary: "Rp 15-25 Jt", match: 94, type: "Full-time",
      matchBreakdown: { skill: 96, experience: 90, culture: 92, salary: 95, growth: 93 },
      reason: "Profil React Anda sangat cocok. Pengalaman 2 tahun memenuhi requirement minimum. Perusahaan mendukung remote work.",
      skills: ["React", "TypeScript", "Next.js"],
    },
    {
      title: "React Native Developer", company: "Gojek", location: "Jakarta (Hybrid)",
      salary: "Rp 18-28 Jt", match: 87, type: "Full-time",
      matchBreakdown: { skill: 88, experience: 85, culture: 90, salary: 88, growth: 85 },
      reason: "Skill React Anda transferable ke React Native. Gaji di atas minimum yang Anda minta. Perlu sedikit adaptasi ke mobile.",
      skills: ["React Native", "TypeScript", "Mobile"],
    },
    {
      title: "Full Stack Engineer", company: "Traveloka", location: "Jakarta (Remote)",
      salary: "Rp 20-35 Jt", match: 81, type: "Full-time",
      matchBreakdown: { skill: 78, experience: 80, culture: 85, salary: 92, growth: 88 },
      reason: "Perlu peningkatan di backend (Node.js/Python), tapi frontend skill Anda kuat. Gaji sangat kompetitif.",
      skills: ["React", "Node.js", "PostgreSQL"],
    },
  ],
  career_change: [
    {
      title: "Associate Product Manager", company: "Bukalapak", location: "Jakarta",
      salary: "Rp 15-22 Jt", match: 76, type: "Full-time",
      matchBreakdown: { skill: 70, experience: 75, culture: 82, salary: 80, growth: 90 },
      reason: "Background marketing digital Anda sangat berguna untuk PM role. Perlu belajar product analytics dan Agile.",
      skills: ["Product Strategy", "Agile", "Analytics"],
    },
    {
      title: "Growth Product Manager", company: "Shopee", location: "Jakarta",
      salary: "Rp 18-28 Jt", match: 72, type: "Full-time",
      matchBreakdown: { skill: 68, experience: 72, culture: 78, salary: 75, growth: 85 },
      reason: "Pengalaman marketing Anda di growth sangat relevan. Butuh tambahan skill di product development.",
      skills: ["Growth", "Analytics", "A/B Testing"],
    },
  ],
};

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
    <span className="text-xs text-muted-foreground ml-2">AI sedang menganalisis...</span>
  </div>
);

const MatchRadial = ({ value, size = 56 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 85 ? "hsl(160, 60%, 40%)" : value >= 70 ? "hsl(185, 72%, 42%)" : "hsl(38, 92%, 50%)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(215, 15%, 90%)" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{value}%</span>
      </div>
    </div>
  );
};

export default function AISearchPage() {
  const location = useLocation();
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
    const isCareerChange = userMessage.toLowerCase().includes("pindah") || userMessage.toLowerCase().includes("career change");
    const jobs = isCareerChange ? AI_JOB_RESULTS.career_change : AI_JOB_RESULTS.default;

    // First message: analysis
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          type: "analysis",
          content: analyzeUserInput(userMessage),
        },
      ]);

      // Second message: job results
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            type: "jobs",
            content: {
              intro: isCareerChange
                ? "Berdasarkan pengalaman Anda dan keinginan untuk beralih karir, berikut rekomendasi yang paling relevan:"
                : "Berdasarkan profil dan preferensi Anda, berikut pekerjaan yang paling cocok:",
              jobs: jobs,
            },
          },
        ]);

        // Third message: tips
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              type: "tips",
              content: isCareerChange
                ? [
                    "Untuk career change, sorot transferable skills di CV Anda",
                    "Ambil kursus product management untuk memperkuat profil",
                    "Networking dengan PM di komunitas akan sangat membantu",
                    "Mulai dari role junior/associate tidak masalah",
                  ]
                : [
                    "Perbarui portfolio GitHub Anda dengan proyek terbaru",
                    "Tambahkan TypeScript di CV karena banyak dicari",
                    "Negosiasi gaji lebih baik setelah lolos technical test",
                    "Prepare system design interview untuk senior role",
                  ],
            },
          ]);
          setIsTyping(false);
        }, 1200);
      }, 1800);
    }, 2000);
  };

  const analyzeUserInput = (msg) => {
    const lower = msg.toLowerCase();
    const detected = {
      skills: [],
      experience: "Belum terdeteksi",
      preference: [],
      salary: "Belum disebutkan",
    };

    if (lower.includes("react")) detected.skills.push("React");
    if (lower.includes("javascript") || lower.includes("js")) detected.skills.push("JavaScript");
    if (lower.includes("python")) detected.skills.push("Python");
    if (lower.includes("data")) detected.skills.push("Data Analysis");
    if (lower.includes("marketing")) detected.skills.push("Digital Marketing");
    if (lower.includes("desain") || lower.includes("design")) detected.skills.push("Design");
    if (lower.includes("manajemen") || lower.includes("management")) detected.skills.push("Management");
    if (lower.includes("informatika") || lower.includes("teknik")) detected.skills.push("Computer Science");
    if (detected.skills.length === 0) detected.skills.push("General");

    const expMatch = lower.match(/(\d+)\s*tahun/);
    if (expMatch) detected.experience = `${expMatch[1]} tahun`;
    if (lower.includes("fresh graduate")) detected.experience = "Fresh Graduate";

    if (lower.includes("remote")) detected.preference.push("Remote");
    if (lower.includes("hybrid")) detected.preference.push("Hybrid");
    if (lower.includes("jakarta")) detected.preference.push("Jakarta");
    if (lower.includes("bandung")) detected.preference.push("Bandung");
    if (lower.includes("part-time")) detected.preference.push("Part-time");
    if (lower.includes("startup")) detected.preference.push("Startup");
    if (lower.includes("fintech")) detected.preference.push("Fintech");
    if (detected.preference.length === 0) detected.preference.push("Fleksibel");

    const salaryMatch = lower.match(/(\d+)\s*juta/);
    if (salaryMatch) detected.salary = `Min. Rp ${salaryMatch[1]} Jt`;

    return detected;
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
    <AppLayout title="AI Job Search" subtitle="Ceritakan profil dan keinginan Anda, AI akan mencarikan pekerjaan terbaik">
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
          {/* Welcome */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6"
              >
                <Sparkles className="w-10 h-10 text-accent" />
              </motion.div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Halo! Saya AI Asisten KerjaAI</h2>
              <p className="text-sm text-muted-foreground max-w-lg text-center mb-8">
                Ceritakan tentang diri Anda — latar belakang, skill, pengalaman, dan pekerjaan impian Anda.
                Saya akan menganalisis dan mencarikan pekerjaan yang paling cocok untuk Anda.
              </p>
              <div className="w-full max-w-2xl space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 text-center">Coba salah satu contoh:</p>
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
                {msg.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-2xl bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 text-sm">
                      {msg.content}
                    </div>
                  </div>
                ) : msg.type === "analysis" ? (
                  <div className="flex gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-4 h-4 text-accent" />
                    </div>
                    <Card className="flex-1 border-accent/20">
                      <CardContent className="p-4">
                        <p className="text-xs font-semibold text-accent mb-3 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Analisis Profil Terdeteksi
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
                      </CardContent>
                    </Card>
                  </div>
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
                          onClick={() => setExpandedJob(expandedJob === `${i}-${ji}` ? null : `${i}-${ji}`)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <MatchRadial value={job.match} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="font-heading text-sm font-semibold text-foreground">{job.title}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                      <Building2 className="w-3 h-3" />{job.company} &bull; <MapPin className="w-3 h-3" />{job.location}
                                    </p>
                                  </div>
                                  <Badge variant="secondary" className="text-xs flex-shrink-0">{job.salary}</Badge>
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
                              </div>
                            </div>

                            {/* Expanded Detail */}
                            <AnimatePresence>
                              {expandedJob === `${i}-${ji}` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <Separator className="my-3" />
                                  <p className="text-xs font-semibold text-foreground mb-2">Detail Kecocokan AI</p>
                                  <div className="grid grid-cols-5 gap-2">
                                    {Object.entries(job.matchBreakdown).map(([key, val]) => {
                                      const labels = { skill: "Skill", experience: "Pengalaman", culture: "Budaya", salary: "Gaji", growth: "Pertumbuhan" };
                                      return (
                                        <div key={key} className="text-center">
                                          <MatchRadial value={val} size={44} />
                                          <p className="text-[10px] text-muted-foreground mt-1">{labels[key]}</p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className="flex gap-2 mt-3">
                                    <Button variant="hero" size="sm" className="gap-1" onClick={(e) => { e.stopPropagation(); toast.success("Lamaran dikirim!"); }}>
                                      Lamar <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1" onClick={(e) => { e.stopPropagation(); toast.success("Disimpan!"); }}>
                                      <Heart className="w-3.5 h-3.5" /> Simpan
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : msg.type === "tips" ? (
                  <div className="flex gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Lightbulb className="w-4 h-4 text-accent" />
                    </div>
                    <Card className="flex-1 border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-accent" /> Tips dari AI untuk Meningkatkan Peluang
                        </p>
                        <ul className="space-y-2">
                          {msg.content.map((tip, ti) => (
                            <li key={ti} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
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
            AI menganalisis profil Anda dan mencocokkan dengan database 50.000+ lowongan kerja aktif
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
