import { createBrowserRouter } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import FocusPage from "../pages/FocusPage";
import NotesPage from "../pages/NotesPage";
import ProgressPage from "../pages/ProgressPage";
import AIStudioPage from "../pages/AIStudioPage";
import SettingsPage from "../pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "focus", element: <FocusPage /> },
      { path: "notes", element: <NotesPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "ai-studio", element: <AIStudioPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);