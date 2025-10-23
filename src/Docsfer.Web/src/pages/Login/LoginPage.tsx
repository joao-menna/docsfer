import { LoginInput } from "../../components/buttons/LoginInput";
import { BaseButton } from "../../components/buttons/BaseButton";
import { LayoutGrid, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router";
import * as Toast from "@radix-ui/react-toast";
import { useState, type FormEvent } from "react";
import { authService } from "@/services/auth/authService";
import { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState({
    title: "",
    description: "",
    type: "success",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const showToast = (title: string, description: string, type = "success") => {
    setToastData({ title, description, type });
    setOpen(true);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast(
        "Mandatory Fields.",
        "Please, type in your email and password.",
        "error"
      );
      return;
    }

    setIsLoading(true);

    try {
      await authService.login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      showToast("Login successful.", "Redirecting to Dashboard..");

      navigate("/dashboard");
    } catch (err) {
      // da pra separar a lógica
      const axiosError = err as AxiosError<{ message?: string }>;

      let errorMessage = "Ocorreu um erro. Tente Novamente.";

      if (axiosError.response?.status === 401) {
        errorMessage = "Email or Password invalid.";
      } else if (axiosError.response?.status === 423) {
        errorMessage = "Account is blocked, reach out for support..";
      } else if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }

      showToast("Login error.", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntraIdLogin = () => {
    // sla depois eu mudo
    authService.loginWithOAuth("Microsoft");
  };

  const handleCreateAcc = () => {
    navigate("/createAccount");
  };

  return (
    <Toast.Provider swipeDirection="right">
      <div className="flex w-screen h-dvh bg-main-100 overflow-hidden">
        <section className="h-dvh hidden lg:flex lg:justify-between lg:flex-col pt-12  lg:w-[36dvw] bg-main-300">
          <span className="relative z-2 text-xl text-black ml-12 invisible">
            docsfer
          </span>
          <div className="relative w-full h-full z-2">
            <img
              src="/main_icon.svg"
              alt="logo"
              className="absolute left-14 top-48"
            />
          </div>
          <div className="absolute left-0 top-0 h-full z-0 overflow-hidden hidden 2xl:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="777"
              height="1024"
              viewBox="0 0 777 1024"
              fill="none"
            >
              <path
                d="M774.996 785.606L743.924 991.125C736.605 1039.54 694.997 1075.33 646.036 1075.33H15.8107C-38.8655 1075.33 -83.1893 1031 -83.1893 976.326V6.94778C-83.1893 -47.7284 -38.8654 -92.0522 15.8108 -92.0522H636.495C693.904 -92.0522 739.276 -43.3799 735.252 13.8876L713.543 322.805C713.042 329.934 713.315 337.096 714.356 344.166L775.052 756.385C776.479 766.074 776.46 775.922 774.996 785.606Z"
                fill="#85AFF6"
              />
            </svg>
          </div>
        </section>
        <section className="h-dvh w-full lg:w-[64dvw]">
          <main className="flex relative items-center justify-start h-full">
            <div className="w-full sm:py-8 !px-16 md:ml-20 lg:ml-64 xl:ml-40  max-w-xl">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <BaseButton
                    variant="full"
                    showIcon
                    icon={<LayoutGrid />}
                    onClick={handleEntraIdLogin}
                    type="button"
                  >
                    Entrar com entraID
                  </BaseButton>
                  {/* SEPARATOR */}
                  <div className="flex items-center gap-4 w-full ">
                    <div className="h-px flex-1 bg-black/25"></div>
                    <span className="text-gray-500  text-sm font-medium">
                      ou
                    </span>
                    <div className="h-px flex-1 bg-black/25"></div>
                  </div>
                  <LoginInput
                    labelText="Email Corporativo"
                    placeholder="email@example.com"
                    type="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  <LoginInput
                    labelText="Senha"
                    placeholder="Sua senha"
                    type="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={isLoading}
                  />

                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberMe: e.target.checked,
                        })
                      }
                      disabled={isLoading}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    Lembrar-me
                  </label>
                  <BaseButton
                    variant="border"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar com email"}
                  </BaseButton>
                  <span className="font-quicksand font-semibold text-sm text-gray-500">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="underline hover:text-gray-950! cursor-pointer"
                      onClick={handleCreateAcc}
                    >
                      Create an account for free!
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </main>
        </section>
      </div>
      <Toast.Root
        className={`grid grid-cols-[auto_max-content] gap-x-4 items-center p-4 rounded-lg shadow-lg border ${
          toastData.type === "success"
            ? "bg-green-50 border-green-200 text-green-900"
            : "bg-red-50 border-red-200 text-red-900"
        } data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut`}
        open={open}
        onOpenChange={setOpen}
        duration={toastData.type === "success" ? 3000 : 5000}
      >
        <div className="flex items-center gap-2">
          {toastData.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <div>
            <Toast.Title className="font-semibold text-sm">
              {toastData.title}
            </Toast.Title>
            <Toast.Description className="text-sm opacity-90 mt-1">
              {toastData.description}
            </Toast.Description>
          </div>
        </div>
        <Toast.Close
          className={`shrink-0 rounded-full p-1 hover:bg-black/10 transition-colors ${
            toastData.type === "success"
              ? "text-green-700 hover:bg-green-100"
              : "text-red-700 hover:bg-red-100"
          }`}
          aria-label="Close"
        >
          <XCircle className="w-4 h-4" />
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
};

export default LoginPage;
