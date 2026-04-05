import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, GraduationCap, Clock, Star, Users, BookOpen,
  Play, CheckCircle2, ArrowRight, Filter, TrendingUp,
  Award, BarChart3, Target, Heart, Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const courses = [
  {
    id: 1, title: "Fullstack JavaScript Developer Path",
    provider: "Dicoding Indonesia", category: "web", level: "Intermediate",
    duration: "120 jam", students: 15420, rating: 4.9, price: "Rp 299.000",
    progress: 45, enrolled: true, modules: 12, completed: 5,
    description: "Kuasai JavaScript dari dasar hingga fullstack development dengan React dan Node.js.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
  },
  {
    id: 2, title: "Data Science & Machine Learning",
    provider: "Coursera", category: "data", level: "Advanced",
    duration: "80 jam", students: 23100, rating: 4.8, price: "Rp 499.000",
    progress: 0, enrolled: false, modules: 10, completed: 0,
    description: "Pelajari data science dan machine learning dari nol hingga mahir.",
    skills: ["Python", "TensorFlow", "Statistics", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    id: 3, title: "Product Management Fundamentals",
    provider: "LinkedIn Learning", category: "business", level: "Beginner",
    duration: "40 jam", students: 8930, rating: 4.7, price: "Rp 199.000",
    progress: 0, enrolled: false, modules: 8, completed: 0,
    description: "Fondasi product management untuk memulai karir sebagai PM.",
    skills: ["Agile", "Analytics", "Strategy", "UX"],
    image: "https://images.pexels.com/photos/7654403/pexels-photo-7654403.jpeg?w=400&h=250&fit=crop",
  },
  {
    id: 4, title: "UI/UX Design Masterclass",
    provider: "Udemy", category: "design", level: "Intermediate",
    duration: "60 jam", students: 12500, rating: 4.8, price: "Rp 349.000",
    progress: 78, enrolled: true, modules: 15, completed: 12,
    description: "Kuasai desain UI/UX dari teori hingga praktik dengan Figma.",
    skills: ["Figma", "Design System", "Prototyping", "User Research"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  },
  {
    id: 5, title: "Cloud Computing with AWS",
    provider: "AWS Academy", category: "cloud", level: "Intermediate",
    duration: "50 jam", students: 6780, rating: 4.6, price: "Rp 399.000",
    progress: 0, enrolled: false, modules: 9, completed: 0,
    description: "Belajar cloud computing dan persiapan sertifikasi AWS.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
  },
  {
    id: 6, title: "Digital Marketing Strategy",
    provider: "Google", category: "business", level: "Beginner",
    duration: "35 jam", students: 18200, rating: 4.7, price: "Gratis",
    progress: 20, enrolled: true, modules: 7, completed: 1,
    description: "Strategi digital marketing dari Google untuk pemula.",
    skills: ["SEO", "Google Ads", "Analytics", "Content"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
];

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("explore");
  const [enrolledCourses, setEnrolledCourses] = useState(
    courses.filter((c) => c.enrolled).map((c) => c.id)
  );

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      toast.success("Berhasil mendaftar kursus!");
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const myCourses = courses.filter((c) => enrolledCourses.includes(c.id));
  const totalProgress = myCourses.length
    ? Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / myCourses.length)
    : 0;

  return (
    <AppLayout title="Personalized Training" subtitle="Program pelatihan yang disesuaikan untuk mengembangkan karir Anda">
      {/* Quick Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Kursus Diikuti", value: myCourses.length, icon: BookOpen, color: "text-primary", bg: "bg-primary/8" },
          { label: "Total Progress", value: `${totalProgress}%`, icon: TrendingUp, color: "text-accent", bg: "bg-accent/8" },
          { label: "Modul Selesai", value: myCourses.reduce((sum, c) => sum + c.completed, 0), icon: CheckCircle2, color: "text-success", bg: "bg-success/8" },
          { label: "Jam Belajar", value: "48", icon: Clock, color: "text-chart-4", bg: "bg-warning/8" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-heading text-xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="explore">Jelajahi Kursus</TabsTrigger>
            <TabsTrigger value="my-courses">Kursus Saya ({myCourses.length})</TabsTrigger>
            <TabsTrigger value="recommended">Rekomendasi AI</TabsTrigger>
          </TabsList>

          {activeTab === "explore" && (
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari kursus atau skill..."
                  className="pl-9 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px] h-10">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="web">Web Dev</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="cloud">Cloud</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Explore Tab */}
        <TabsContent value="explore">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group h-full flex flex-col border-border/50 hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="text-xs">{course.level}</Badge>
                  </div>
                  {enrolledCourses.includes(course.id) && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="success" className="text-xs">Terdaftar</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-heading leading-snug">{course.title}</CardTitle>
                  <CardDescription className="text-xs">{course.provider}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs font-normal">{skill}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning" />{course.rating}</span>
                  </div>
                  {enrolledCourses.includes(course.id) && course.progress > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-2 mt-auto">
                  <span className="text-sm font-bold text-foreground">{course.price}</span>
                  {enrolledCourses.includes(course.id) ? (
                    <Button variant="hero" size="sm" className="gap-1">
                      <Play className="w-3.5 h-3.5" /> Lanjutkan
                    </Button>
                  ) : (
                    <Button
                      variant="heroOutline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Daftar <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Tidak ada hasil</h3>
              <p className="text-sm text-muted-foreground">Coba ubah filter pencarian Anda</p>
            </div>
          )}
        </TabsContent>

        {/* My Courses Tab */}
        <TabsContent value="my-courses">
          {myCourses.length > 0 ? (
            <div className="space-y-4">
              {myCourses.map((course) => (
                <Card key={course.id} className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full sm:w-40 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-heading text-base font-semibold text-foreground">{course.title}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{course.provider}</p>
                          </div>
                          <Badge variant={course.progress >= 70 ? "success" : "accent"} className="text-xs flex-shrink-0">
                            {course.progress}%
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-muted-foreground">{course.completed}/{course.modules} modul selesai</span>
                            <span className="font-medium text-foreground">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="hero" size="sm" className="gap-1">
                            <Play className="w-3.5 h-3.5" /> Lanjutkan Belajar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Belum ada kursus</h3>
              <p className="text-sm text-muted-foreground mb-4">Jelajahi kursus dan mulai belajar sekarang</p>
              <Button variant="hero" onClick={() => setActiveTab("explore")}>Jelajahi Kursus</Button>
            </div>
          )}
        </TabsContent>

        {/* Recommended Tab */}
        <TabsContent value="recommended">
          <Card className="border-border/50 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                    Rekomendasi AI untuk Anda
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Berdasarkan analisis skill gap dan target karir Anda sebagai Frontend Developer,
                    berikut kursus yang paling relevan untuk meningkatkan keterampilan Anda.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <Card key={course.id} className="group h-full flex flex-col border-accent/20 hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="accent" className="text-xs gap-1">
                      <Sparkles className="w-3 h-3" /> AI Pick
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-heading leading-snug">{course.title}</CardTitle>
                  <CardDescription className="text-xs">{course.provider}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs font-normal">{skill}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning" />{course.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-2 mt-auto">
                  <span className="text-sm font-bold text-foreground">{course.price}</span>
                  <Button
                    variant="hero"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleEnroll(course.id)}
                  >
                    {enrolledCourses.includes(course.id) ? (
                      <><CheckCircle2 className="w-3.5 h-3.5" /> Terdaftar</>
                    ) : (
                      <>Daftar <ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
