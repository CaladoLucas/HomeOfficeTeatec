import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import React, { useMemo, useState } from "react";

const App = () => {
  // Inicializa no mês e ano atuais
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  // Configuração dos participantes em Ordem Alfabética para a primeira semana
  const participants = [
    { name: "Arthur", color: "bg-blue-500 text-white" },
    { name: "Caio", color: "bg-orange-500 text-white" },
    { name: "Glauber", color: "bg-emerald-500 text-white" },
    { name: "Lucas", color: "bg-purple-600 text-white" }, // Lucas deve ser Purple
  ];

  const fixedParticipant = {
    name: "Leandro",
    color: "bg-slate-600 text-white",
  };

  // Função para gerar eventos do ano inteiro
  const events = useMemo(() => {
    const allEvents = {};
    const startYear = 2026;

    // Data de início do projeto: Próxima semana (considerando data atual simulada 19/02/2026 -> Prox Seg é 23/02/2026)
    // Vamos fixar o início na Segunda-feira, 23 de Fevereiro de 2026
    let d = new Date(2026, 1, 23); // Mês 1 é Fevereiro

    // Índice da semana para controle de rotação
    let weekIndex = 0;

    // Loop para preencher o ano
    while (d.getFullYear() <= 2026) {
      // Gera os dias da semana (Segunda a Quinta)
      // Lógica: Para garantir que quem fez Segunda faça Quinta na próxima, e ordem alfabética na primeira,
      // usamos uma janela deslizante sobre o array ordenado.
      // Semana 0: Seg(A), Ter(C), Qua(G), Qui(L)
      // Semana 1: Seg(C), Ter(G), Qua(L), Qui(A) -> Note que A (Seg Sem0) virou Qui Sem1. Regra atendida.

      for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
        // dayOffset 0 = Segunda, 1 = Terça, 2 = Quarta, 3 = Quinta
        const currentPerson =
          participants[(weekIndex + dayOffset) % participants.length];

        // Clona a data base (Segunda) e adiciona o offset
        const currentDayDate = new Date(d);
        currentDayDate.setDate(d.getDate() + dayOffset);

        const dateStr = currentDayDate.toISOString().split("T")[0];
        if (!allEvents[dateStr]) allEvents[dateStr] = [];
        allEvents[dateStr].push(currentPerson);
      }

      // 3. Adicionar Leandro na Sexta-feira desta semana
      const friday = new Date(d);
      friday.setDate(d.getDate() + 4); // Segunda + 4 dias = Sexta
      const fridayStr = friday.toISOString().split("T")[0];

      // Verifica se ainda é 2026 (ou continua para não quebrar a logica visual)
      if (!allEvents[fridayStr]) allEvents[fridayStr] = [];
      allEvents[fridayStr].push(fixedParticipant);

      // Avançar para a próxima segunda-feira
      d.setDate(d.getDate() + 7);
      weekIndex++;
    }

    return allEvents;
  }, []);

  // Navegação
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Gerar dias do mês atual para exibição
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Dias vazios do mês anterior
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const currentDays = getDaysInMonth(currentDate);

  // Encontrar a linha (semana) do dia atual para destacar
  const todayStr = new Date().toDateString();
  const todayIndex = currentDays.findIndex(
    (date) => date && date.toDateString() === todayStr,
  );
  const currentWeekRow = todayIndex !== -1 ? Math.floor(todayIndex / 7) : -1;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header Estilo Google Calendar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600">
            <CalendarIcon className="w-8 h-8" />
            <h1 className="text-2xl font-semibold text-gray-700 hidden sm:block">
              Escala Home Office
            </h1>
          </div>
          <div className="flex items-center gap-2 ml-4 md:ml-8">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-medium text-gray-800 min-w-[200px] ml-2">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
        </div>

        {/* Legenda Desktop */}
        <div className="hidden lg:flex items-center gap-3 text-sm">
          {[...participants, fixedParticipant].map((p) => (
            <div key={p.name} className="flex items-center gap-1.5">
              <div
                className={`w-3 h-3 rounded-full ${p.color.split(" ")[0]}`}
              ></div>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Legenda Mobile */}
        <div className="lg:hidden flex flex-wrap gap-2 mb-4 text-xs">
          {[...participants, fixedParticipant].map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm"
            >
              <div
                className={`w-2 h-2 rounded-full ${p.color.split(" ")[0]}`}
              ></div>
              <span>{p.name}</span>
            </div>
          ))}
        </div>

        {/* Grid do Calendário */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {/* Cabeçalho dos dias */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dias */}
          <div className="grid grid-cols-7 auto-rows-fr bg-gray-200 gap-px border-b border-gray-200">
            {currentDays.map((date, index) => {
              // Verifica se este dia pertence à mesma linha da semana atual
              const isCurrentWeekRow =
                currentWeekRow !== -1 &&
                Math.floor(index / 7) === currentWeekRow;

              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className={`min-h-[100px] md:min-h-[140px] transition-colors ${isCurrentWeekRow ? "bg-blue-50/40" : "bg-gray-50"}`}
                  ></div>
                );
              }

              const dateStr = date.toISOString().split("T")[0];
              const dayEvents = events[dateStr] || [];
              const isToday = new Date().toDateString() === date.toDateString();

              // Definindo as cores e destaques
              let bgClass = isCurrentWeekRow
                ? "bg-blue-50/40 hover:bg-blue-100/50"
                : "bg-white hover:bg-gray-50";
              if (isToday) {
                bgClass =
                  "bg-blue-100/60 ring-2 ring-inset ring-blue-400 hover:bg-blue-100/80";
              }

              return (
                <div
                  key={dateStr}
                  className={`min-h-[100px] md:min-h-[140px] p-2 flex flex-col transition-colors ${bgClass}`}
                >
                  <div className="flex justify-center mb-2">
                    <span
                      className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-blue-600 text-white shadow-sm" : "text-gray-700"}`}
                    >
                      {date.getDate()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 overflow-y-auto">
                    {dayEvents.map((evt, i) => (
                      <div
                        key={i}
                        className={`text-xs px-2 py-1 rounded-md shadow-sm truncate font-medium ${evt.color} animate-in fade-in zoom-in duration-300`}
                        title={`Home Office: ${evt.name}`}
                      >
                        {evt.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Regras da Escala
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-gray-600 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                  Início
                </span>
                <span>
                  Projeto começa dia <strong>23 de Fev, 2026</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                  Fixo
                </span>
                <span>
                  <strong>Leandro</strong> sempre às sextas-feiras.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                  Semana 1
                </span>
                <span>
                  Ordem Alfabética: Arthur (Seg), Caio (Ter), Glauber (Qua),
                  Lucas (Qui).
                </span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-600 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                  Lógica
                </span>
                <span>
                  A escala "roda" um dia por semana. Quem fez{" "}
                  <strong>Segunda</strong> nessa semana, fará{" "}
                  <strong>Quinta</strong> na próxima.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                  Equilíbrio
                </span>
                <span>
                  Todos fazem exatamente 1 dia de Home Office por semana (Seg a
                  Qui).
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
