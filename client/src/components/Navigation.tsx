import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import CRIART_MOVEIS from "@assets/CRIART MOVEIS.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
           <img src={CRIART_MOVEIS} alt="Criart Logo" className="h-10 w-auto rounded-md object-contain" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Sobre", "Portfólio", "Benefícios"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace("ó", "o").replace("í", "i"))}
              className="text-white/90 hover:text-primary font-medium text-sm uppercase tracking-wider transition-colors"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contato")}
            className="px-6 py-2 bg-primary text-secondary font-bold rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Orçamento
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-secondary/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in slide-in-from-top-5">
          {["Sobre", "Portfólio", "Benefícios", "Contato"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace("ó", "o").replace("í", "i"))}
              className="text-left text-white/90 hover:text-primary font-bold text-lg py-2 border-b border-white/5 last:border-0"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
