import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { CheckCircle2, Calendar, Clock, User, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Appointment, getAppointments, parseDateKey } from "../lib/appointments";

export default function Confirmation() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const appointmentId = sessionStorage.getItem("confirmedAppointmentId");
    if (!appointmentId) {
      navigate("/agendar");
      return;
    }

    const savedAppointment = getAppointments().find((item) => item.id === appointmentId);
    if (!savedAppointment) {
      navigate("/agendar");
      return;
    }

    setAppointment(savedAppointment);
  }, [navigate]);

  const handleAddToCalendar = () => {
    if (!appointment) return;

    const date = parseDateKey(appointment.date);
    const [hours, minutes] = appointment.time.split(":");
    date.setHours(parseInt(hours), parseInt(minutes));

    const startTime = date.toISOString().replace(/-|:|\.\d+/g, "");
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 1);
    const endTime = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Consulta+Nutricional+-+Nara+Rossetto&dates=${startTime}/${endTime}&details=Consulta+nutricional+com+Nara+Rossetto&location=Ribeirao+Claro+-+PR+ou+Online`;
    window.open(calendarUrl, "_blank");
  };

  const handleWhatsApp = () => {
    if (!appointment) return;

    const formattedDate = parseDateKey(appointment.date).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const message = encodeURIComponent(
      `Ola! Acabei de agendar minha consulta para ${formattedDate} as ${appointment.time}. Aguardo mais informacoes!`,
    );
    window.open(`https://wa.me/5543988300445?text=${message}`, "_blank");
  };

  if (!appointment) return null;

  const formattedDate = parseDateKey(appointment.date).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-primary"
              >
                Consulta agendada com sucesso!
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mt-2"
              >
                Sua consulta foi registrada no painel da Nara Rossetto.
              </motion.p>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-primary/10 to-secondary/30 rounded-xl p-6 space-y-4 border border-primary/20"
              >
                <h2 className="font-semibold text-lg">Detalhes da consulta</h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Paciente</p>
                      <p className="font-semibold">{appointment.patient.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="font-semibold capitalize">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Horario</p>
                      <p className="font-semibold">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-3">
                <Button size="lg" className="w-full" onClick={handleAddToCalendar}>
                  <Calendar className="mr-2 h-5 w-5" />
                  Adicionar ao Google Agenda
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                <Button size="lg" variant="outline" className="w-full" onClick={handleWhatsApp}>
                  Falar no WhatsApp
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    sessionStorage.removeItem("selectedDate");
                    sessionStorage.removeItem("selectedTime");
                    sessionStorage.removeItem("patientData");
                    sessionStorage.removeItem("confirmedAppointmentId");
                    navigate("/");
                  }}
                >
                  Voltar para o inicio
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-secondary/50 rounded-lg p-4 space-y-2"
              >
                <h3 className="font-semibold text-sm">O que fazer agora?</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Voce recebera as orientacoes da consulta pelo WhatsApp.</li>
                  <li>No atendimento on-line, o link da videochamada sera enviado antes do horario agendado.</li>
                  <li>Prepare suas duvidas e informacoes sobre sua rotina alimentar.</li>
                </ul>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="text-center text-sm text-muted-foreground">
          <p>Precisa reagendar ou cancelar? Entre em contato pelo WhatsApp.</p>
        </motion.div>
      </div>
    </div>
  );
}
