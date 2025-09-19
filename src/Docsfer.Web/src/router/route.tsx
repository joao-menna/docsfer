import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import Login from "../pages/LoginPage";
import Dashboard from "../pages/DashboardPage";
import { RootLayout } from "../layout/RootLayout";
import { filesLoader } from "../hooks/useFileLoader";
import { requireAuth } from "../hooks/useRequireAuth";

import { RouteError } from "../components/base/RouteError";
import { Loader } from "../components/base/Loader";
import FileNotFoundError from "@/components/base/FileNotFound";
import NotFoundPage from "@/pages/NotFoundPage";

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
  // App Area
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    loader: requireAuth,
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
        loader: filesLoader,
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
