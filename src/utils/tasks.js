export const PRIORITIES = ["alta", "media", "baixa"];
export const PRIORITY_LABEL = { alta: "Alta", media: "Média", baixa: "Baixa" };

// Tarefa diária só conta como feita no dia em que foi marcada
export const isDone = (task, today) => (task.daily ? task.doneOn === today : Boolean(task.doneOn));

// Pendente com horário que já passou
export const isLate = (task, today, time) => !isDone(task, today) && Boolean(task.time) && task.time < time;

// Pendentes primeiro, depois por horário, prioridade e ordem de criação
export const sortTasks = (tasks, today) =>
  [...tasks].sort(
    (a, b) =>
      isDone(a, today) - isDone(b, today) ||
      (a.time || "99:99").localeCompare(b.time || "99:99") ||
      PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority) ||
      a.createdAt - b.createdAt
  );

export const MAX_TEXT = 200;

// Minúsculas e sem acento, pra busca achar "reuniao" em "Reunião"
const simplify = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const matchesSearch = (task, search) => simplify(task.text).includes(simplify(search.trim()));
