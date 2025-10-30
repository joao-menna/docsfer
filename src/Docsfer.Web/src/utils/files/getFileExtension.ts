const DOUBLE_EXTS = new Set([".tar.gz", ".tar.bz2", ".tar.xz"]);

export function splitFile(fullName: string) {
  const lower = fullName.toLowerCase();

  for (const ext of DOUBLE_EXTS) {
    if (lower.endsWith(ext)) {
      return {
        base: fullName.slice(0, fullName.length - ext.length),
        ext,
      };
    }
  }

  const dot = fullName.lastIndexOf(".");
  if (dot > 0 && dot < fullName.length - 1) {
    return {
      base: fullName.slice(0, dot),
      ext: fullName.slice(dot),
    };
  }
  return { base: fullName, ext: "" };
}

export function extFromMime(mime: string) {
  if (!mime) return "";
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "application/pdf": ".pdf",
    "application/zip": ".zip",
    "text/plain": ".txt",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
  };
  return map[mime] ?? "";
}
