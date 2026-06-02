import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ChevronLeft } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { formatDateKey, getSlotsForDate } from "../lib/appointments";

export default function SelectDate() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Mock: dias disponíveis (segunda a sexta)
  const isDateAvailable = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disponível se for dia útil e não for passado
    const hasAvailableSlot = getSlotsForDate(formatDateKey(date)).some((slot) => slot.available);
    return day >= 1 && day <= 5 && date >= today && hasAvailableSlot;
  };

  const handleContinue = () => {
    if (selectedDate) {
      // Salva a data selecionada no sessionStorage
      sessionStorage.setItem("selectedDate", selectedDate.toISOString());
      navigate("/agendar/horario");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-2">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl">Escolha uma data</CardTitle>
            <CardDescription className="text-base">
              Selecione o dia que melhor se encaixa na sua agenda
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => !isDateAvailable(date)}
              locale={ptBR}
              className="rounded-lg border-2 p-4"
              classNames={{
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_disabled: "text-muted-foreground opacity-50",
              }}
            />

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary"></div>
                <span>Dia selecionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted"></div>
                <span>Indisponível</span>
              </div>
            </div>

            {selectedDate && (
              <div className="w-full p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground">Data selecionada</p>
                <p className="text-lg font-semibold">
                  {selectedDate.toLocaleDateString("pt-BR", { 
                    weekday: "long", 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </p>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full"
              disabled={!selectedDate}
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </CardContent>
        </Card>

        <div className="bg-secondary/50 rounded-lg p-6 text-center space-y-2">
          <p className="text-sm font-semibold">Horário de atendimento</p>
          <p className="text-sm text-muted-foreground">
            Segunda a Sexta: 08:00 às 18:00
          </p>
        </div>
      </div>
    </div>
  );
}
