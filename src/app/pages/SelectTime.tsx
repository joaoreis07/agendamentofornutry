import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ChevronLeft, Clock } from "lucide-react";
import { formatDateKey, getSlotsForDate } from "../lib/appointments";

export default function SelectTime() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const dateStr = sessionStorage.getItem("selectedDate");
    if (!dateStr) {
      navigate("/agendar");
      return;
    }
    setSelectedDate(new Date(dateStr));
  }, [navigate]);

  const handleContinue = () => {
    if (selectedTime) {
      sessionStorage.setItem("selectedTime", selectedTime);
      navigate("/agendar/dados");
    }
  };

  if (!selectedDate) return null;

  const selectedDateKey = formatDateKey(selectedDate);
  const slots = getSlotsForDate(selectedDateKey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/agendar")} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-2">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl">Horarios disponiveis</CardTitle>
            <CardDescription className="text-base">
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground mb-4">Manha</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {slots
                  .filter((slot) => parseInt(slot.time) < 12)
                  .map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className="h-14 text-lg"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot.time}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground mb-4">Tarde</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {slots
                  .filter((slot) => parseInt(slot.time) >= 12)
                  .map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className="h-14 text-lg"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot.time}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground justify-center pt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary"></div>
                <span>Disponivel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-muted"></div>
                <span>Ocupado ou bloqueado</span>
              </div>
            </div>

            {slots.every((slot) => !slot.available) && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center text-sm text-destructive">
                Todos os horarios deste dia estao ocupados. Volte e escolha outra data.
              </div>
            )}

            {selectedTime && (
              <div className="w-full p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground">Horario selecionado</p>
                <p className="text-lg font-semibold">{selectedTime}</p>
              </div>
            )}

            <Button size="lg" className="w-full" disabled={!selectedTime} onClick={handleContinue}>
              Continuar
            </Button>
          </CardContent>
        </Card>

        <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground text-center">
          <p>Cada consulta tem duracao de aproximadamente 60 minutos</p>
        </div>
      </div>
    </div>
  );
}
