import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, Calendar, Clock, User, CalendarPlus, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import confetti from 'canvas-confetti';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { bookingData, resetBooking } = useBooking();

  useEffect(() => {
    if (!bookingData.date || !bookingData.time || !bookingData.name) {
      navigate('/agendar/data');
      return;
    }

    // Animação de confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [bookingData, navigate]);

  const handleAddToCalendar = () => {
    if (!bookingData.date) return;
    
    const eventTitle = 'Consulta Nutricional';
    const eventDetails = `Consulta com Dra. Ana Carolina - Objetivo: ${bookingData.goal}`;
    const startDate = new Date(bookingData.date);
    const [hours, minutes] = bookingData.time.split(':');
    startDate.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&dates=${formatDate(startDate)}/${formatDate(endDate)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleWhatsApp = () => {
    const message = `Olá! Acabei de agendar minha consulta para ${format(bookingData.date!, "dd/MM/yyyy", { locale: ptBR })} às ${bookingData.time}. Meu nome é ${bookingData.name}.`;
    const phoneNumber = '5511999999999'; // Número da nutricionista
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNewAppointment = () => {
    resetBooking();
    navigate('/');
  };

  if (!bookingData.date || !bookingData.time || !bookingData.name) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Icon */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Consulta agendada com sucesso!
              </h1>
              <p className="text-lg text-muted-foreground">
                Você receberá um e-mail de confirmação em breve
              </p>
            </div>
          </div>

          {/* Appointment Details Card */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 space-y-6">
              <div className="text-center pb-4 border-b">
                <h2 className="text-xl font-semibold">Detalhes da Consulta</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-semibold">
                      {format(bookingData.date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horário</p>
                    <p className="font-semibold">{bookingData.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profissional</p>
                    <p className="font-semibold">Dra. Ana Carolina</p>
                    <p className="text-sm text-muted-foreground">Nutricionista - CRN 12345</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t bg-secondary/30 -mx-6 px-6 py-4 rounded-b-lg">
                <p className="text-sm text-muted-foreground">Paciente</p>
                <p className="font-semibold">{bookingData.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{bookingData.email}</p>
                <p className="text-sm text-muted-foreground">{bookingData.whatsapp}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full gap-2"
              onClick={handleAddToCalendar}
            >
              <CalendarPlus className="w-5 h-5" />
              Adicionar ao Google Agenda
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </Button>
          </div>

          {/* Info Box */}
          <Card className="bg-secondary/30">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold">Próximos passos:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Você receberá um e-mail de confirmação com o link da videochamada</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Prepare suas dúvidas e objetivos para a consulta</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Caso precise remarcar, entre em contato pelo WhatsApp com 24h de antecedência</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center pt-4">
            <Button 
              variant="ghost" 
              onClick={handleNewAppointment}
            >
              Voltar para a página inicial
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
