const FILTERS = [
  { id: "todas", label: "Todas" },
  { id: "pendentes", label: "Pendentes" },
  { id: "feitas", label: "Feitas" },
];

// Abas de filtro com a contagem de cada uma
const Filters = ({ value, counts, onChange }) => (
  <nav className="filters" aria-label="Filtrar tarefas">
    {FILTERS.map((f) => (
      <button
        key={f.id}
        className={value === f.id ? "active" : ""}
        aria-pressed={value === f.id}
        onClick={() => onChange(f.id)}
      >
        {f.label}
        <span className="count">{counts[f.id]}</span>
      </button>
    ))}
  </nav>
)

export default Filters
