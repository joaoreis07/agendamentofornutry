export type AppointmentStatus = "confirmed" | "pending" | "cancelled";

export interface PatientData {
  name: string;
  phone: string;
  email: string;
  goal: string;
  notes: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  patient: PatientData;
  createdAt: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time: string;
  reason: string;
}

const APPOINTMENTS_KEY = "nutri.appointments";
const BLOCKED_SLOTS_KEY = "nutri.blockedSlots";

export const DEFAULT_TIMES = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const demoAppointments: Appointment[] = [
  {
    id: "demo-1",
    date: "2026-06-01",
    time: "09:00",
    status: "confirmed",
    patient: {
      name: "Maria Silva",
      phone: "(11) 99999-0101",
      email: "maria@email.com",
      goal: "Emagrecimento",
      notes: "Primeira consulta. Quer organizar rotina alimentar.",
    },
    createdAt: "2026-05-28T12:00:00.000Z",
  },
  {
    id: "demo-2",
    date: "2026-06-01",
    time: "14:00",
    status: "confirmed",
    patient: {
      name: "Ana Costa",
      phone: "(11) 99999-0202",
      email: "ana@email.com",
      goal: "Reeducacao alimentar",
      notes: "Paciente deseja melhorar energia durante o dia.",
    },
    createdAt: "2026-05-29T12:00:00.000Z",
  },
  {
    id: "demo-3",
    date: "2026-06-02",
    time: "11:00",
    status: "pending",
    patient: {
      name: "Roberto Lima",
      phone: "(11) 99999-0303",
      email: "roberto@email.com",
      goal: "Hipertrofia",
      notes: "Treina 5 vezes por semana.",
    },
    createdAt: "2026-05-30T12:00:00.000Z",
  },
];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function ensureDemoData() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(APPOINTMENTS_KEY)) {
    writeJson(APPOINTMENTS_KEY, demoAppointments);
  }
  if (!localStorage.getItem(BLOCKED_SLOTS_KEY)) {
    writeJson(BLOCKED_SLOTS_KEY, []);
  }
}

export function getAppointments() {
  ensureDemoData();
  return readJson<Appointment[]>(APPOINTMENTS_KEY, []).sort((a, b) => {
    const first = `${a.date} ${a.time}`;
    const second = `${b.date} ${b.time}`;
    return first.localeCompare(second);
  });
}

export function saveAppointments(appointments: Appointment[]) {
  writeJson(APPOINTMENTS_KEY, appointments);
}

export function getBlockedSlots() {
  ensureDemoData();
  return readJson<BlockedSlot[]>(BLOCKED_SLOTS_KEY, []);
}

export function saveBlockedSlots(blockedSlots: BlockedSlot[]) {
  writeJson(BLOCKED_SLOTS_KEY, blockedSlots);
}

export function createAppointment(date: string, time: string, patient: PatientData) {
  const appointments = getAppointments();
  const alreadyBooked = appointments.some(
    (appointment) => appointment.date === date && appointment.time === time && appointment.status !== "cancelled",
  );

  if (alreadyBooked || isSlotBlocked(date, time)) {
    throw new Error("Horario indisponivel");
  }

  const appointment: Appointment = {
    id: crypto.randomUUID(),
    date,
    time,
    status: "confirmed",
    patient,
    createdAt: new Date().toISOString(),
  };

  saveAppointments([...appointments, appointment]);
  return appointment;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const appointments = getAppointments().map((appointment) =>
    appointment.id === id ? { ...appointment, status } : appointment,
  );
  saveAppointments(appointments);
}

export function deleteAppointment(id: string) {
  saveAppointments(getAppointments().filter((appointment) => appointment.id !== id));
}

export function deletePatientAppointments(phone: string) {
  saveAppointments(getAppointments().filter((appointment) => appointment.patient.phone !== phone));
}

export function isSlotBooked(date: string, time: string) {
  return getAppointments().some(
    (appointment) => appointment.date === date && appointment.time === time && appointment.status !== "cancelled",
  );
}

export function isSlotBlocked(date: string, time: string) {
  return getBlockedSlots().some((slot) => slot.date === date && slot.time === time);
}

export function getSlotsForDate(date: string) {
  return DEFAULT_TIMES.map((time) => ({
    time,
    booked: isSlotBooked(date, time),
    blocked: isSlotBlocked(date, time),
    available: !isSlotBooked(date, time) && !isSlotBlocked(date, time),
  }));
}

export function blockSlot(date: string, time: string, reason: string) {
  const blockedSlots = getBlockedSlots();
  const exists = blockedSlots.some((slot) => slot.date === date && slot.time === time);
  if (exists) return;

  saveBlockedSlots([
    ...blockedSlots,
    {
      id: crypto.randomUUID(),
      date,
      time,
      reason,
    },
  ]);
}

export function blockFullDay(date: string, reason: string) {
  const blockedSlots = getBlockedSlots();
  const newBlockedSlots = DEFAULT_TIMES.filter(
    (time) => !blockedSlots.some((slot) => slot.date === date && slot.time === time),
  ).map((time) => ({
    id: crypto.randomUUID(),
    date,
    time,
    reason,
  }));

  saveBlockedSlots([...blockedSlots, ...newBlockedSlots]);
}

export function unblockSlot(id: string) {
  saveBlockedSlots(getBlockedSlots().filter((slot) => slot.id !== id));
}
