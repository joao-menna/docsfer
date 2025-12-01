import { authService } from "./authService";

export async function checkAuth(): Promise<boolean> {
  try {
    await authService.getMe();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
