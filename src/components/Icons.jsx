// Ícones em SVG pra não depender de emoji, que muda de aparelho pra aparelho
const Icon = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const IconCheck = (props) => <Icon {...props}><path d="M5 12l5 5L20 7" /></Icon>;
export const IconPlus = (props) => <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
export const IconClose = (props) => <Icon {...props}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
export const IconEdit = (props) => <Icon {...props}><path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" /></Icon>;
export const IconTrash = (props) => (
  <Icon {...props}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></Icon>
);
export const IconClock = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
);
export const IconRepeat = (props) => (
  <Icon {...props}><path d="M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3" /></Icon>
);
export const IconSliders = (props) => (
  <Icon {...props}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></Icon>
);
export const IconSearch = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Icon>
);
