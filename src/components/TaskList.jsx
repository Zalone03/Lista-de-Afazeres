import Task from "./Task"
import { isDone, isLate } from "../utils/tasks"

const EMPTY_TEXT = {
  todas: "Não há tarefas cadastradas! Adicione a primeira lá embaixo.",
  pendentes: "Nada pendente. Bom trabalho!",
  feitas: "Nenhuma tarefa concluída ainda.",
};

const TaskList = ({tasks, filter, search, clock, onToggleTask, onEditTask, onDeleteTask}) => {

    if(tasks.length === 0) {
        const text = search.trim() ? `Nenhuma tarefa encontrada para "${search.trim()}".` : EMPTY_TEXT[filter];
        return <p className="empty">{text}</p>
    }

    return (
    <ul className="task-list">
        {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              done={isDone(task, clock.today)}
              late={isLate(task, clock.today, clock.time)}
              onToggle={() => onToggleTask(task.id)}
              onEdit={(changes) => onEditTask(task.id, changes)}
              onDelete={() => onDeleteTask(task.id)}
            />
        ))}
    </ul>
  )
}

export default TaskList
