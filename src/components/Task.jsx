import { useState } from 'react'

import TaskOptions from './TaskOptions'
import { IconCheck, IconClock, IconEdit, IconRepeat, IconTrash } from './Icons'
import { MAX_TEXT, PRIORITY_LABEL } from '../utils/tasks'

const pickOptions = (task) => ({ priority: task.priority, time: task.time, daily: task.daily });

const Task = ({task, done, late, onToggle, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [options, setOptions] = useState(pickOptions(task));

  const startEdit = () => {
    setText(task.text);
    setOptions(pickOptions(task));
    setEditing(true);
  };

  // Texto vazio não salva; o resto vai junto com as opções
  const save = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onEdit({ text: text.trim(), ...options });
    setEditing(false);
  };

  if (editing) {
    return (
      <li className={`task editing prio-${task.priority}`}>
        <form className="edit-form" onSubmit={save} onKeyDown={(e) => e.key === "Escape" && setEditing(false)}>
          <input
            type="text"
            value={text}
            autoFocus
            aria-label="Texto da tarefa"
            maxLength={MAX_TEXT}
            onChange={(e) => setText(e.target.value)}
          />
          <TaskOptions value={options} onChange={setOptions} />
          <div className="edit-actions">
            <button type="button" className="btn-ghost" onClick={() => setEditing(false)}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={!text.trim()}>Salvar</button>
          </div>
        </form>
      </li>
    );
  }

  return (
  <li className={`task prio-${task.priority} ${done ? "done" : ""}`}>
    <button
      className="check"
      role="checkbox"
      aria-checked={done}
      aria-label={done ? "Desmarcar tarefa" : "Concluir tarefa"}
      onClick={onToggle}
    >
      <span>{done && <IconCheck size={16} />}</span>
    </button>

    <div className="task-body">
      <p className="task-text" title="Clique duas vezes para editar" onDoubleClick={startEdit}>{task.text}</p>
      {(task.time || task.daily || task.priority !== "media") && (
        <div className="task-meta">
          {task.time && (
            <span className={`tag ${late ? "late" : ""}`}>
              <IconClock size={14} /> {task.time}{late && " · atrasada"}
            </span>
          )}
          {task.daily && <span className="tag"><IconRepeat size={14} /> Todo dia</span>}
          {task.priority !== "media" && (
            <span className={`tag tag-${task.priority}`}>{PRIORITY_LABEL[task.priority]}</span>
          )}
        </div>
      )}
    </div>

    <div className="task-actions">
      <button className="icon-btn" aria-label="Editar" onClick={startEdit}><IconEdit size={18} /></button>
      <button className="icon-btn danger" aria-label="Remover" onClick={onDelete}><IconTrash size={18} /></button>
    </div>
  </li>
  )
}

export default Task
