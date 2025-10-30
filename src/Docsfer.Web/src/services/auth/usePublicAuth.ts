import { redirect } from "react-router-dom";
import { authService } from "./authService";

export async function publicRouteLoader() {
  try {
    const user = await authService.getMe();

    if (user) {
      return redirect("/dashboard");
    }

    return null;
  } catch {
    return null;
  }
}
