import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingInstagram() {
  return (
    <div className="fixed bottom-28 right-6 z-50 animate-bounce hover:animate-none">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:scale-110 active:scale-95 transition-all shadow-lg text-white"
        onClick={() => window.open("https://www.instagram.com/criartmoveis.es", "_blank")}
      >
        <Instagram className="h-7 w-7" />
      </Button>
    </div>
  );
}
