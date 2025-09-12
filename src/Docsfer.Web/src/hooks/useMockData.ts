import { fakerPT_BR as faker } from "@faker-js/faker";

const actions = ["Shared", "uploaded", "downloaded", "deleted", "renamed"];
const receivers = ["RH", "Comercial", "TI", "Financeiro", "Marketing", null];
const fileExtensions = [
  "pdf",
  "docx",
  "xlsx",
  "pptx",
  "txt",
  "jpg",
  "png",
  "gif",
  "zip",
];

const generateActivity = () => {
  const action = faker.helpers.arrayElement(actions);
  const hasReceiver = action === "Shared";

  return {
    username: faker.person.fullName(),
    date: faker.date.recent({ days: 30 }).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    action,
    item: `${faker.system.commonFileName()}.${faker.helpers.arrayElement(
      fileExtensions
    )}`,
    fileSize: faker.number.int({ min: 1024, max: 10485760 }),
    receiver: hasReceiver
      ? faker.helpers.arrayElement(receivers.filter((r) => r !== null))
      : undefined,
  };
};

export const generateActivities = (count = 10) => {
  return Array.from({ length: count }, generateActivity);
};

export const generateUserActivities = (username, count = 5) => {
  return Array.from({ length: count }, () => ({
    ...generateActivity(),
    username,
  }));
};

export const generateFiles = (count = 20) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: `${faker.system.commonFileName()}.${faker.helpers.arrayElement(
      fileExtensions
    )}`,
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

export const formatFileSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};
