import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { 
  Calendar, 
  Users, 
  Clock, 
  Plus,
  Ban,
  MoreVertical,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Appointment {
  id: string;
  patientName: string;
  date: Date;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  goal: string;
}

export function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState<'today' | 'week' | 'month'>('week');

  // Mock data
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Maria Silva',
      date: new Date(2026, 5, 1, 9, 0),
      time: '09:00',
      status: 'confirmed',
      goal: 'Emagrecimento'
    },
    {
      id: '2',
      patientName: 'João Pedro',
      date: new Date(2026, 5, 1, 11, 0),
      time: '11:00',
      status: 'confirmed',
      goal: 'Hipertrofia'
    },
    {
      id: '3',
      patientName: 'Carla Santos',
      date: new Date(2026, 5, 2, 10, 0),
      time: '10:00',
      status: 'pending',
      goal: 'Reeducação alimentar'
    },
    {
      id: '4',
      patientName: 'Pedro Costa',
      date: new Date(2026, 5, 3, 14, 0),
      time: '14:00',
      status: 'confirmed',
      goal: 'Nutrição esportiva'
    },
    {
      id: '5',
      patientName: 'Ana Lima',
      date: new Date(2026, 5, 3, 16, 0),
      time: '16:00',
      status: 'completed',
      goal: 'Emagrecimento'
    },
  ];

  const stats = [
    {
      title: 'Consultas Hoje',
      value: '2',
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Esta Semana',
      value: '8',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pacientes Ativos',
      value: '47',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Taxa de Conclusão',
      value: '94%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
  ];

  const getStatusBadge = (status: Appointment['status']) => {
    const variants: Record<Appointment['status'], { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
      confirmed: { label: 'Confirmada', variant: 'default' },
      pending: { label: 'Pendente', variant: 'secondary' },
      completed: { label: 'Concluída', variant: 'outline' },
      cancelled: { label: 'Cancelada', variant: 'destructive' },
    };

    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Painel da Nutricionista</h1>
              <p className="text-sm text-muted-foreground">Gerencie suas consultas e pacientes</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Ban className="w-4 h-4" />
                    Bloquear Horário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bloquear Horário</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Horário Inicial</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>Horário Final</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>Motivo (opcional)</Label>
                      <Input placeholder="Ex: Compromisso pessoal" />
                    </div>
                    <Button className="w-full">Bloquear Horário</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar Horário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Horário Disponível</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Dia da Semana</Label>
                      <Input placeholder="Ex: Segunda-feira" />
                    </div>
                    <div className="space-y-2">
                      <Label>Horário</Label>
                      <Input type="time" />
                    </div>
                    <Button className="w-full">Adicionar Horário</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Consultas Agendadas</CardTitle>
              <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)}>
                <TabsList>
                  <TabsTrigger value="today">Hoje</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mês</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Objetivo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.patientName}</TableCell>
                      <TableCell>
                        {format(appointment.date, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.goal}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {appointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma consulta agendada para este período</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.filter(a => a.status === 'confirmed').slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(appointment.date, "dd/MM", { locale: ptBR })} às {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Objetivos dos Pacientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { goal: 'Emagrecimento', count: 18, color: 'bg-primary' },
                { goal: 'Hipertrofia', count: 12, color: 'bg-blue-500' },
                { goal: 'Reeducação Alimentar', count: 10, color: 'bg-purple-500' },
                { goal: 'Nutrição Esportiva', count: 7, color: 'bg-green-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.goal}</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color}`}
                      style={{ width: `${(item.count / 47) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
