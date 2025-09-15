interface FileInputProps {
  label: string;
  placeholder: string;
}

const FileInput = ({ label, placeholder = "" }: FileInputProps) => {
  return (
    <>
      <label htmlFor="abcde" className="text-zinc-400">
        {label}
      </label>
      <input
        id="abcde"
        className="dark:placeholder:text-zinc-600 px-3 py-1 border border-zinc-400 rounded-lg dark:text-zinc-200"
        placeholder={placeholder}
        autoComplete="banana"
      />
    </>
  );
};

export default FileInput;
