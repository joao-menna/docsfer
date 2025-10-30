export const fileType: Record<string, string> = {
  fig: "figma design",
  sketch: "sketch design",
  xd: "adobe xd design",

  pdf: "documento PDF",
  doc: "documento Word",
  docx: "documento Word",
  txt: "arquivo de Texto",
  md: "markdown",

  xls: "planilha Excel",
  xlsx: "planilha Excel",
  csv: "planilha CSV",

  jpg: "imagem",
  jpeg: "imagem",
  png: "imagem",
  gif: "imagem animada",
  svg: "vetor SVG",
  webp: "imagem",

  ppt: "Apresentação powerpoint",
  pptx: "apresentação powerpoint",

  zip: "arquivo ZIP",
  rar: "arquivo rar",
  mp4: "vídeo",
  wav: "áudio WAV",
  mp3: "áudio",
};

export function getFileTypeLabel(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext && fileType[ext] ? fileType[ext] : "arquivo";
}
