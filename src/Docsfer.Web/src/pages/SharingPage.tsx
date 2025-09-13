import Dropzone from "@components/base/Arquivos/Dropzone";

const SharingPage = () => {
  const handleFiles = () => {
    console.log("implementar depois");
  };
  return (
    <div>
      <Dropzone onFiles={handleFiles} />
    </div>
  );
};

export default SharingPage;
