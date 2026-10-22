import { useRef, useState } from 'react'

import TaskOptions from './TaskOptions'
import { IconPlus, IconSliders } from './Icons'
import { MAX_TEXT } from '../utils/tasks'

const DEFAULT_OPTIONS = { priority: "media", time: "", daily: false };

// Barra fixa no rodapé, ao alcance do polegar no celular
const TaskInput = ({onAddTask}) => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()

    if(input.trim()){
        onAddTask({ text: input.trim(), ...options });
        setInput("");
        setOptions(DEFAULT_OPTIONS);
        setShowOptions(false);
        // mantém o teclado aberto pra emendar outra tarefa
        inputRef.current?.focus();
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
        {showOptions && <TaskOptions value={options} onChange={setOptions} />}

        <div className="composer-row">
          <button
            type="button"
            className={`btn-options ${showOptions ? "active" : ""}`}
            aria-label="Mais opções"
            aria-expanded={showOptions}
            onClick={() => setShowOptions(!showOptions)}
          >
            <IconSliders />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Adicione uma nova tarefa"
            aria-label="Nova tarefa"
            enterKeyHint="done"
            maxLength={MAX_TEXT}
            value={input}
            onChange={(e)=> setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary btn-add" aria-label="Adicionar" disabled={!input.trim()}>
            <IconPlus />
          </button>
        </div>
    </form>
  )
}

export default TaskInput
