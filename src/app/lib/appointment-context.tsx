import { createContext, useContext, useState, ReactNode } from "react";

interface AppointmentData {
  selectedDate: Date | null;
  selectedTime: string | null;
  patientData: {
    name: string;
    phone: string;
    email: string;
    goal: string;
    notes: string;
  } | null;
}

interface AppointmentContextType {
  appointmentData: AppointmentData;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setPatientData: (data: AppointmentData["patientData"]) => void;
  clearAppointment: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    selectedDate: null,
    selectedTime: null,
    patientData: null,
  });

  const setSelectedDate = (date: Date | null) => {
    setAppointmentData((prev) => ({ ...prev, selectedDate: date }));
  };

  const setSelectedTime = (time: string | null) => {
    setAppointmentData((prev) => ({ ...prev, selectedTime: time }));
  };

  const setPatientData = (data: AppointmentData["patientData"]) => {
    setAppointmentData((prev) => ({ ...prev, patientData: data }));
  };

  const clearAppointment = () => {
    setAppointmentData({
      selectedDate: null,
      selectedTime: null,
      patientData: null,
    });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointmentData,
        setSelectedDate,
        setSelectedTime,
        setPatientData,
        clearAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
}
