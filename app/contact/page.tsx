"use client";

import type React from "react";
import { DynamicIsland } from "@/components/dynamic-island";
import { ScrollReveal } from "@/components/scroll-reveal";
import { InteractiveMap } from "@/components/interactive-map";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to send message");
      }

      setFormData({ name: "", email: "", message: "" });
      toast({
        title: language === "pt" ? "Mensagem enviada" : "Message sent",
        description:
          language === "pt"
            ? "Sua mensagem foi enviada com sucesso. Obrigado!"
            : "Your message was sent successfully. Thank you!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title:
          language === "pt"
            ? "Erro ao enviar mensagem"
            : "Error sending message",
        description:
          language === "pt"
            ? "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde."
            : "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <DynamicIsland />

      <section className="pt-24 px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t.contact.title}
              </h1>
              <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-purple-600 rounded-full" />
            </div>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
              {language === "pt"
                ? "Entre em contato para discutir projetos, oportunidades ou apenas para trocar uma ideia."
                : "Get in touch to discuss projects, opportunities, or just to exchange ideas."}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <a
                href="tel:+5586998279477"
                className="group relative overflow-hidden flex items-center gap-4 p-5 bg-linear-to-br from-white/5 to-white/2 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-14 h-14 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div className="relative">
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === "pt" ? "Telefone" : "Phone"}
                  </p>
                  <p className="text-white font-semibold">
                    +55 (86) 99827-9477
                  </p>
                </div>
              </a>

              <a
                href="mailto:contato.gildaciolopes@gmail.com"
                className="group relative overflow-hidden flex items-center gap-4 p-5 bg-linear-to-br from-white/5 to-white/2 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-14 h-14 rounded-xl bg-linear-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="relative">
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-white font-semibold text-sm md:text-base truncate">
                    contato.gildaciolopes@gmail.com
                  </p>
                </div>
              </a>

              <div className="group relative overflow-hidden flex items-center gap-4 p-5 bg-linear-to-br from-white/5 to-white/2 rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === "pt" ? "Localização" : "Location"}
                  </p>
                  <p className="text-white font-semibold">
                    Teresina, PI - Brasil
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">
                  {language === "pt" ? "Minha localização" : "My location"}
                </h2>
              </div>
              <InteractiveMap />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="https://github.com/gildaciolopes"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/gildaciolopes"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">LinkedIn</span>
              </a>
              <a
                href="https://wa.me/5586998279477"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-1  rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-[#0f0f17] rounded-2xl p-8 md:p-10 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {language === "pt"
                      ? "Envie uma mensagem"
                      : "Send a message"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        {t.contact.name}
                      </label>
                      <Input
                        type="text"
                        placeholder={
                          language === "pt"
                            ? "Seu nome completo"
                            : "Your full name"
                        }
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-[#1a1a24] border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        {t.contact.email}
                      </label>
                      <Input
                        type="email"
                        placeholder={
                          language === "pt" ? "seu@email.com" : "your@email.com"
                        }
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-[#1a1a24] border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      {t.contact.message}
                    </label>
                    <Textarea
                      placeholder={
                        language === "pt"
                          ? "Escreva sua mensagem aqui..."
                          : "Write your message here..."
                      }
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-[#1a1a24] border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl min-h-40 resize-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-full px-8 py-6 border-0 disabled:opacity-50 group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {isSubmitting
                          ? language === "pt"
                            ? "Enviando..."
                            : "Sending..."
                          : t.contact.send}
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
