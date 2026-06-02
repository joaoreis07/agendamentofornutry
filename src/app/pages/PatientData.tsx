import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ChevronLeft } from "lucide-react";
import { createAppointment, formatDateKey } from "../lib/appointments";

export default function PatientData() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "",
    notes: "",
  });

  useEffect(() => {
    const dateStr = sessionStorage.getItem("selectedDate");
    const timeStr = sessionStorage.getItem("selectedTime");
    
    if (!dateStr || !timeStr) {
      navigate("/agendar");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateStr = sessionStorage.getItem("selectedDate");
    const timeStr = sessionStorage.getItem("selectedTime");

    if (!dateStr || !timeStr) {
      navigate("/agendar");
      return;
    }

    try {
      const appointment = createAppointment(formatDateKey(new Date(dateStr)), timeStr, formData);
      sessionStorage.setItem("patientData", JSON.stringify(formData));
      sessionStorage.setItem("confirmedAppointmentId", appointment.id);
      navigate("/agendar/confirmacao");
    } catch {
      sessionStorage.removeItem("selectedTime");
      navigate("/agendar/horario");
    }
  };

  const isFormValid = formData.name && formData.phone && formData.email && formData.goal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/agendar/horario")}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-2">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl">Seus dados</CardTitle>
            <CardDescription className="text-base">
              Preencha as informações para confirmar seu agendamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Usaremos este número para enviar o link da consulta
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo principal *</Label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) => setFormData({ ...formData, goal: value })}
                >
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                    <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                    <SelectItem value="reeducacao">Reeducação alimentar</SelectItem>
                    <SelectItem value="nutricao-esportiva">Nutrição esportiva</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Informações adicionais (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Conte um pouco mais sobre você e seus objetivos..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="pt-4 space-y-4">
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm font-semibold mb-2">Resumo do agendamento</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>📅 Data: {sessionStorage.getItem("selectedDate") && new Date(sessionStorage.getItem("selectedDate")!).toLocaleDateString("pt-BR")}</p>
                    <p>🕐 Horário: {sessionStorage.getItem("selectedTime")}</p>
                    <p>⏱️ Duração: ~60 minutos</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={!isFormValid}
                >
                  Confirmar Agendamento
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao confirmar, você concorda em receber notificações sobre sua consulta
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
