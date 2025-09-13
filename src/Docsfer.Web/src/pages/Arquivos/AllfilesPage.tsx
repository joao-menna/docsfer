import { generateFileData } from "@/hooks/useMockData";
import { FileTemplate } from "@components/base/Arquivos/FileTemplate";

const AllfilesPage = () => {
  const products = generateFileData(15);

  return (
    <div className="">
      <div className="flex flex-col gap-2 px-6 py-4">
        <h2 className="font-josefin text-xl dark:text-zinc-400">
          Todos os seus arquivos
        </h2>
        <div className="flex flex-wrap gap-6">
          {products.map((p, i) => (
            <FileTemplate
              key={`${p.Arquivo}-${i}`}
              fileName={p.Arquivo}
              fileDate={p.sharedAt}
              fileSize={p.Size}
              sharedBy={p.sharedWith}
            /> // TODO: errado mas depois eu mudo
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllfilesPage;
