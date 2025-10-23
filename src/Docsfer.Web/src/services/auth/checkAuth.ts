import { authService } from "./authService";

export async function checkAuth(): Promise<boolean> {
  try {
    await authService.getMe();
    return true;
  } catch (err) {
    return false;
  }
}
