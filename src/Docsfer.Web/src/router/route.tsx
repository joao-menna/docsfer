import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

// pages
import Login from "../pages/auth/Login";
import CreateAccount from "@/pages/auth/SignUp";
import Dashboard from "../pages/DashboardPage";
import { RootLayout } from "../layout/RootLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import Relationship from "../pages/Relationship/index";

// components and utils
import { RouteError } from "../components/features/Loader/RouteError";
import { Loader } from "../components/features/Loader/Loader";
import { filesLoader, fileDetailLoader } from "../hooks/loaders/useFileLoader";
import FileNotFoundError from "@/components/features/files/errors/FileNotFound";
import { publicRouteLoader } from "@/services/auth/usePublicAuth";
// import { protectedLoader } from "@/services/auth/authLoader";

// lazy-loaded pages
const Files = lazy(() => import("../pages/files/AllfilesPage"));
const Details = lazy(() => import("../pages/files/FileDetailsPage"));
const Friends = lazy(() => import("@/pages/Relationship/friends"));
const Group = lazy(() => import("@/pages/Relationship/groups"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <RouteError />,
    loader: publicRouteLoader,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
    loader: publicRouteLoader,
  },
  // App Area
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    loader: filesLoader,
    children: [
      { path: "dashboard", element: <Dashboard />, loader: filesLoader },
      {
        path: "@me",
        element: <Relationship />,
        loader: filesLoader,
        children: [
          { index: true, element: <Friends />, loader: filesLoader },
          { path: "groups", element: <Group /> },
        ],
      },
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
