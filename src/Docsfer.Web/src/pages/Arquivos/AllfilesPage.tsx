import ListFile from "@/components/base/Arquivos/ListFile";
import RecentFile from "@/components/base/Arquivos/RecentFile";
import Table from "@/components/base/dashboard/Table";
import { generateFileData } from "@/hooks/useMockData";
import { FileTemplate } from "@components/base/Arquivos/FileTemplate";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

const ListView = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>
            <div className="size-4 border-gray-700 bg-gray-950 rounded-lg"></div>
          </Table.HeaderCell>
          <Table.HeaderCell>Nome</Table.HeaderCell>
          <Table.HeaderCell>Última Atualização</Table.HeaderCell>
          <Table.HeaderCell>Tamanho</Table.HeaderCell>
          <Table.HeaderCell>Enviado por</Table.HeaderCell>
          <Table.HeaderCell>Ações</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((item, index) => (
          <motion.tr
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="odd:bg-gray-950 even:bg-gray-800 tracking-wide border-b border-gray-700"
          >
            <Table.BodyHeaderCell>
              <div className="size-4 border-gray-700 bg-gray-950 rounded-lg"></div>
            </Table.BodyHeaderCell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.updatedAt}</Table.Cell>
            <Table.Cell>{item.size}</Table.Cell>
            <Table.Cell>{item.uploader}</Table.Cell>
            <Table.Cell>
              <span className="hover:underline text-sky-500">Editar</span>
            </Table.Cell>
          </motion.tr>
        ))}
      </Table.Body>
    </Table>
  </motion.div>
);

const AllfilesPage = () => {
  const products = generateFileData(4);
  const navigate = useNavigate();

  const handleNotFound = () => {
    navigate("/newFile");
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-4">
        {/* Heading */}
        <div className="flex flex-col gap-10">
          {/* breadcrumbs */}
          <div className="flex w-full font-gabarito text-sm">
            <button
              type="button"
              className="text-gray-200 cursor-pointer pr-2 hover:text-gray-400"
              onClick={() => navigate("/")}
            >
              / home
            </button>
            <span className="text-gray-600 pr-2"> / files</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-josefin text-gray-200 text-3xl">Documentos</h1>
            <span className="text-gray-400 font-josefin">
              Documentos e arquivos enviados para você, ou por você.
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-5 items-start">
          {/* Arquivos Recentes */}
          <div className="flex flex-col font-gabarito text-gray-200 gap-5 items-start">
            <h2 className="font-josefin text-lg">Arquivos Recentes</h2>
            <button
              type="button"
              className="flex-center px-4 py-2 gap-2 rounded-lg bg-gray-950 border-2 border-gray-700 cursor-pointer"
            >
              <span>Mais velhos primeiro</span>
              <ChevronDown />
            </button>
            <div className="flex gap-6 justify-start w-full">
              <RecentFile />
              <RecentFile />
              <RecentFile />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 px-6 py-4">
          <h2 className="font-josefin text-xl dark:text-zinc-400">
            Todos os seus arquivos
          </h2>
          <ListFile />
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
    </>
  );
};

export default AllfilesPage;
