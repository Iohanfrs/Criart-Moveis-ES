import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FloatingInstagram } from "@/components/FloatingInstagram";
import { PencilRuler, Medal, MapPin, Clock, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface PortfolioItem {
  src: string;
  title: string;
  moreImages: string[];
}

interface PortfolioTab {
  id: string;
  images: PortfolioItem[];
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const portfolioData: PortfolioTab[] = [
    {
      id: "kitchens",
      images: [
        { 
          src: "/assets/gallery-kitchen.jpg", 
          title: "Cozinha Gourmet Luxo",
          moreImages: ["/assets/gallery-kitchen.jpg", "/assets/portfolio/kitchen_more_1.jpg", "/assets/portfolio/kitchen_more_2.jpg", "/assets/portfolio/kitchen_more_3.jpg"]
        },
        { 
          src: "/assets/portfolio/kitchen_1.jpg", 
          title: "Cozinha Integrada",
          moreImages: ["/assets/portfolio/kitchen_1.jpg", "/assets/portfolio/kitchen_more_2.jpg", "/assets/portfolio/kitchen_more_3.jpg"]
        },
        { 
          src: "/assets/portfolio/kitchen_minimalist.jpg", 
          title: "Cozinha Minimalista",
          moreImages: ["/assets/portfolio/kitchen_minimalist.jpg", "/assets/portfolio/kitchen_more_1.jpg", "/assets/portfolio/kitchen_more_2.jpg"]
        },
        { 
          src: "/assets/portfolio/kitchen_3.jpg", 
          title: "Área Gourmet",
          moreImages: ["/assets/portfolio/kitchen_3.jpg", "/assets/portfolio/kitchen_more_3.jpg", "/assets/portfolio/kitchen_more_1.jpg"]
        }
      ]
    },
    {
      id: "wardrobes",
      images: [
        { 
          src: "/assets/portfolio/single_bedroom.jpg", 
          title: "Quarto Solteiro",
          moreImages: ["/assets/portfolio/single_bedroom.jpg", "/assets/portfolio/wardrobe_more_1.jpg", "/assets/portfolio/wardrobe_more_2.jpg"]
        },
        { 
          src: "/assets/portfolio/closet_1.jpg", 
          title: "Closet Master",
          moreImages: ["/assets/portfolio/closet_1.jpg", "/assets/portfolio/wardrobe_more_3.jpg", "/assets/portfolio/wardrobe_more_1.jpg"]
        },
        { 
          src: "/assets/portfolio/quarto_planejado.png", 
          title: "Quarto Planejado",
          moreImages: ["/assets/portfolio/quarto_planejado.png", "/assets/portfolio/wardrobe_more_2.jpg", "/assets/portfolio/wardrobe_more_3.jpg"]
        },
        { 
          src: "/assets/portfolio/kids_room.avif", 
          title: "Quarto Infantil",
          moreImages: ["/assets/portfolio/kids_room.avif", "/assets/portfolio/wardrobe_more_1.jpg", "/assets/portfolio/wardrobe_more_2.jpg"]
        }
      ]
    },
    {
      id: "theaters",
      images: [
        { 
          src: "/assets/gallery-tv-unit.jpg", 
          title: "Painel Home Theater",
          moreImages: ["/assets/gallery-tv-unit.jpg", "/assets/portfolio/living_more_1.jpg", "/assets/portfolio/living_more_2.jpg"]
        },
        { 
          src: "/assets/portfolio/living_room.jpg", 
          title: "Sala de Estar",
          moreImages: ["/assets/portfolio/living_room.jpg", "/assets/portfolio/living_more_3.jpg", "/assets/portfolio/living_more_1.jpg"]
        },
        { 
          src: "/assets/portfolio/tv_unit_new.jpg", 
          title: "Móvel para TV",
          moreImages: ["/assets/portfolio/tv_unit_new.jpg", "/assets/portfolio/living_more_2.jpg", "/assets/portfolio/living_more_3.jpg"]
        },
        { 
          src: "/assets/portfolio/corporate_new.jpg", 
          title: "Ambiente Corporativo",
          moreImages: ["/assets/portfolio/corporate_new.jpg", "/assets/portfolio/corporate_more_1.jpg", "/assets/portfolio/corporate_more_2.jpg", "/assets/portfolio/corporate_more_3.jpg"]
        }
      ]
    }
  ];

  const handleOpenLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      setActiveImageIndex((prev) => (prev + 1) % selectedItem.moreImages.length);
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setActiveImageIndex((prev) => (prev - 1 + selectedItem.moreImages.length) % selectedItem.moreImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body selection:bg-primary/30">
      <Navigation />
      <FloatingWhatsApp />
      <FloatingInstagram />
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Using Unsplash for hero since exact asset might not load */}
          {/* modern luxury dark kitchen interior design */}
          <img 
            src="/assets/header-kitchen.jpg" 
            alt="Interior de Cozinha Planejada" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30" />
        </div>

        <div className="container relative z-10 px-6 mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-block px-4 py-1 mb-6 border border-primary/50 rounded-full bg-black/20 backdrop-blur-sm">
              <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm">Especialistas em Marcenaria</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Móveis Planejados <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Sob Medida</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              Transformamos seu ambiente com sofisticação, funcionalidade e acabamento impecável. Projetos exclusivos para quem não abre mão da qualidade.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contato" 
                className="px-8 py-4 bg-primary text-secondary font-bold text-lg rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#portfolio" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Ver Projetos
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ABOUT SECTION */}
      <section id="sobre" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                 {/* carpenter working on wood detail */}
                 <img 
                   src="/assets/about-carpenter.jpg" 
                   alt="Marceneiro trabalhando" 
                   className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-gray-100 rounded-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Quem Somos</h4>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6 leading-tight">
                Soluções Sob Medida para <br />Seu Espaço
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Na <strong>Criart Móveis</strong>, acreditamos que cada ambiente conta uma história. Nossa missão é materializar sonhos através da marcenaria de alto padrão.
                </p>
                <p>
                  Com anos de experiência no mercado capixaba, combinamos técnicas artesanais com tecnologia de ponta para entregar móveis que unem beleza, durabilidade e funcionalidade.
                </p>
                <div className="pt-6 grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-4xl font-display font-bold text-primary mb-1">30+</h3>
                    <p className="font-medium text-secondary">Anos de Experiência</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-display font-bold text-primary mb-1">500+</h3>
                    <p className="font-medium text-secondary">Projetos Entregues</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* BENEFITS SECTION */}
      <section id="beneficios" className="py-24 bg-secondary text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Por que escolher a Criart?</h2>
            <p className="text-gray-400 text-lg">Diferenciais que garantem a excelência do seu projeto do início ao fim.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <PencilRuler className="w-10 h-10" />,
                title: "Projeto Personalizado",
                desc: "Cada detalhe desenhado exclusivamente para o seu espaço e necessidades."
              },
              {
                icon: <Medal className="w-10 h-10" />,
                title: "Alto Padrão",
                desc: "Materiais de primeira linha e acabamento refinado em cada peça."
              },
              {
                icon: <MapPin className="w-10 h-10" />,
                title: "Atendimento no ES",
                desc: "Atuamos em toda a Grande Vitória e região serrana do Espírito Santo."
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Pontualidade",
                desc: "Compromisso rigoroso com os prazos de entrega acordados."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group cursor-default"
              >
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Nossos Trabalhos</h4>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary">Nosso Portfólio</h2>
            </div>
            <p className="text-muted-foreground max-w-md text-right md:text-left">
              Confira alguns dos ambientes transformados pela nossa equipe. Qualidade que se vê nos detalhes.
            </p>
          </div>

          <Tabs defaultValue="kitchens" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-white border border-gray-200 p-1 h-auto rounded-full shadow-sm">
                <TabsTrigger value="kitchens" className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-secondary font-bold">Cozinhas</TabsTrigger>
                <TabsTrigger value="wardrobes" className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-secondary font-bold">Dormitórios</TabsTrigger>
                <TabsTrigger value="theaters" className="rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-secondary font-bold">Salas</TabsTrigger>
              </TabsList>
            </div>

            {portfolioData.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {tab.images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -10 }}
                      onClick={() => handleOpenLightbox(img)}
                      className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                      <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute bottom-0 left-0 p-6 z-20 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">{img.title}</h3>
                        <div className="h-1 w-0 bg-primary group-hover:w-12 transition-all duration-500" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-5xl bg-secondary/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden rounded-3xl">
            <DialogTitle className="sr-only">{selectedItem?.title}</DialogTitle>
            <div className="relative aspect-video flex items-center justify-center bg-black/40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={selectedItem?.moreImages[activeImageIndex]}
                  alt={selectedItem?.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>

              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 p-3 rounded-full bg-black/20 hover:bg-primary text-white transition-all backdrop-blur-sm z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 p-3 rounded-full bg-black/20 hover:bg-primary text-white transition-all backdrop-blur-sm z-20"
              >
                <ChevronRight size={24} />
              </button>

              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-red-500 text-white transition-all backdrop-blur-sm z-20"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                {selectedItem?.moreImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                    className={`h-1.5 transition-all rounded-full ${idx === activeImageIndex ? 'w-8 bg-primary' : 'w-2 bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedItem?.title}</h3>
              <p className="text-white/60">Exemplos de projetos realizados com excelência e acabamento impecável.</p>
            </div>
          </DialogContent>
        </Dialog>
      </section>
      {/* CONTACT SECTION */}
      <section id="contato" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Fale Conosco</h4>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
                Vamos tirar seu projeto do papel?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Entre em contato para agendar uma visita técnica ou solicitar um orçamento sem compromisso. Nossa equipe está pronta para atender você.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary">Localização</h5>
                    <p className="text-muted-foreground">Grande Vitória, Espírito Santo</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-secondary">Horário de Atendimento</h5>
                    <p className="text-muted-foreground">Seg a Sex: 8h às 18h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-secondary py-12 text-white border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <img src="/assets/logo_footer.jpg" alt="Criart Logo" className="h-12 w-auto rounded-md object-contain" />
            </div>
            
            <p className="text-gray-400 text-sm text-center md:text-right">
              &copy; {new Date().getFullYear()} Criart Móveis Planejados. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
