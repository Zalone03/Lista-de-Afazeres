import { useEffect, useState } from "react";

import { nowTime, todayKey } from "../utils/date";

const read = () => ({ today: todayKey(), time: nowTime() });

// Dia e hora atuais; atualiza a cada 30s e quando o app volta pra frente
export function useClock() {
  const [clock, setClock] = useState(read);

  useEffect(() => {
    const update = () =>
      setClock((prev) => {
        const next = read();
        return next.today === prev.today && next.time === prev.time ? prev : next;
      });

    const timer = setInterval(update, 30000);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return clock;
}
