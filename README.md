# Lista de Afazeres

Aplicação de lista de tarefas feita com **React** e **Vite**, pensada para funcionar bem no celular e no computador. As tarefas ficam salvas no próprio navegador (`localStorage`), sem precisar de servidor.

## Funcionalidades

- Adicionar, editar e remover tarefas
- Marcar e desmarcar tarefas como concluídas
- Desfazer a remoção de uma tarefa (aviso aparece por 5 segundos)
- Prioridade (alta, média ou baixa) e horário opcional
- Aviso de tarefa **atrasada** quando o horário já passou
- Tarefas **diárias**, que voltam a ficar pendentes no dia seguinte
- Busca pelo texto da tarefa (ignora maiúsculas e acentos)
- Filtros: todas, pendentes e feitas, com contagem
- Barra de progresso do dia
- Limpar as tarefas concluídas de uma vez
- Modo escuro automático, seguindo o sistema
- Pode ser instalado na tela inicial do celular (manifest PWA)

## Como rodar

Precisa do [Node.js](https://nodejs.org/) instalado.

```bash
npm install
```

```bash
npm run dev
```

Depois é só abrir o endereço que aparece no terminal (normalmente `http://localhost:5173`).

### Outros comandos

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm run build`   | Gera a versão de produção na pasta `dist`  |
| `npm run preview` | Serve a versão gerada pelo `build`         |
| `npm run lint`    | Verifica o código com o ESLint             |

## Atalhos

- **Enter** adiciona a tarefa ou salva a edição
- **Esc** cancela a edição ou limpa a busca
- **Clique duplo** no texto da tarefa abre a edição

## Estrutura

```
src/
├── App.jsx              # Tela principal: junta tudo e aplica filtro/busca
├── components/
│   ├── Filters.jsx      # Abas Todas / Pendentes / Feitas
│   ├── Icons.jsx        # Ícones em SVG
│   ├── Progress.jsx     # Barra de progresso
│   ├── SearchBar.jsx    # Campo de busca
│   ├── Task.jsx         # Uma tarefa (visualização e edição)
│   ├── TaskInput.jsx    # Barra de adicionar, presa no rodapé
│   ├── TaskList.jsx     # Lista e mensagens de lista vazia
│   ├── TaskOptions.jsx  # Horário, prioridade e repetição
│   └── UndoToast.jsx    # Aviso de "Desfazer"
├── hooks/
│   ├── useClock.js      # Data e hora atuais, atualizadas sozinhas
│   └── useTasks.js      # Estado das tarefas + salvar no localStorage
└── utils/
    ├── date.js          # Formatação de data e hora
    └── tasks.js         # Regras: concluída, atrasada, ordenação, busca
```

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org/)
