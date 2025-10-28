import { BaseButton } from "@/components/UI/Button/BaseButton";
import { CreateAccInput } from "@/components/UI/Input/CreateAccInput.tsx";
import { useToast } from "@/hooks/utils/useToastContext";
import { useNavigate } from "react-router";
import { api } from "@/services/httpClient";
import { useState, type ChangeEvent, type FormEvent, useCallback } from "react";
import { isAxiosError } from "axios";

type CreateAccountForm = {
  Email: string;
  name: string;
  Password: string;
  confirmPassword: string;
};

const initialFormState: CreateAccountForm = {
  Email: "",
  name: "",
  Password: "",
  confirmPassword: "",
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<CreateAccountForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof CreateAccountForm) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const showErrorToast = (detail: string) => {
    addToast({
      severity: "error",
      summary: "Could not create account",
      detail,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formData.Email || !formData.Password || !formData.confirmPassword) {
      showErrorToast("Please fill in all required fields.");
      return;
    }

    if (formData.Password !== formData.confirmPassword) {
      showErrorToast("Passwords do not match. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending data:", {
        Email: formData.Email,
        Password: formData.Password,
      });
      await api.post("/auth/register", {
        Email: formData.Email,
        Password: formData.Password,
      });

      addToast({
        severity: "success",
        summary: "Account created successfully",
        detail: "You can now sign in with your new credentials.",
      });

      resetForm();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (isAxiosError(error)) {
        const responseMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message;

        if (responseMessage) {
          showErrorToast(responseMessage);
          return;
        }

        if (error.code === "ECONNABORTED") {
          showErrorToast("The request timed out. Please try again.");
          return;
        }

        if (error.message === "Network Error") {
          showErrorToast(`Could not connect to the server. ${error.message}`);
          return;
        }
      }

      showErrorToast("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex w-dvw h-dvh">
      <div className="flex z-20 flex-col h-full gap-12 justify-center w-3/5 items-center lg:px-60 bg-main-100">
        <div className="flex gap-4 w-full max-w-lg items-center justify-start">
          <img
            src="/images/logo_docspider.png"
            alt="logo"
            className="max-w-8 object-cover"
          />
          <div className="flex flex-col justify-between font-raleway h-full">
            <span className="text-sm font-semibold">Create an account in</span>
            <span className="font-black tracking-wide text-lg">Docsfer</span>
          </div>
        </div>
        <form
          className="flex flex-col w-full max-w-lg gap-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <CreateAccInput
            labelText="Email"
            placeholder="email@example.com"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.Email}
            onChange={handleInputChange("Email")}
            required
          />
          <CreateAccInput
            labelText="Name"
            placeholder="Coolname"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange("name")}
          />
          <CreateAccInput
            labelText="Password"
            placeholder="password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={formData.Password}
            onChange={handleInputChange("Password")}
            required
            minLength={8}
          />
          <CreateAccInput
            labelText="Repeat password"
            placeholder="password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            required
            minLength={8}
          />
          <div className="w-full flex flex-col items-center gap-1 mt-4">
            <BaseButton variant="full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create an account."}
            </BaseButton>
            <span className="font-semibold font-quicksand">or</span>
            <BaseButton variant="border" onClick={handleGoBack} type="button">
              Enter with an existing account.
            </BaseButton>
          </div>
        </form>
      </div>
      <div className="w-2/5 z-10 bg-blue-200 h-dvh" />
    </div>
  );
}
