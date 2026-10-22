const pad = (n) => String(n).padStart(2, "0");

// Data local no formato YYYY-MM-DD (o toISOString usaria UTC)
export const todayKey = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Hora local no formato HH:MM, igual ao valor do <input type="time">
export const nowTime = (d = new Date()) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

// "Terça-feira, 20 de outubro"
export const formatDay = (d = new Date()) => {
  const text = d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  return text.charAt(0).toUpperCase() + text.slice(1);
};
