import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Search, ArrowRight, Brain, Target, GraduationCap, BarChart3, Globe2,
  Sparkles, Users, Building2, TrendingUp, CheckCircle2, Star, Shield,
  Zap, Clock, Award, ChevronRight, MapPin, Briefcase, Play,
} from "lucide-react";

/* ============ ANIMATION HELPERS ============ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ============ COUNTER ============ */
const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <span ref={ref} className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

/* ============ LANDING PAGE ============ */
export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: Sparkles,
      title: "AI Prompting Search",
      description: "Ceritakan profil Anda dalam bahasa alami dan AI akan menganalisis serta merekomendasikan pekerjaan terbaik \u2014 bukan sekadar keyword search biasa.",
      color: "text-accent",
      bg: "bg-accent/8",
      isNew: true,
    },
    {
      icon: Brain,
      title: "Deep AI Match Analysis",
      description: "Bukan hanya persentase kecocokan. Analisis mendalam 6 dimensi: skill, pengalaman, budaya kerja, gaji, pertumbuhan, dan lokasi \u2014 lengkap dengan AI summary.",
      color: "text-primary",
      bg: "bg-primary/8",
      isNew: true,
    },
    {
      icon: Target,
      title: "Career Path Analyzer",
      description: "Peta jalan karir interaktif yang menunjukkan berbagai jalur karir, skill gap per tahap, proyeksi gaji, dan timeline \u2014 seperti skill tree dalam game.",
      color: "text-success",
      bg: "bg-success/8",
      isNew: true,
    },
    {
      icon: BarChart3,
      title: "Skill Gap Advisor",
      description: "AI menganalisis kesenjangan skill Anda vs persyaratan pasar dan memberikan rekomendasi pelatihan yang dipersonalisasi untuk menutup gap.",
      color: "text-chart-4",
      bg: "bg-warning/8",
    },
    {
      icon: GraduationCap,
      title: "Personalized Training",
      description: "Program pelatihan yang disesuaikan berdasarkan hasil skill gap analysis, memastikan setiap jam belajar relevan dan berdampak pada karir Anda.",
      color: "text-info",
      bg: "bg-info/8",
    },
    {
      icon: Globe2,
      title: "Matching Antarwilayah",
      description: "Jangkauan nasional yang menghubungkan pencari kerja dengan peluang di berbagai daerah di seluruh Indonesia, termasuk remote opportunities.",
      color: "text-primary-light",
      bg: "bg-primary/5",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Buat Profil",
      description: "Daftarkan diri, lengkapi profil, dan upload CV Anda. AI kami akan menganalisis skill dan pengalaman Anda secara otomatis.",
      icon: Users,
    },
    {
      step: "02",
      title: "AI Mencocokkan",
      description: "Algoritma AI kami memproses data Anda dan mencocokkan dengan ribuan lowongan kerja yang paling sesuai di seluruh Indonesia.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Mulai Bekerja",
      description: "Terima rekomendasi pekerjaan terbaik, lamar dengan satu klik, dan mulai perjalanan karir baru Anda.",
      icon: Award,
    },
  ];

  const testimonials = [
    {
      name: "Rina Handayani",
      role: "Software Developer",
      company: "Tokopedia",
      text: "KerjaAI membantu saya menemukan pekerjaan impian dalam waktu 2 minggu! Fitur skill gap advisor sangat berguna untuk tahu apa yang perlu saya tingkatkan.",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "HR Manager",
      company: "Gojek",
      text: "Sebagai recruiter, platform ini luar biasa efisien. AI matching menghemat waktu kami 70% dalam proses seleksi kandidat yang berkualitas.",
      rating: 5,
    },
    {
      name: "Siti Nurhaliza",
      role: "Data Analyst",
      company: "Bukalapak",
      text: "Personalized training dari KerjaAI benar-benar mengubah karir saya. Dari fresh graduate, kini saya bekerja di perusahaan top Indonesia.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Gratis",
      description: "Untuk pencari kerja yang baru memulai",
      features: [
        "5 AI job match per bulan",
        "Skill gap analysis dasar",
        "Akses 2 kursus gratis",
        "Profil pencari kerja",
      ],
      cta: "Mulai Gratis",
      popular: false,
    },
    {
      name: "Professional",
      price: "Rp 99.000",
      period: "/bulan",
      description: "Untuk profesional yang serius dengan karirnya",
      features: [
        "Unlimited AI job match",
        "Skill gap analysis mendalam",
        "Akses semua kursus premium",
        "Matching antarwilayah",
        "Priority support",
        "Resume AI builder",
      ],
      cta: "Pilih Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Untuk perusahaan & organisasi",
      features: [
        "Semua fitur Professional",
        "Dashboard analitik perusahaan",
        "API integration",
        "Dedicated account manager",
        "Custom training programs",
        "Bulk candidate matching",
      ],
      cta: "Hubungi Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Apa itu KerjaAI?",
      a: "KerjaAI adalah platform digitalisasi penciptaan lapangan kerja berbasis kecerdasan artifisial yang menghubungkan pencari kerja dengan perusahaan melalui teknologi AI matching.",
    },
    {
      q: "Bagaimana cara kerja AI Job Matching?",
      a: "AI kami menganalisis profil Anda termasuk skill, pengalaman, pendidikan, dan preferensi, lalu mencocokkan dengan database lowongan kerja menggunakan algoritma machine learning untuk menemukan kecocokan terbaik.",
    },
    {
      q: "Apakah gratis untuk pencari kerja?",
      a: "Ya! Paket Starter kami sepenuhnya gratis untuk pencari kerja dengan fitur dasar termasuk 5 AI match per bulan dan skill gap analysis dasar.",
    },
    {
      q: "Bagaimana Skill Gap Advisor bekerja?",
      a: "Skill Gap Advisor menganalisis keterampilan Anda saat ini dan membandingkannya dengan persyaratan pekerjaan yang Anda targetkan, lalu memberikan rekomendasi pelatihan spesifik untuk menutup gap tersebut.",
    },
    {
      q: "Apakah lowongan kerja terverifikasi?",
      a: "Ya, setiap perusahaan dan lowongan kerja di platform kami melalui proses verifikasi ketat untuk memastikan keaslian dan keamanan bagi pencari kerja.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Badge variant="accent" className="mb-6 text-sm px-4 py-1.5">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Platform AI #1 di Indonesia
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6"
              >
                Digitalisasi{" "}
                <span className="text-gradient-primary">Penciptaan</span>{" "}
                Lapangan Kerja
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8"
              >
                Bukan sekadar job board. Ceritakan profil Anda dalam bahasa alami,
                dan AI kami akan menganalisis, mencocokkan, serta memetakan
                jalur karir terbaik untuk Anda.
              </motion.p>

              {/* AI Search CTA */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-8 max-w-lg">
                <div className="relative flex-1">
                  <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                  <Input
                    placeholder="Contoh: Saya lulusan IT, 2 tahun React, cari remote..."
                    className="pl-11 h-12 text-base bg-card border-border/60"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    readOnly
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/ai-search">Coba AI Search <Sparkles className="w-4 h-4" /></Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/jobs">Jelajahi Lowongan</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeUp} className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Gratis untuk pencari kerja
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  50K+ lowongan aktif
                </span>
              </motion.div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                  alt="KerjaAI Analytics Dashboard"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-xl p-4 border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Match Rate Tinggi</p>
                      <p className="text-xs text-muted-foreground">94% akurasi AI matching</p>
                    </div>
                    <Badge variant="success" className="ml-auto">+12%</Badge>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-strong rounded-xl p-3 border border-border/30 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  <span className="text-xs font-semibold text-foreground">AI Powered</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 50000, suffix: "+", label: "Lowongan Aktif" },
              { value: 200000, suffix: "+", label: "Pencari Kerja" },
              { value: 5000, suffix: "+", label: "Perusahaan" },
              { value: 94, suffix: "%", label: "Akurasi AI Match" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">Fitur Unggulan</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Yang Membedakan KerjaAI
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Bukan sekadar job board biasa. KerjaAI menghadirkan AI yang benar-benar memahami profil dan aspirasi karir Anda.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={i} variants={fadeUp}>
                    <Card className={`group h-full flex flex-col border-border/50 hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer ${feature.isNew ? "relative overflow-hidden" : ""}`}>
                      {feature.isNew && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="accent" className="text-[10px] px-2 py-0.5 gap-1">
                            <Zap className="w-2.5 h-2.5" /> Pembeda
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-3`}>
                          <Icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <CardTitle className="text-lg font-heading">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <CardDescription className="text-sm leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                          Pelajari lebih lanjut <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="py-20 sm:py-28 bg-gradient-subtle relative overflow-hidden noise-bg">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">Perbandingan</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Kenapa KerjaAI Berbeda?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Bukan sekadar job board. Bandingkan sendiri fitur yang hanya ada di KerjaAI.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left px-5 py-4 font-heading font-semibold text-foreground">Fitur</th>
                          <th className="text-center px-5 py-4 font-heading font-semibold text-accent">KerjaAI</th>
                          <th className="text-center px-5 py-4 font-heading font-semibold text-muted-foreground">JobStreet</th>
                          <th className="text-center px-5 py-4 font-heading font-semibold text-muted-foreground">Glassdoor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: "AI Prompting Search (bahasa alami)", kerjaai: true, jobstreet: false, glassdoor: false },
                          { feature: "Deep AI Match Analysis (6 dimensi)", kerjaai: true, jobstreet: false, glassdoor: false },
                          { feature: "Career Path Interaktif + Proyeksi Gaji", kerjaai: true, jobstreet: false, glassdoor: false },
                          { feature: "Skill Gap Analysis + Rekomendasi Training", kerjaai: true, jobstreet: false, glassdoor: false },
                          { feature: "Pencarian Keyword Biasa", kerjaai: true, jobstreet: true, glassdoor: true },
                          { feature: "Daftar Lowongan Kerja", kerjaai: true, jobstreet: true, glassdoor: true },
                          { feature: "Review Perusahaan", kerjaai: false, jobstreet: true, glassdoor: true },
                          { feature: "Matching Antarwilayah Indonesia", kerjaai: true, jobstreet: false, glassdoor: false },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="px-5 py-3.5 text-foreground">{row.feature}</td>
                            <td className="px-5 py-3.5 text-center">
                              {row.kerjaai ? <CheckCircle2 className="w-5 h-5 text-accent mx-auto" /> : <span className="text-muted-foreground">&mdash;</span>}
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              {row.jobstreet ? <CheckCircle2 className="w-5 h-5 text-muted-foreground/40 mx-auto" /> : <span className="text-muted-foreground">&mdash;</span>}
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              {row.glassdoor ? <CheckCircle2 className="w-5 h-5 text-muted-foreground/40 mx-auto" /> : <span className="text-muted-foreground">&mdash;</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">Cara Kerja</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Tiga Langkah Menuju Karir Impian
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Proses yang sederhana namun powerful, didukung teknologi AI terdepan
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={i} variants={fadeUp} className="relative">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card shadow-card border border-border/50 mb-6">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <span className="block text-xs font-bold text-accent uppercase tracking-wider mb-2">
                        Langkah {step.step}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    {/* Connector */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+48px)] w-[calc(100%-96px)] border-t-2 border-dashed border-border" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== JOB PREVIEW ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">Lowongan Terbaru</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Temukan Peluang Karir Terbaik
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Frontend Developer", company: "Tokopedia", location: "Jakarta", type: "Full-time", salary: "Rp 15-25 Jt", match: 95, skills: ["React", "TypeScript", "Tailwind"] },
                { title: "Data Scientist", company: "Gojek", location: "Jakarta", type: "Full-time", salary: "Rp 20-35 Jt", match: 88, skills: ["Python", "ML", "SQL"] },
                { title: "Product Manager", company: "Bukalapak", location: "Bandung", type: "Hybrid", salary: "Rp 18-30 Jt", match: 82, skills: ["Agile", "Analytics", "Strategy"] },
              ].map((job, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="group h-full flex flex-col border-border/50 hover:border-accent/30 hover:shadow-card-hover transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base font-heading mb-1">{job.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="w-3.5 h-3.5" />
                            {job.company}
                          </div>
                        </div>
                        <Badge variant="success" className="text-xs">{job.match}% Match</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{job.type}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{job.salary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs font-normal">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="heroOutline" size="sm" className="w-full" asChild>
                        <Link to="/jobs">Lihat Detail <ArrowRight className="w-3.5 h-3.5" /></Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="hero" size="lg" asChild>
                <Link to="/jobs">Lihat Semua Lowongan <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">Testimoni</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Dipercaya Ribuan Profesional
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="h-full flex flex-col border-border/50">
                    <CardContent className="pt-6 flex-1">
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: t.rating }).map((_, si) => (
                          <Star key={si} className="w-4 h-4 fill-warning text-warning" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{t.text}"
                      </p>
                    </CardContent>
                    <CardFooter className="border-t border-border/50 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {t.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role} di {t.company}</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">Harga</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Pilihan Paket untuk Semua
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Mulai gratis dan tingkatkan sesuai kebutuhan Anda
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className={`h-full flex flex-col relative ${
                    plan.popular
                      ? "border-accent shadow-card-hover"
                      : "border-border/50"
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge variant="accent" className="px-3">Populer</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-lg font-heading">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="font-heading text-4xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-sm text-muted-foreground">{plan.period}</span>
                        )}
                      </div>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button
                        variant={plan.popular ? "hero" : "heroOutline"}
                        className="w-full"
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 sm:py-28 bg-gradient-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Pertanyaan Umum
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card border border-border/50 rounded-xl px-5 data-[state=open]:shadow-card transition-shadow duration-200"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="relative bg-gradient-hero rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-glow/10 blur-[60px]" />
              </div>
              <div className="relative z-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                  Siap Memulai Perjalanan Karir Anda?
                </h2>
                <p className="text-base text-primary-foreground/70 max-w-xl mx-auto mb-8">
                  Bergabung dengan 200.000+ pencari kerja dan temukan peluang karir terbaik dengan teknologi AI
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="hero"
                    size="xl"
                    asChild
                  >
                    <Link to="/jobs">Mulai Sekarang <ArrowRight className="w-5 h-5" /></Link>
                  </Button>
                  <Button
                    size="xl"
                    className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors duration-200"
                    asChild
                  >
                    <Link to="/dashboard">Lihat Demo</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
