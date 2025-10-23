import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

// pages
import Login from "../pages/Login/LoginPage";
import CreateAccount from "@/pages/Login/CreateAccountPage";
import Dashboard from "../pages/DashboardPage";
import { RootLayout } from "../layout/RootLayout";
import NotFoundPage from "@/pages/NotFoundPage";

// components and utils
import { RouteError } from "../components/base/RouteError";
import { Loader } from "../components/base/Loader";
import { filesLoader, fileDetailLoader } from "../hooks/useFileLoader";
import FileNotFoundError from "@/components/base/FileNotFound";
// import { protectedLoader } from "@/services/auth/authLoader";

// lazy-loaded pages
const Groups = lazy(() => import("../pages/GroupPage"));
const Files = lazy(() => import("../pages/Arquivos/AllfilesPage"));
const Details = lazy(() => import("../pages/Arquivos/FileDetailsPage"));
const Sharing = lazy(() => import("../pages/SharingPage"));

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
      {
        path: "newFile",
        element: <Sharing />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouteError />,
  },
]);
