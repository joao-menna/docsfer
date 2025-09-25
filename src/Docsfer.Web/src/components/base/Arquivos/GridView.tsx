import { motion } from "motion/react";
import ListFile from "@components/base/Arquivos/ListFile.tsx";
import type { File } from "@/types/search";

type GridViewProps = {
  data: File[];
};

export default function GridView({ data }: GridViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ListFile key={item.id} file={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
