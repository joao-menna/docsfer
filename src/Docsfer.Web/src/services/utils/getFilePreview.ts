export type PreviewResult =
  | { kind: "image"; url: string }
  | { kind: "video"; url: string }
  | { kind: "pdf"; url: string }
  | { kind: "text"; text: string };

export async function getFilePreview(name: string): Promise<PreviewResult> {
  const ext = name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return { kind: "image", url: "/images/logo_docspider.png" };

    case "mp4":
    case "webm":
      return { kind: "video", url: "/mock/video.mp4" };

    case "pdf":
      return { kind: "pdf", url: "/mock/sample.pdf" };

    case "txt":
    case "md":
    case "log":
      return {
        kind: "text",
        text: "Conteúdo de exemplo do arquivo de texto...",
      };

    case "docx":
    case "xlsx":
    case "pptx":
      return {
        kind: "text",
        text: "Pré-visualização não suportada. Faça download ou abra no app.",
      };

    default:
      return { kind: "text", text: "Sem pré-visualização disponível." };
  }
}
