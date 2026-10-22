import { PRIORITIES, PRIORITY_LABEL } from "../utils/tasks"
import { IconClose } from "./Icons"

// Horário, prioridade e repetição; usado ao criar e ao editar
const TaskOptions = ({ value, onChange }) => {
  const set = (field, fieldValue) => onChange({ ...value, [field]: fieldValue });

  return (
    <div className="task-options">
      <div className="field">
        <span>Horário</span>
        <div className="time-field">
          <input type="time" aria-label="Horário" value={value.time} onChange={(e) => set("time", e.target.value)} />
          {value.time && (
            <button type="button" className="icon-btn" aria-label="Tirar horário" onClick={() => set("time", "")}>
              <IconClose size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="field">
        <span>Prioridade</span>
        <div className="priority-picker">
          {PRIORITIES.map((p) => (
            <button
              type="button"
              key={p}
              className={`chip prio-${p} ${value.priority === p ? "active" : ""}`}
              aria-pressed={value.priority === p}
              onClick={() => set("priority", p)}
            >
              {PRIORITY_LABEL[p]}
            </button>
          ))}
        </div>
      </div>

      <label className="toggle">
        <input type="checkbox" checked={value.daily} onChange={(e) => set("daily", e.target.checked)} />
        <span>Repetir todo dia</span>
      </label>
    </div>
  )
}

export default TaskOptions
