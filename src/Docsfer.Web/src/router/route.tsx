import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

// pages
import Login from "../pages/auth/Login";
import CreateAccount from "@/pages/auth/SignUp";
import Dashboard from "../pages/DashboardPage";
import { RootLayout } from "../layout/RootLayout";
import NotFoundPage from "@/pages/NotFoundPage";

// components and utils
import { RouteError } from "../components/features/Loader/RouteError";
import { Loader } from "../components/features/Loader/Loader";
import { filesLoader, fileDetailLoader } from "../hooks/useFileLoader";
import FileNotFoundError from "@/components/features/files/errors/FileNotFound";
// import { protectedLoader } from "@/services/auth/authLoader";

// lazy-loaded pages
const Groups = lazy(() => import("../pages/GroupPage"));
const Files = lazy(() => import("../pages/files/AllfilesPage"));
const Details = lazy(() => import("../pages/files/FileDetailsPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <RouteError />,
    /* loader: async () => {
      if (await isAuthed()) throw new redirect("/dashboard");
      return null
    } */
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
  },
  // App Area
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    loader: filesLoader,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "groups", element: <Groups /> },
      {
        path: "files",
        loader: filesLoader,
        element: (
          <Suspense fallback={<Loader />}>
            <Files />
          </Suspense>
        ),
      },
      {
        path: "files/:id",
        loader: fileDetailLoader,
        errorElement: <FileNotFoundError />,
        element: (
          <Suspense fallback={<Loader />}>
            <Details />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouteError />,
  },
]);
