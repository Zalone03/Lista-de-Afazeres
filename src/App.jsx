import { useCallback, useState } from "react";

import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import Filters from "./components/Filters"
import Progress from "./components/Progress"
import SearchBar from "./components/SearchBar"
import UndoToast from "./components/UndoToast"
import { useTasks } from "./hooks/useTasks"
import { useClock } from "./hooks/useClock"
import { isDone, matchesSearch, sortTasks } from "./utils/tasks"
import { formatDay } from "./utils/date"

function App() {

  const clock = useClock();
  const { tasks, addTask, deleteTask, restoreTask, toggleTask, editTask, clearDone } = useTasks();
  const [filter, setFilter] = useState("todas");
  const [search, setSearch] = useState("");
  const [removed, setRemoved] = useState(null);

  const doneCount = tasks.filter((task) => isDone(task, clock.today)).length;
  const counts = { todas: tasks.length, pendentes: tasks.length - doneCount, feitas: doneCount };
  const hasClearable = tasks.some((task) => !task.daily && isDone(task, clock.today));

  const visibleTasks = sortTasks(
    tasks.filter((task) => {
      if (!matchesSearch(task, search)) return false;
      if (filter === "pendentes") return !isDone(task, clock.today);
      if (filter === "feitas") return isDone(task, clock.today);
      return true;
    }),
    clock.today
  );

  const handleDelete = (taskId) => {
    setRemoved(deleteTask(taskId));
  };

  const handleUndo = () => {
    restoreTask(removed);
    setRemoved(null);
  };

  const closeToast = useCallback(() => setRemoved(null), []);

  const handleClearDone = () => {
    if (window.confirm("Remover as tarefas avulsas concluídas? As diárias continuam.")) {
      clearDone(clock.today);
    }
  };

  return (
    <main className="app">
      <header className="header">
        <p className="header-date">{formatDay(new Date(`${clock.today}T00:00`))}</p>
        <h1>Lista de Afazeres</h1>
      </header>

      <Progress done={doneCount} total={tasks.length} />
      {tasks.length > 0 && (
        <>
          <SearchBar value={search} onChange={setSearch} />
          <Filters value={filter} counts={counts} onChange={setFilter} />
        </>
      )}

      <TaskList
        tasks={visibleTasks}
        filter={filter}
        search={search}
        clock={clock}
        onToggleTask={(taskId) => toggleTask(taskId, clock.today)}
        onEditTask={editTask}
        onDeleteTask={handleDelete}
      />

      {hasClearable && (
        <div className="list-footer">
          <button className="btn-link" onClick={handleClearDone}>Limpar concluídas</button>
        </div>
      )}

      <TaskInput onAddTask={addTask}/>
      <UndoToast removed={removed} onUndo={handleUndo} onClose={closeToast} />
    </main>
  )
}

export default App
