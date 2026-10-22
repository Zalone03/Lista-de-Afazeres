import { useEffect, useState } from "react";

import { isDone } from "../utils/tasks";
import { todayKey } from "../utils/date";

const STORAGE_KEY = "tasks";

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Garante todos os campos, inclusive em tarefas salvas por versões antigas
const normalize = (task) => ({
  id: task.id ?? newId(),
  text: task.text ?? "",
  priority: task.priority ?? "media",
  time: task.time ?? "",
  daily: task.daily ?? false,
  doneOn: task.doneOn ?? (task.done ? todayKey() : null),
  createdAt: task.createdAt ?? Date.now(),
});

// Lê do localStorage; navegação privada ou JSON quebrado viram lista vazia
const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved.map(normalize) : [];
  } catch {
    return [];
  }
};

// Estado das tarefas, salvo no navegador a cada mudança
export function useTasks() {
  const [tasks, setTasks] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // sem storage o app segue funcionando, só não guarda
    }
  }, [tasks]);

  const addTask = (fields) => {
    setTasks((prev) => [...prev, normalize({ ...fields, id: newId(), createdAt: Date.now() })]);
  };

  // Devolve a tarefa removida e a posição dela, pro "Desfazer"
  const deleteTask = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index === -1) return null;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    return { task: tasks[index], index };
  };

  const restoreTask = ({ task, index }) => {
    setTasks((prev) => [...prev.slice(0, index), task, ...prev.slice(index)]);
  };

  const toggleTask = (taskId, today) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, doneOn: isDone(task, today) ? null : today } : task
      )
    );
  };

  const editTask = (taskId, changes) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...changes } : task)));
  };

  // Remove as avulsas concluídas; as diárias ficam, pois reiniciam amanhã
  const clearDone = (today) => {
    setTasks((prev) => prev.filter((task) => task.daily || !isDone(task, today)));
  };

  return { tasks, addTask, deleteTask, restoreTask, toggleTask, editTask, clearDone };
}
