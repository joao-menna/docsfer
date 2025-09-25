import {motion} from "motion/react";
import ListFile from "@components/base/Arquivos/ListFile.tsx";

export default function GridView({ data }) {
    return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
        {data.map((item, index) => (
            <ListFile key={item.id} item={item.id} index={index} />
        ))}
    </motion.div>)
}