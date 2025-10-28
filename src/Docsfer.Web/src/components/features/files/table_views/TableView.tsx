import { motion } from "motion/react";
import Table from "@/components/UI/Table/Table";
import type { File } from "@/types/search";
import { useNavigate } from "react-router";

type ListViewProps = {
  data: File[];
};

export default function ListView({ data }: ListViewProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
    >
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <div
                title="Select All"
                className="size-4 border border-gray-500 bg-gray-950 rounded-sm hover:bg-gray-900 cursor-pointer"
              ></div>
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="odd:bg-gray-950 even:bg-gray-800 tracking-wide border-b border-gray-700"
            >
              <Table.BodyHeaderCell>
                <div className="size-4 border border-gray-500 bg-gray-950 rounded-sm hover:bg-gray-900 cursor-pointer"></div>
              </Table.BodyHeaderCell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.modifyDate}</Table.Cell>
              <Table.Cell>{item.size}</Table.Cell>
              <Table.Cell>{item.uploader}</Table.Cell>
              <Table.Cell>
                <button
                  type="button"
                  onClick={() => navigate(`/files/${item.id}`)}
                  className="hover:underline text-sky-500 cursor-pointer hover:text-sky-700!"
                >
                  Editar
                </button>
              </Table.Cell>
            </motion.tr>
          ))}
        </Table.Body>
      </Table>
    </motion.div>
  );
}
