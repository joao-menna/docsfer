import { generateFileData } from "@/hooks/useMockData";
import { FileTemplate } from "@components/base/Arquivos/FileTemplate";
import { useNavigate } from "react-router";

const AllfilesPage = () => {
  const products = generateFileData(4);
  const navigate = useNavigate();

  const handleNotFound = () => {
    navigate("/newFile");
  };

  return (
    <div className="flex flex-col">
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
        {products.length === 0 && (
          <div className="flex-center flex-col gap-24 w-full h-[calc(100dvh-8rem)]">
            <img
              src="/not-found.svg"
              alt="nothing found"
              className="max-w-82"
            />
            <div className="flex-center flex-col gap-2">
              <span className="font-josefin text-sky-300 text-4xl font-extrabold tracking-wider">
                Não encontramos nada! :(
              </span>
              <span className="font-gabarito  text-sky-100">
                Tente{" "}
                <button
                  type="button"
                  onClick={handleNotFound}
                  className="text-sky-300 hover:underline cursor-pointer"
                >
                  enviar um novo arquivo
                </button>
                , ou peça para alguém compartilhar algum!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllfilesPage;
