import { motion } from "motion/react";
import ListFile from "@/components/features/files/CardView_Card";
import type { File } from "@/types/search";

type GridViewProps = {
  data: File[];
  selectedFileId?: number | null;
  onFileClick: (file: File) => void;
};

export default function GridView({
  data,
  selectedFileId,
  onFileClick,
}: GridViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.18, type: "spring", bounce: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onFileClick(item)}
        >
          <ListFile
            key={item.id}
            file={item}
            isSelected={selectedFileId === item.id}
            onFileClick={onFileClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
