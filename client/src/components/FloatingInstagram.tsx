import { Instagram } from "lucide-react";

export function FloatingInstagram() {
  return (
    <a
      href="https://www.instagram.com/criartmoveis.es"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 group"
      aria-label="Siga-nos no Instagram"
    >
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-secondary text-sm font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
        Siga-nos no Instagram
      </span>
      <div className="w-14 h-14 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-110 active:scale-95 transition-all duration-300">
        <Instagram size={32} strokeWidth={2.5} />
      </div>
      <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20 -z-10" />
    </a>
  );
}
