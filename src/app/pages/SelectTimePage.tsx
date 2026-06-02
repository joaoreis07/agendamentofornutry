import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function SelectTimePage() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [selectedTime, setSelectedTime] = useState<string>(bookingData.time);

  // Horários disponíveis
  const availableTimes = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  // Horários já ocupados (exemplo)
  const bookedTimes = ['09:00', '14:00', '16:00'];

  const handleContinue = () => {
    if (selectedTime) {
      updateBookingData({ time: selectedTime });
      navigate('/agendar/dados');
    }
  };

  if (!bookingData.date) {
    navigate('/agendar/data');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/agendar/data')}
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
              ✓
            </div>
            <div className="w-16 h-1 bg-primary"></div>
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              2
            </div>
            <div className="w-16 h-1 bg-border"></div>
            <div className="w-10 h-10 rounded-full bg-border text-muted-foreground flex items-center justify-center font-semibold">
              3
            </div>
          </div>

          {/* Selected Date Display */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Data selecionada:</p>
              <p className="text-lg font-semibold">
                {format(bookingData.date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </CardContent>
          </Card>

          {/* Time Selection Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="w-6 h-6 text-primary" />
                Horários disponíveis
              </CardTitle>
              <p className="text-muted-foreground">
                Escolha o melhor horário para sua consulta
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableTimes.map((time) => {
                  const isBooked = bookedTimes.includes(time);
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      disabled={isBooked}
                      className={`
                        p-4 rounded-lg border-2 transition-all
                        ${isBooked 
                          ? 'bg-muted/50 border-border text-muted-foreground cursor-not-allowed opacity-50' 
                          : isSelected
                          ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-105'
                          : 'bg-white border-border hover:border-primary hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">{time}</span>
                        {isBooked && (
                          <span className="text-xs">Ocupado</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-secondary/50 rounded-lg space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-primary bg-primary"></div>
                  <span className="text-sm">Horário selecionado</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-border bg-white"></div>
                  <span className="text-sm">Horários disponíveis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-border bg-muted/50 opacity-50"></div>
                  <span className="text-sm">Horários ocupados</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!selectedTime}
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
