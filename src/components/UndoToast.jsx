import { useEffect } from "react"

// Aviso de remoção com "Desfazer"; some sozinho em 5s
const UndoToast = ({ removed, onUndo, onClose }) => {
  useEffect(() => {
    if (!removed) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [removed, onClose]);

  if (!removed) return null;

  return (
    <div className="toast" role="status">
      <span>Tarefa removida</span>
      <button onClick={onUndo}>Desfazer</button>
    </div>
  )
}

export default UndoToast
