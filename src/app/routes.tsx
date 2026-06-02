import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import SelectDate from "./pages/SelectDate";
import SelectTime from "./pages/SelectTime";
import PatientData from "./pages/PatientData";
import Confirmation from "./pages/Confirmation";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: LandingPage,
    },
    {
      path: "/agendar",
      Component: SelectDate,
    },
    {
      path: "/agendar/horario",
      Component: SelectTime,
    },
    {
      path: "/agendar/dados",
      Component: PatientData,
    },
    {
      path: "/agendar/confirmacao",
      Component: Confirmation,
    },
    {
      path: "/painel",
      Component: Dashboard,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
