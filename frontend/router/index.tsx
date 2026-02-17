// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Authentication/SignUp";
import App from "../pages/App";
import SignIn from "../pages/Authentication/SignIn";
import ResetPassword from "../pages/Authentication/ResetPassword";
import RegistrationCompleted from "../pages/Authentication/RegistrationCompleted";
import Details from "../pages/Authentication/Details";
import Dashboard from "../pages/Dashboard";
import Business from "../pages/Business";
import Notes from "../pages/Notes";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";
import Messages from "../pages/Messages";
import Files from "../pages/Files";
import Help from "../pages/Help";

export const router = createBrowserRouter([
//   { path: "/login", element: <Login /> },
  { path: "/", element: <Dashboard /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/registration-completed", element: <RegistrationCompleted /> },
  { path: "/details", element: <Details /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/business", element: <Business /> },
  { path: "/notes", element: <Notes /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/calendar", element: <Calendar /> },
  { path: "/messages", element: <Messages /> },
  { path: "/files", element: <Files /> },
  { path: "/help", element: <Help /> },
]);
