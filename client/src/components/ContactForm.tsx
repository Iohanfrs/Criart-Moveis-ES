import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

// Extend schema for client-side form validation messages if needed,
// but shared schema is usually sufficient.
const formSchema = insertInquirySchema.extend({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(8, "Telefone é obrigatório"),
});

export function ContactForm() {
  const { toast } = useToast();
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      environment: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutate(data, {
      onSuccess: () => {
        // 1. Success Toast
        toast({
          title: "Mensagem enviada!",
          description: "Redirecionando para o WhatsApp...",
          className: "bg-green-600 text-white border-none",
        });

        // 2. Format WhatsApp Message
        const text = `*Novo Orçamento - Criart Móveis*\n\n👤 *Nome:* ${data.name}\n📱 *Telefone:* ${data.phone}\n🏠 *Ambiente:* ${data.environment || "Não informado"}\n💬 *Mensagem:* ${data.message || "Gostaria de um orçamento."}`;
        
        const whatsappUrl = `https://wa.me/5527996019018?text=${encodeURIComponent(text)}`;

        // 3. Reset form
        form.reset();

        // 4. Redirect
        setTimeout(() => {
          window.open(whatsappUrl, "_blank");
        }, 1500);
      },
      onError: (error) => {
        toast({
          title: "Erro ao enviar",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
      
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-secondary mb-2">Solicite seu Orçamento</h3>
        <p className="text-muted-foreground">Preencha os dados abaixo e fale diretamente com nossa equipe de projetos.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary font-semibold">Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João Silva" className="bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary font-semibold">Telefone / WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: (27) 99999-9999" className="bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary font-semibold">Ambiente de Interesse</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Cozinha, Quarto, Sala..." value={field.value || ""} onChange={field.onChange} className="bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary font-semibold">Detalhes do Projeto</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva brevemente o que você procura..." 
                    className="bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 min-h-[120px] resize-none transition-all" 
                    value={field.value || ""} 
                    onChange={field.onChange} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 text-lg font-bold bg-primary text-secondary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all rounded-xl"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                Enviar para WhatsApp <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
