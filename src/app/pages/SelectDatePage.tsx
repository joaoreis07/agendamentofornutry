import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { ptBR } from 'date-fns/locale';

export function SelectDatePage() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [date, setDate] = useState<Date | undefined>(bookingData.date);

  // Dias indisponíveis (exemplo: fins de semana)
  const disabledDays = [
    { dayOfWeek: [0, 6] }, // Domingo e Sábado
    { before: new Date() } // Datas passadas
  ];

  const handleContinue = () => {
    if (date) {
      updateBookingData({ date });
      navigate('/agendar/horario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              1
            </div>
            <div className="w-16 h-1 bg-border"></div>
            <div className="w-10 h-10 rounded-full bg-border text-muted-foreground flex items-center justify-center font-semibold">
              2
            </div>
            <div className="w-16 h-1 bg-border"></div>
            <div className="w-10 h-10 rounded-full bg-border text-muted-foreground flex items-center justify-center font-semibold">
              3
            </div>
          </div>

          {/* Calendar Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CalendarIcon className="w-6 h-6 text-primary" />
                Escolha uma data
              </CardTitle>
              <p className="text-muted-foreground">
                Selecione o dia que melhor se adequa à sua agenda
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={disabledDays}
                  locale={ptBR}
                  className="rounded-md border"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                    day_range_end: "day-range-end",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded bg-primary mt-1"></div>
                  <div>
                    <p className="font-medium">Dias disponíveis</p>
                    <p className="text-sm text-muted-foreground">
                      Selecione um dia disponível para agendar sua consulta
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!date}
              className="px-8"
            >
              Continuar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
