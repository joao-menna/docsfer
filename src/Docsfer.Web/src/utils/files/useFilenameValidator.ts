export function validateFilename(filename: string) {
  const regex = new RegExp('[\\\\/:\\*?"<>|]');
  const match = regex.test(filename);

  if (match) {
    return false;
  }
  return filename;
}
