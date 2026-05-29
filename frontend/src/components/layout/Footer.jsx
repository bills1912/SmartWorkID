import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const footerLinks = {
    Platform: [
      { label: "Job Matching", href: "/jobs" },
      { label: "Skill Advisor", href: "/skill-advisor" },
      { label: "Pelatihan", href: "/training" },
      { label: "Dashboard", href: "/dashboard" },
    ],
    Perusahaan: [
      { label: "Tentang Kami", href: "#" },
      { label: "Karir", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Kontak", href: "#" },
    ],
    Dukungan: [
      { label: "Pusat Bantuan", href: "#" },
      { label: "Kebijakan Privasi", href: "#" },
      { label: "Syarat & Ketentuan", href: "#" },
      { label: "API Developer", href: "#" },
    ],
  };

  return (
    <footer className="bg-[hsl(215,25%,6%)] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-heading text-lg font-bold text-white">
                KerjaAI
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Platform digitalisasi penciptaan lapangan kerja berbasis kecerdasan
              artifisial. Menghubungkan talenta terbaik Indonesia dengan peluang
              karir yang tepat.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@kerjaai.id
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +62 21 1234 5678
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Jakarta, Indonesia
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm text-white mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 KerjaAI. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">
              Dibuat dengan teknologi AI Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
