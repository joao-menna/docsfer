import {motion} from "motion/react";
import Table from "@components/base/dashboard/Table.tsx";

export default function ListView({ data })
{
    return (
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -20}}
        transition={{duration: 0.3}}
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
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 0, x: 0}}
                        transition={{delay: index * 0.05}}
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
    )
};