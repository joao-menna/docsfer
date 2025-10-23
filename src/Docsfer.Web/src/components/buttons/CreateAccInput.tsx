import { type InputHTMLAttributes } from "react";
import clsx from "clsx";

type LoginInputProps = {
  labelText: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const CreateAccInput = ({
  labelText,
  placeholder,
  type = "text",
  className,
  id,
  name,
  ...rest
}: LoginInputProps) => {
  const normalizedType =
    typeof type === "string" ? (type.toLowerCase() as typeof type) : type;
  const inputId =
    id ??
    name ??
    `${
      typeof labelText === "string"
        ? labelText.replace(/\s+/g, "-").toLowerCase()
        : "login-input"
    }`;

  return (
    <fieldset className="flex flex-col-reverse gap-2 items-start justify-start group">
      <input
        className={clsx(
          "flex items-center text-sm peer w-full h-default p-3 rounded-sm border-2 border-black/15 focus:border-gray-600 placeholder:text-black/25 outline-none font-semibold transition-all ease-in-out duration-300 group focus:tracking-wide dark:placeholder:!text-black/25 dark:text-black/50",
          className
        )}
        type={normalizedType}
        id={inputId}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-josefin tracking-wide font-semibold text-black/25 group-focus-within:text-gray-600 transition-all ease-in duration-300 login-button-anim "
        htmlFor={inputId}
      >
        {labelText}
      </label>
    </fieldset>
  );
};
