import { redirect } from "react-router";
import { authService } from "@/services/auth/authService";

export async function requireAuth() {
  try {
    return await authService.getMe();
  } catch (error) {
    console.log(error);
    throw redirect("/");
  }
}
