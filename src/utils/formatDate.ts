import { dayjs } from "element-plus";

export function formatDate(date: string | number, format: string): string {
  return dayjs(date).format(format);
}