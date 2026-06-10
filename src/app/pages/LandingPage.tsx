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
  Lock,
  Phone,
  Instagram,
  Mail,
  MapPin,
  Dumbbell,
  MonitorSmartphone,
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
  const assetBase = import.meta.env.BASE_URL;
  const whatsappLink = "https://wa.me/5543988300445";
  const instagramLink = "https://instagram.com/nararossetto";

  const specialties = [
    {
      icon: Heart,
      title: "Emagrecimento",
      description: "Planejamento nutricional personalizado para reduzir gordura com saúde e constância.",
    },
    {
      icon: Award,
      title: "Hipertrofia",
      description: "Estratégias nutricionais para ganho de massa muscular e melhora de performance.",
    },
    {
      icon: CheckCircle2,
      title: "Reeducação Alimentar",
      description: "Mudança de hábitos para manter resultados de forma leve e sustentável.",
    },
    {
      icon: Dumbbell,
      title: "Treino Personalizado",
      description: "Orientação de treino com base na formação em Educação Física e no seu objetivo.",
    },
  ];

  const credentials = [
    "Nutrição",
    "Educação Física (Bacharelado)",
    "Pós-graduação em Nutrição Esportiva e Estética",
    "CREF 038535-G/PR",
  ];

  const steps = [
    {
      title: "1. Agendamento rápido",
      description: "Você escolhe a data e horário no site em poucos minutos.",
    },
    {
      title: "2. Consulta individual",
      description: "Atendimento completo on-line ou presencial com foco na sua rotina.",
    },
    {
      title: "3. Acompanhamento contínuo",
      description: "Ajustes, suporte e evolução com acompanhamento próximo pelo WhatsApp.",
    },
  ];

  const faqs = [
    {
      question: "Como funciona a consulta online?",
      answer: "As consultas são realizadas por videochamada no horário agendado. Você recebe o link e orientações pelo WhatsApp.",
    },
    {
      question: "Qual a duração da consulta?",
      answer: "A consulta tem duração média de 60 minutos, com avaliação completa e definição da estratégia nutricional.",
    },
    {
      question: "Existe atendimento presencial?",
      answer: "Sim. O atendimento presencial acontece em Ribeirão Claro - PR, além da opção de atendimento on-line.",
    },
    {
      question: "A Nara também orienta treino?",
      answer: "Sim. Além da nutrição, ela oferece treino personalizado por também ser formada em Educação Física.",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl overflow-hidden border shadow-sm bg-primary">
              <ImageWithFallback
                src={`${assetBase}images/nara/logo.png`}
                alt="Logotipo Nara Rossetto Nutricionista"
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:block text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Nara Rossetto</p>
              <p>Nutricionista e Treino Personalizado</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(whatsappLink, "_blank")}>
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(instagramLink, "_blank")}>
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
            <Button size="sm" onClick={() => navigate("/agendar")}>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/30 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <Badge className="bg-primary/10 text-primary border-primary/20">Nutrição e Treino Personalizado</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Agende seu atendimento com Nara Rossetto
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Consulta nutricional on-line e presencial com estratégia prática para transformar hábitos e resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="text-lg px-8" onClick={() => navigate("/agendar")}>
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Consulta
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => window.open(whatsappLink, "_blank")}>
                <Phone className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <MonitorSmartphone className="h-5 w-5 text-primary" />
                <span>On-line e Presencial</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Ribeirão Claro - PR</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Consultas de 60 minutos</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <ImageWithFallback
                src={`${assetBase}images/nara/hero.png`}
                alt="Nara Rossetto em atendimento"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-4">
          {[
            { title: "Atendimento", value: "On-line e Presencial" },
            { title: "Local presencial", value: "Ribeirão Claro - PR" },
            { title: "Tempo de consulta", value: "60 minutos" },
            { title: "Registro profissional", value: "CREF 038535-G/PR" },
          ].map((item) => (
            <Card key={item.title} className="border-2">
              <CardContent className="pt-6 space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="font-semibold">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="sobre" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border shadow-xl">
            <ImageWithFallback
              src={`${assetBase}images/nara/about.png`}
              alt="Foto profissional de Nara Rossetto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary text-primary">
              Sobre a profissional
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Nara Rossetto</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Formada em Nutrição e Educação Física (Bacharelado), com pós-graduação em Nutrição Esportiva e Estética.
              O atendimento integra alimentação, rotina e treino para gerar resultados sustentáveis no dia a dia.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {credentials.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg border bg-background px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary">
              Serviços
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Como a Nara pode te ajudar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Planos personalizados com foco em resultado real e rotina possível.</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <Card key={specialty.title} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
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

      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-10">
            <Badge variant="outline" className="border-primary text-primary">
              Etapas do atendimento
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Uma jornada simples e organizada</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card key={step.title} className="border-2">
                <CardContent className="pt-6 space-y-3">
                  <p className="font-semibold text-lg">{step.title}</p>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-2xl font-semibold">Atendimento presencial</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p>Rua Romoaldo Chiarotti, 403<br />Ribeirão Claro - PR</p>
              </div>
              <p className="text-muted-foreground">Ideal para quem prefere acompanhamento presencial com avaliação detalhada.</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-2xl font-semibold">Atendimento on-line</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MonitorSmartphone className="h-5 w-5 text-primary mt-1" />
                <p>Consulta por videochamada com a mesma qualidade técnica e acompanhamento próximo.</p>
              </div>
              <p className="text-muted-foreground">Perfeito para quem precisa de flexibilidade e praticidade na rotina.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary">
              Dúvidas frequentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Perguntas comuns antes de agendar</h2>
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

      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Pronta para começar sua transformação?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Agende seu horário e receba acompanhamento nutricional estratégico para seus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => navigate("/agendar")}>
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Minha Consulta
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white/50 text-white hover:bg-white hover:text-primary"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Falar com a Nara
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-10 px-4 bg-secondary/30 border-t">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={`${assetBase}images/nara/portrait.png`}
              alt="Nara Rossetto"
              className="h-20 w-20 rounded-full object-cover border-2 border-primary/30"
            />
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">Nara Rossetto - Nutricionista</p>
              <p>CREF 038535-G/PR</p>
              <p>Rua Romoaldo Chiarotti, 403 - Ribeirão Claro - PR</p>
              <p>(43) 98830-0445 | naraorossetto@gmail.com | @nararossetto</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(whatsappLink, "_blank")}>
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(instagramLink, "_blank")}>
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open("mailto:naraorossetto@gmail.com", "_blank")}>
              <Mail className="mr-2 h-4 w-4" />
              E-mail
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/painel")}>
              <Lock className="mr-2 h-4 w-4" />
              Painel
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
