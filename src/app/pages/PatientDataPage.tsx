import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, User } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function PatientDataPage() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  
  const [formData, setFormData] = useState({
    name: bookingData.name,
    whatsapp: bookingData.whatsapp,
    email: bookingData.email,
    goal: bookingData.goal,
  });

  const [errors, setErrors] = useState({
    name: '',
    whatsapp: '',
    email: '',
    goal: '',
  });

  const goals = [
    'Emagrecimento',
    'Hipertrofia',
    'Reeducação alimentar',
    'Nutrição esportiva',
    'Outro',
  ];

  const validateForm = () => {
    const newErrors = {
      name: '',
      whatsapp: '',
      email: '',
      goal: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\d{10,11}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
      newErrors.whatsapp = 'WhatsApp inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.goal) {
      newErrors.goal = 'Selecione um objetivo';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateBookingData(formData);
      navigate('/agendar/confirmacao');
    }
  };

  if (!bookingData.date || !bookingData.time) {
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
            onClick={() => navigate('/agendar/horario')}
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
              ✓
            </div>
            <div className="w-16 h-1 bg-primary"></div>
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              3
            </div>
          </div>

          {/* Selected Date & Time Display */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Data:</p>
                  <p className="font-semibold">
                    {format(bookingData.date, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horário:</p>
                  <p className="font-semibold">{bookingData.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <User className="w-6 h-6 text-primary" />
                Seus dados
              </CardTitle>
              <p className="text-muted-foreground">
                Preencha suas informações para confirmar o agendamento
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome completo */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite seu nome completo"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className={errors.whatsapp ? 'border-destructive' : ''}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-destructive">{errors.whatsapp}</p>
                  )}
                </div>

                {/* E-mail */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Objetivo principal */}
                <div className="space-y-2">
                  <Label htmlFor="goal">Objetivo principal *</Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) => setFormData({ ...formData, goal: value })}
                  >
                    <SelectTrigger className={errors.goal ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecione seu objetivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {goals.map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.goal && (
                    <p className="text-sm text-destructive">{errors.goal}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full">
                    Confirmar Agendamento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
