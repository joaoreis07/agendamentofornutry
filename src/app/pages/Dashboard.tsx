import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Calendar } from "../components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Ban,
  CalendarDays,
  Clock,
  Trash2,
  Home,
  Lock,
  LogOut,
  Mail,
  Phone,
  Unlock,
  Users,
} from "lucide-react";
import { ptBR } from "date-fns/locale";
import {
  Appointment,
  AppointmentStatus,
  DEFAULT_TIMES,
  blockFullDay,
  blockSlot,
  deleteAppointment,
  deletePatientAppointments,
  formatDateKey,
  getAppointments,
  getBlockedSlots,
  getSlotsForDate,
  parseDateKey,
  unblockSlot,
  updateAppointmentStatus,
} from "../lib/appointments";

const ADMIN_PASSWORD_KEY = "nutri.adminPassword";

function formatDate(dateKey: string) {
  return parseDateKey(dateKey).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getGoalLabel(goal: string) {
  const labels: Record<string, string> = {
    emagrecimento: "Emagrecimento",
    hipertrofia: "Hipertrofia",
    reeducacao: "Reeducacao alimentar",
    "nutricao-esportiva": "Nutricao esportiva",
    outro: "Outro",
  };
  return labels[goal] ?? goal;
}

function getStatusBadge(status: AppointmentStatus) {
  if (status === "confirmed") {
    return <Badge className="bg-primary/10 text-primary border-primary/20">Confirmado</Badge>;
  }
  if (status === "cancelled") {
    return <Badge variant="destructive">Cancelado</Badge>;
  }
  return <Badge variant="secondary">Pendente</Badge>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("nutri.admin") === "true");
  const [hasPassword, setHasPassword] = useState(() => Boolean(localStorage.getItem(ADMIN_PASSWORD_KEY)));
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("today");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blockDate, setBlockDate] = useState<Date | undefined>(new Date());
  const [blockTime, setBlockTime] = useState(DEFAULT_TIMES[0]);
  const [blockReason, setBlockReason] = useState("");
  const [scheduleDate, setScheduleDate] = useState<Date>(new Date());

  const refreshData = () => {
    setAppointments(getAppointments());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const todayKey = formatDateKey(new Date());

  const filteredAppointments = useMemo(() => {
    if (filterPeriod === "today") {
      return appointments.filter((appointment) => appointment.date === todayKey);
    }

    if (filterPeriod === "week") {
      const today = new Date();
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);
      return appointments.filter((appointment) => {
        const appointmentDate = parseDateKey(appointment.date);
        return appointmentDate >= new Date(todayKey) && appointmentDate <= weekEnd;
      });
    }

    return appointments;
  }, [appointments, filterPeriod, todayKey]);

  const activeAppointments = appointments.filter((appointment) => appointment.status !== "cancelled");
  const uniquePatients = activeAppointments.filter(
    (appointment, index, list) =>
      list.findIndex((item) => item.patient.phone === appointment.patient.phone) === index,
  );
  const stats = {
    today: activeAppointments.filter((appointment) => appointment.date === todayKey).length,
    week: filteredAppointments.filter((appointment) => appointment.status !== "cancelled").length,
    patients: uniquePatients.length,
  };

  const nextAppointment = activeAppointments.find((appointment) => `${appointment.date} ${appointment.time}` >= `${todayKey} 00:00`);
  const selectedScheduleKey = formatDateKey(scheduleDate);
  const daySlots = getSlotsForDate(selectedScheduleKey);
  const blockedSlots = getBlockedSlots();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const savedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);

    if (savedPassword && password === savedPassword) {
      sessionStorage.setItem("nutri.admin", "true");
      setAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Senha incorreta.");
  };

  const handleCreatePassword = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword.trim().length < 6) {
      setLoginError("Crie uma senha com pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLoginError("As senhas digitadas nao conferem.");
      return;
    }

    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    sessionStorage.setItem("nutri.admin", "true");
    setHasPassword(true);
    setAuthenticated(true);
    setLoginError("");
  };

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    updateAppointmentStatus(id, status);
    refreshData();
  };

  const handleBlockSlot = () => {
    if (!blockDate || !blockTime) return;
    blockSlot(formatDateKey(blockDate), blockTime, blockReason || "Indisponivel");
    setBlockReason("");
    refreshData();
  };

  const handleBlockFullDay = () => {
    if (!blockDate) return;
    blockFullDay(formatDateKey(blockDate), blockReason || "Dia indisponivel");
    setBlockReason("");
    refreshData();
  };

  const handleUnblockSlot = (id: string) => {
    unblockSlot(id);
    refreshData();
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    const confirmed = window.confirm(
      `Remover o agendamento de ${appointment.patient.name} em ${formatDate(appointment.date)} as ${appointment.time}? O horario ficara livre novamente.`,
    );

    if (!confirmed) return;
    deleteAppointment(appointment.id);
    refreshData();
  };

  const handleDeletePatient = (appointment: Appointment) => {
    const confirmed = window.confirm(
      `Remover ${appointment.patient.name} do cadastro? Todos os agendamentos desse paciente serao removidos.`,
    );

    if (!confirmed) return;
    deletePatientAppointments(appointment.patient.phone);
    refreshData();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Painel do nutricionista</CardTitle>
            <CardDescription>
              {hasPassword
                ? "Entre com a senha criada para visualizar agenda, pacientes e horarios bloqueados."
                : "Crie a senha de acesso no primeiro uso do painel."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasPassword ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha de acesso</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Digite a senha"
                  />
                </div>

                {loginError && <p className="text-sm text-destructive">{loginError}</p>}

                <Button type="submit" className="w-full">
                  <Unlock className="mr-2 h-4 w-4" />
                  Entrar no painel
                </Button>

                <Button type="button" variant="ghost" className="w-full" onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para o site
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCreatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Criar senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Minimo de 6 caracteres"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Digite novamente"
                  />
                </div>

                {loginError && <p className="text-sm text-destructive">{loginError}</p>}

                <Button type="submit" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Criar senha e entrar
                </Button>

                <Button type="button" variant="ghost" className="w-full" onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para o site
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="border-b bg-card/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Painel da Nutricionista</h1>
              <p className="text-muted-foreground mt-1">Agenda, pacientes e disponibilidade em um so lugar.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" />
                Ir para o site
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  sessionStorage.removeItem("nutri.admin");
                  setAuthenticated(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Consultas hoje</CardTitle>
              <CalendarDays className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.today}</div>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(todayKey)}</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Consultas filtradas</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.week}</div>
              <p className="text-xs text-muted-foreground mt-1">Nao inclui consultas canceladas</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.patients}</div>
              <p className="text-xs text-muted-foreground mt-1">Contagem por WhatsApp cadastrado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="appointments">Agenda</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Agendamentos</CardTitle>
                    <CardDescription>Consultas feitas pelo site aparecem aqui automaticamente.</CardDescription>
                  </div>
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Proximos 7 dias</SelectItem>
                      <SelectItem value="month">Todos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Horario</TableHead>
                        <TableHead>Objetivo</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Nenhum agendamento encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="font-medium">{appointment.patient.name}</div>
                              {appointment.patient.notes && (
                                <div className="text-xs text-muted-foreground max-w-[220px] truncate">{appointment.patient.notes}</div>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(appointment.date)}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{getGoalLabel(appointment.patient.goal)}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="icon" variant="ghost" onClick={() => window.open(`https://wa.me/55${appointment.patient.phone.replace(/\D/g, "")}`, "_blank")}>
                                  <Phone className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => window.open(`mailto:${appointment.patient.email}`, "_blank")}>
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(appointment.status)}
                                <Select value={appointment.status} onValueChange={(value) => handleStatusChange(appointment.id, value as AppointmentStatus)}>
                                  <SelectTrigger className="h-8 w-[130px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="confirmed">Confirmado</SelectItem>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="ghost" onClick={() => handleDeleteAppointment(appointment)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remover
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Proxima consulta</CardTitle>
              </CardHeader>
              <CardContent>
                {nextAppointment ? (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-lg">{nextAppointment.patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(nextAppointment.date)} as {nextAppointment.time} - {getGoalLabel(nextAppointment.patient.goal)}
                      </p>
                    </div>
                    <Button onClick={() => window.open(`https://wa.me/55${nextAppointment.patient.phone.replace(/\D/g, "")}`, "_blank")}>
                      <Phone className="mr-2 h-4 w-4" />
                      Chamar no WhatsApp
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nao ha proximas consultas ativas.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Ban className="mr-2 h-4 w-4" />
                    Bloquear horario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bloquear horario</DialogTitle>
                    <DialogDescription>Use para ferias, eventos ou indisponibilidade pontual.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Calendar mode="single" selected={blockDate} onSelect={setBlockDate} locale={ptBR} className="rounded-md border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Horario</Label>
                      <Select value={blockTime} onValueChange={setBlockTime}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DEFAULT_TIMES.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Motivo</Label>
                      <Input value={blockReason} onChange={(event) => setBlockReason(event.target.value)} placeholder="Ex: reuniao, ferias, evento" />
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <Button className="w-full" variant="outline" onClick={handleBlockFullDay}>
                        Bloquear dia inteiro
                      </Button>
                      <Button className="w-full" variant="destructive" onClick={handleBlockSlot}>
                        Bloquear horario
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid lg:grid-cols-[340px_1fr] gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Visualizar agenda</CardTitle>
                  <CardDescription>Selecione um dia para ver horarios livres, ocupados e bloqueados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={scheduleDate} onSelect={(date) => date && setScheduleDate(date)} locale={ptBR} className="rounded-md border" />
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>{formatDate(selectedScheduleKey)}</CardTitle>
                  <CardDescription>Mapa diario de disponibilidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {daySlots.map((slot) => (
                      <div
                        key={slot.time}
                        className={`rounded-lg border p-4 ${
                          slot.booked ? "bg-primary/10 border-primary/20" : slot.blocked ? "bg-destructive/10 border-destructive/20" : "bg-card"
                        }`}
                      >
                        <p className="font-semibold">{slot.time}</p>
                        <p className="text-sm text-muted-foreground">
                          {slot.booked ? "Ocupado" : slot.blocked ? "Bloqueado" : "Livre"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Horarios bloqueados</CardTitle>
              </CardHeader>
              <CardContent>
                {blockedSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum horario bloqueado.</p>
                ) : (
                  <div className="space-y-2">
                    {blockedSlots.map((slot) => (
                      <div key={slot.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3">
                        <div>
                          <p className="font-medium">
                            {formatDate(slot.date)} as {slot.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{slot.reason}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleUnblockSlot(slot.id)}>
                          Liberar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Pacientes cadastrados</CardTitle>
                <CardDescription>Lista gerada a partir dos agendamentos recebidos.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {uniquePatients.map((appointment) => (
                    <div key={appointment.id} className="rounded-lg border bg-card p-4 space-y-3">
                      <div>
                        <p className="font-semibold">{appointment.patient.name}</p>
                        <p className="text-sm text-muted-foreground">{getGoalLabel(appointment.patient.goal)}</p>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>{appointment.patient.phone}</p>
                        <p>{appointment.patient.email}</p>
                      </div>
                      {appointment.patient.notes && <p className="text-sm">{appointment.patient.notes}</p>}
                      <Button size="sm" variant="outline" className="w-full" onClick={() => handleDeletePatient(appointment)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover cliente
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
