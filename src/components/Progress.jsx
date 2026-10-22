// Quantas tarefas já foram feitas, com barra
const Progress = ({ done, total }) => {
  if (total === 0) return null;
  const percent = Math.round((done / total) * 100);

  return (
    <section className="progress" aria-label="Progresso">
      <div className="progress-info">
        <span>{done === total ? "Tudo feito por hoje!" : `${done} de ${total} concluídas`}</span>
        <strong>{percent}%</strong>
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="Tarefas concluídas"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}

export default Progress
