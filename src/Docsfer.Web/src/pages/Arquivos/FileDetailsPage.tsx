import { useLoaderData } from "react-router";

type File = {
  id: string;
  name: string;
};

type LoaderData = {
  files: File[];
};

export default function FileDetails() {
  const { files } = useLoaderData() as LoaderData;

  const file = files[0];

  return (
    <div className="text-zinc-400 font-gabarito">
      <h1>File details</h1>
      <p>ID: {file.id}</p>
      <p>Name: {file.name}</p>
    </div>
  );
}
