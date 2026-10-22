import { IconClose, IconSearch } from './Icons'

// Campo de busca pelo texto da tarefa
const SearchBar = ({ value, onChange }) => (
  <div className="search">
    <IconSearch size={18} />
    <input
      type="search"
      placeholder="Buscar tarefa"
      aria-label="Buscar tarefa"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Escape" && onChange("")}
    />
    {value && (
      <button type="button" className="icon-btn" aria-label="Limpar busca" onClick={() => onChange("")}>
        <IconClose size={16} />
      </button>
    )}
  </div>
)

export default SearchBar
