import dayjs from "dayjs";

export const isOneYearAgo = (timestamp?: string | number) => {
  if (!timestamp || !dayjs(Number(timestamp) * 1000).isValid()) return false;

  const date = dayjs(Number(timestamp) * 1000);
  const yearAgo = dayjs().subtract(1, 'year');

  return date.isBefore(yearAgo);
}