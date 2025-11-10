import { redirect } from "react-router";
import { checkAuth } from "./checkAuth";

export async function protectedLoader() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return redirect("/");
  }

  return null;
}
