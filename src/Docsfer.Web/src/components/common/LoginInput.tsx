interface LoginInputProps {
  labelText: string;
  placeholder?: string;
  type: string;
}

export const LoginInput = ({
  labelText,
  placeholder,
  type,
}: LoginInputProps) => {
  return (
    <fieldset className="flex flex-col-reverse gap-2 items-start justify-start group">
      <label className="flex flex-col-reverse font-josefin tracking-wide font-semibold text-black/25 group-focus-within:text-gray-600 transition-all ease-in duration-300 login-button-anim w-full">
        <input
          className="flex items-center text-sm peer w-full h-default p-3 rounded-sm border-2 border-black/15 focus:border-gray-600 placeholder:text-black/25 outline-none font-semibold transition-all ease-in-out duration-300 group focus:tracking-wide dark:placeholder:!text-black/25 dark:text-black/50"
          type={type}
          placeholder={placeholder}
        />

        {labelText}
      </label>
    </fieldset>
  );
};
