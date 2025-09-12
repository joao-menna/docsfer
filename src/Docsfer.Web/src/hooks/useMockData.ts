import { fakerPT_BR as faker } from "@faker-js/faker";

const actions = ["Shared", "uploaded", "downloaded", "deleted", "renamed"];
const receivers = ["RH", "Comercial", "TI", "Financeiro", "Marketing", null];
/* const fileExtensions = [
  "pdf",
  "docx",
  "xlsx",
  "pptx",
  "txt",
  "jpg",
  "png",
  "gif",
  "zip",
]; */

export const formatDateToBR = (date: Date, includeTime = false) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  if (!includeTime) {
    return `${day}/${month}/${year}`;
  }

  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year}, ${hour}:${minutes}:${second}`;
};

const generateActivity = () => {
  const action = faker.helpers.arrayElement(actions);
  const hasReceiver = action === "Shared";

  return {
    username: faker.person.fullName(),
    date: formatDateToBR(faker.date.recent({ days: 30 }), true),
    action,
    item: `${faker.system.commonFileName()}`,
    fileSize: faker.number.int({ min: 1024, max: 10485760 }),
    receiver: hasReceiver
      ? faker.helpers.arrayElement(receivers.filter((r) => r !== null))
      : undefined,
  };
};

export const generateActivities = (count = 10) => {
  return Array.from({ length: count }, generateActivity);
};

export const generateUserActivities = (username: string, count = 5) => {
  return Array.from({ length: count }, () => ({
    ...generateActivity(),
    username,
  }));
};

export const generateFiles = (count = 20) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: `${faker.system.commonFileName()}`,
    size: faker.number.int({ min: 1024, max: 10485760 }),
    uploadedBy: faker.person.fullName(),
    uploadedAt: faker.date.recent({ days: 90 }),
    department: faker.helpers.arrayElement([
      "RH",
      "Comercial",
      "TI",
      "Financeiro",
      "Marketing",
    ]),
    downloads: faker.number.int({ min: 0, max: 50 }),
  }));
};

export const formatFileSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

export const generateFileData = (count = 20) => {
  return Array.from({ length: count }, () => {
    const fileName = `${faker.system.commonFileName()}`;
    const sizeInBytes = faker.number.int({ min: 1024, max: 52428800 });

    return {
      Arquivo: fileName,
      sharedWith: faker.person.firstName(),
      sharedAt: formatDateToBR(faker.date.recent({ days: 365 })),
      groups: faker.helpers.arrayElement([
        "RH",
        "Comercial",
        "TI",
        "Financeiro",
        "Marketing",
        "Juridico",
      ]),
      Size: formatFileSize(sizeInBytes),
    };
  });
};
