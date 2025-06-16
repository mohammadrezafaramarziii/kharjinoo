export function toLocalShortDate(date: Date): string {
  return new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function toLocalLongDate(date: Date): string {
  return new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function toLocalShortTime(time: Date): string {
  return new Date(time).toLocaleTimeString("fa-IR", {
    hour: "numeric",
    minute: "2-digit",
  });
}
