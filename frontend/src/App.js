import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import JobsPage from "@/pages/JobsPage";
import SkillAdvisorPage from "@/pages/SkillAdvisorPage";
import TrainingPage from "@/pages/TrainingPage";
import AISearchPage from "@/pages/AISearchPage";
import CareerPathPage from "@/pages/CareerPathPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/ai-search" element={<AISearchPage />} />
        <Route path="/career-path" element={<CareerPathPage />} />
        <Route path="/skill-advisor" element={<SkillAdvisorPage />} />
        <Route path="/training" element={<TrainingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
