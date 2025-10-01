interface FileInputProps {
  label: string;
  placeholder: string;
}

const FileInput = ({ label, placeholder = "" }: FileInputProps) => {
  return (
    <span className="w-full">
      <label className="flex flex-col text-zinc-400 w-full">
        {label}

        <input
          className="dark:placeholder:text-zinc-600 px-3 py-1 border border-zinc-400 rounded-lg dark:text-zinc-200"
          placeholder={placeholder}
          autoComplete="email"
        />
      </label>
    </span>
  );
};

export default FileInput;
