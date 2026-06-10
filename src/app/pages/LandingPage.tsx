import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Heart, 
  Award, 
  CheckCircle2, 
  Star,
  ChevronDown,
  Lock
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function LandingPage() {
  const navigate = useNavigate();

  const specialties = [
    { icon: Heart, title: "Emagrecimento", description: "Planos personalizados para perda de peso saudável" },
    { icon: Award, title: "Hipertrofia", description: "Nutrição esportiva para ganho de massa muscular" },
    { icon: CheckCircle2, title: "Treino Personalizado", description: "Treinos alinhados ao seu objetivo com base em Educação Física" },
  ];

  const benefits = [
    "Atendimento personalizado e humanizado",
    "Planos alimentares individualizados",
    "Acompanhamento contínuo via WhatsApp",
    "Atendimento on-line e presencial em Ribeirão Claro - PR",
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Perdi 15kg em 6 meses com acompanhamento profissional. Melhor decisão que tomei!",
      rating: 5,
    },
    {
      name: "João Santos",
      text: "A nutricionista me ajudou a ganhar massa muscular de forma saudável. Recomendo!",
      rating: 5,
    },
    {
      name: "Ana Costa",
      text: "Aprendi a ter uma relação saudável com a comida. Mudou minha vida!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Como funciona a consulta online?",
      answer: "As consultas são realizadas por videochamada em horário agendado. Você receberá o link de acesso por WhatsApp antes da consulta.",
    },
    {
      question: "Quanto tempo dura cada consulta?",
      answer: "Cada consulta tem duração aproximada de 60 minutos, tempo suficiente para avaliar suas necessidades e criar um plano personalizado.",
    },
    {
      question: "Recebo o plano alimentar no mesmo dia?",
      answer: "Sim! Após a consulta, você recebe seu plano alimentar personalizado em até 24 horas.",
    },
    {
      question: "Como é feito o acompanhamento?",
      answer: "O acompanhamento é feito através de consultas de retorno e suporte via WhatsApp para tirar dúvidas e ajustes necessários.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/30 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyYzU1ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="mb-10 flex justify-center md:justify-start">
            <div className="rounded-2xl overflow-hidden border shadow-lg">
              <ImageWithFallback
                src="/images/nara/logo.png"
                alt="Logotipo Nara Rossetto Nutricionista"
                className="h-24 w-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Nutrição e Treino Personalizado
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Agende seu atendimento com Nara Rossetto
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Consulta nutricional e acompanhamento presencial ou on-line com atendimento humanizado e focado no seu objetivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="text-lg px-8"
                  onClick={() => navigate("/agendar")}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => navigate("/painel")}
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Painel do nutricionista
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>On-line e Presencial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Ribeirão Claro - PR</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/nara/hero.png"
                  alt="Nara Rossetto em atendimento"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[320px_1fr] gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border shadow-xl">
            <ImageWithFallback
              src="/images/nara/about.png"
              alt="Foto profissional de Nara Rossetto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-6">
            <Badge variant="outline" className="border-primary text-primary">
              Sobre a Nutricionista
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Nara Rossetto
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Formada em Educação Física (Bacharelado) e Nutrição, com pós-graduação em Nutrição Esportiva e Estética.
              Atende pacientes que buscam emagrecimento, hipertrofia, reeducação alimentar, performance e qualidade de vida
              por meio de um plano integrado de nutrição e treino.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
              <Badge variant="secondary">Nutricionista</Badge>
              <Badge variant="secondary">CREF 038535-G/PR</Badge>
              <Badge variant="secondary">On-line e Presencial</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary">
              Especialidades
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Como posso te ajudar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Atendimento personalizado para suas necessidades específicas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <specialty.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{specialty.title}</h3>
                  <p className="text-muted-foreground">{specialty.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary">
              Benefícios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Por que escolher o acompanhamento nutricional?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              O que dizem meus pacientes
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <p className="font-semibold">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary">
              Dúvidas Frequentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Perguntas frequentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronta para transformar sua saúde?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Agende sua consulta com a Nara Rossetto e inicie seu plano nutricional com orientação profissional.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8"
            onClick={() => navigate("/agendar")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Agendar Minha Consulta
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-secondary/30 border-t">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground space-y-3">
          <div className="flex justify-center">
            <ImageWithFallback
              src="/images/nara/portrait.png"
              alt="Nara Rossetto"
              className="h-20 w-20 rounded-full object-cover border-2 border-primary/30"
            />
          </div>
          <p>© 2026 Nara Rossetto - Nutricionista. Todos os direitos reservados.</p>
          <p>CREF 038535-G/PR | Rua Romoaldo Chiarotti, 403 - Ribeirão Claro - PR</p>
          <p>WhatsApp: (43) 98830-0445 | @nararossetto | naraorossetto@gmail.com</p>
          <Button variant="ghost" size="sm" onClick={() => navigate("/painel")}>
            Painel do nutricionista
          </Button>
        </div>
      </footer>
    </div>
  );
}
