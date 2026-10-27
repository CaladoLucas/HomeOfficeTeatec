(function () {
  "use strict";

  const { createElement: h, useMemo, useState } = React;

  function triggerConfetti(origin) {
    if (typeof window !== "undefined" && typeof window.confetti === "function") {
      try {
        window.confetti({
          particleCount: 60,
          spread: 70,
          origin: origin || { y: 0.6 },
          colors: [
            "#E40303",
            "#FF8C00",
            "#FFED00",
            "#008026",
            "#004DFF",
            "#750787",
            "#FF1493",
            "#00FFFF",
            "#FFD700",
          ],
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }
    }
  }

  function triggerSuperCarnavalConfetti() {
    if (typeof window !== "undefined" && typeof window.confetti === "function") {
      try {
        const count = 220;
        const defaults = {
          origin: { y: 0.65 },
          colors: [
            "#E40303",
            "#FF8C00",
            "#FFED00",
            "#008026",
            "#004DFF",
            "#750787",
            "#FF1493",
            "#00FFFF",
            "#FFD700",
          ],
        };

        function fire(particleRatio, opts) {
          window.confetti(
            Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio),
            })
          );
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch (e) {
        console.warn("Confetti error", e);
      }
    }
  }

  function IconPrideCalendar(props) {
    return h(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          width: 24,
          height: 24,
          fill: "none",
        },
        props
      ),
      h(
        "defs",
        null,
        h(
          "clipPath",
          { id: "app-pride-cal-body" },
          h("rect", { x: "2.5", y: "3.5", width: "19", height: "18", rx: "3.5" })
        ),
        h(
          "linearGradient",
          { id: "app-cal-header-shade", x1: "0", y1: "0", x2: "0", y2: "1" },
          h("stop", { offset: "0%", stopColor: "#000000", stopOpacity: "0.14" }),
          h("stop", { offset: "100%", stopColor: "#000000", stopOpacity: "0.06" })
        )
      ),
      h(
        "g",
        { clipPath: "url(#app-pride-cal-body)" },
        h("rect", { x: "2", y: "3.5", width: "20", height: "3", fill: "#E40303" }),
        h("rect", { x: "2", y: "6.5", width: "20", height: "3", fill: "#FF8C00" }),
        h("rect", { x: "2", y: "9.5", width: "20", height: "3", fill: "#FFED00" }),
        h("rect", { x: "2", y: "12.5", width: "20", height: "3", fill: "#008026" }),
        h("rect", { x: "2", y: "15.5", width: "20", height: "3", fill: "#004DFF" }),
        h("rect", { x: "2", y: "18.5", width: "20", height: "3", fill: "#750787" }),
        h("rect", { x: "2", y: "3.5", width: "20", height: "5.5", fill: "url(#app-cal-header-shade)" }),
        h("line", {
          x1: "2",
          y1: "9",
          x2: "22",
          y2: "9",
          stroke: "rgba(255,255,255,0.45)",
          strokeWidth: "0.6",
          strokeLinecap: "round",
        }),
        h(
          "g",
          {
            fill: "#FFFFFF",
            fillOpacity: "0.95",
            stroke: "rgba(15,23,42,0.18)",
            strokeWidth: "0.35",
          },
          h("rect", { x: "4.8", y: "11.2", width: "3.8", height: "3.2", rx: "0.8" }),
          h("rect", { x: "10.1", y: "11.2", width: "3.8", height: "3.2", rx: "0.8" }),
          h("rect", { x: "15.4", y: "11.2", width: "3.8", height: "3.2", rx: "0.8" }),
          h("rect", { x: "4.8", y: "16.0", width: "3.8", height: "3.2", rx: "0.8" }),
          h("rect", { x: "10.1", y: "16.0", width: "3.8", height: "3.2", rx: "0.8" }),
          h("rect", { x: "15.4", y: "16.0", width: "3.8", height: "3.2", rx: "0.8" })
        )
      ),
      h("rect", {
        x: "2.5",
        y: "3.5",
        width: "19",
        height: "18",
        rx: "3.5",
        fill: "none",
        stroke: "rgba(15,23,42,0.2)",
        strokeWidth: "0.75",
      }),
      h("rect", {
        x: "6.5",
        y: "1.5",
        width: "2.2",
        height: "4.2",
        rx: "1.1",
        fill: "#FFFFFF",
        stroke: "#334155",
        strokeWidth: "0.6",
      }),
      h("rect", {
        x: "15.3",
        y: "1.5",
        width: "2.2",
        height: "4.2",
        rx: "1.1",
        fill: "#FFFFFF",
        stroke: "#334155",
        strokeWidth: "0.6",
      })
    );
  }

  const IconCalendar = IconPrideCalendar;

  function IconChevronLeft(props) {
    return h(
      "svg",
      Object.assign(
        { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
        props
      ),
      h("path", { d: "m15 18-6-6 6-6" })
    );
  }

  function IconChevronRight(props) {
    return h(
      "svg",
      Object.assign(
        { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
        props
      ),
      h("path", { d: "m9 18 6-6-6-6" })
    );
  }

  const PARTICIPANT_THEMES = {
    Arthur: {
      classic: {
        name: "Arthur",
        badgeColor: "bg-blue-500 text-white",
        dotColor: "bg-blue-500",
        barColor: "bg-blue-500",
        crown: "👑",
        role: "Arthur",
      },
      diva: {
        name: "👑 Arthur",
        role: "Arthur Imperatriz",
        badgeColor: "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-sm shadow-blue-500/25 border border-blue-300/40 font-semibold tracking-wide",
        dotColor: "bg-gradient-to-r from-blue-500 to-cyan-400 ring-1 ring-blue-300",
        barColor: "bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400",
        crown: "👑",
        glow: "hover:shadow-blue-400/40",
      },
    },
    Glauber: {
      classic: {
        name: "Glauber",
        badgeColor: "bg-emerald-500 text-white",
        dotColor: "bg-emerald-500",
        barColor: "bg-emerald-500",
        crown: "💅",
        role: "Glauber",
      },
      diva: {
        name: "💅 Glauber",
        role: "Glauber Afrontosa",
        badgeColor: "bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-400 text-white shadow-sm shadow-emerald-500/25 border border-emerald-300/40 font-semibold tracking-wide",
        dotColor: "bg-gradient-to-r from-emerald-500 to-lime-400 ring-1 ring-emerald-300",
        barColor: "bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-400",
        crown: "💅",
        glow: "hover:shadow-emerald-400/40",
      },
    },
    Lucas: {
      classic: {
        name: "Lucas",
        badgeColor: "bg-purple-600 text-white",
        dotColor: "bg-purple-600",
        barColor: "bg-purple-600",
        crown: "🪩",
        role: "Lucas",
      },
      diva: {
        name: "🪩 Lucas",
        role: "Lucas Disco Queen",
        badgeColor: "bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 text-white shadow-sm shadow-fuchsia-500/25 border border-pink-300/40 font-semibold tracking-wide",
        dotColor: "bg-gradient-to-r from-purple-600 to-pink-500 ring-1 ring-pink-300",
        barColor: "bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500",
        crown: "🪩",
        glow: "hover:shadow-fuchsia-400/40",
      },
    },
    Leandro: {
      classic: {
        name: "Leandro",
        badgeColor: "bg-slate-600 text-white",
        dotColor: "bg-slate-600",
        barColor: "bg-slate-600",
        crown: "🎭",
        role: "Leandro",
      },
      diva: {
        name: "🎭 Leandro",
        role: "Drama Queen Absoluta",
        badgeColor: "bg-gradient-to-r from-fuchsia-800 via-purple-700 to-rose-600 text-white shadow-sm shadow-purple-600/25 border border-purple-300/40 font-semibold tracking-wide",
        dotColor: "bg-gradient-to-r from-fuchsia-800 to-rose-600 ring-1 ring-purple-300",
        barColor: "bg-gradient-to-r from-fuchsia-800 via-purple-700 to-rose-600",
        crown: "🎭",
        glow: "hover:shadow-purple-400/40",
      },
    },
  };

  function getParticipantTheme(name, isDivaMode) {
    const p = PARTICIPANT_THEMES[name];
    if (!p) {
      return {
        name: name,
        badgeColor: "bg-gray-600 text-white",
        dotColor: "bg-gray-600",
        barColor: "bg-gray-600",
        crown: "✨",
        role: name,
      };
    }
    return isDivaMode ? p.diva : p.classic;
  }

  const participants = [
    { name: "Arthur", color: "bg-blue-500 text-white" },
    { name: "Glauber", color: "bg-emerald-500 text-white" },
    { name: "Lucas", color: "bg-purple-600 text-white" },
  ];

  // Lógica antiga (anterior à data de corte).
  const rotationPattern = [
    { name: "Arthur", color: "bg-blue-500 text-white" },
    null,
    { name: "Glauber", color: "bg-emerald-500 text-white" },
    { name: "Lucas", color: "bg-purple-600 text-white" },
  ];

  // A regra nova de rodízio vale só a partir desta segunda; antes disso vale a escala antiga.
  const NEW_RULE_START = new Date(2026, 9, 19);

  const fixedParticipant = { name: "Leandro", color: "bg-slate-600 text-white" };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const DIVA_HEADER_COLORS = [
    "text-pink-500 bg-pink-50/70 border-b-2 border-pink-400",
    "text-red-600 bg-red-50/70 border-b-2 border-red-500",
    "text-orange-600 bg-orange-50/70 border-b-2 border-orange-500",
    "text-amber-600 bg-amber-50/70 border-b-2 border-amber-500",
    "text-emerald-600 bg-emerald-50/70 border-b-2 border-emerald-500",
    "text-blue-600 bg-blue-50/70 border-b-2 border-blue-500",
    "text-purple-600 bg-purple-50/70 border-b-2 border-purple-500",
  ];

  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }

  function App() {
    const [currentDate, setCurrentDate] = useState(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    );

    const [isDivaMode, setIsDivaMode] = useState(function () {
      try {
        const saved = localStorage.getItem("homeoffice_theme_diva");
        if (saved !== null) {
          return saved === "true";
        }
      } catch (e) {}
      return true;
    });


    const toggleDivaMode = function () {
      setIsDivaMode(function (prev) {
        const next = !prev;
        try {
          localStorage.setItem("homeoffice_theme_diva", String(next));
        } catch (e) {}
        if (next) {
          triggerSuperCarnavalConfetti();
        }
        return next;
      });
    };

    const events = useMemo(function () {
      const allEvents = {};
      // Regra: seg-qui = rodízio contínuo Glauber, Lucas, Arthur (um por dia, sem reiniciar entre semanas).
      // Sexta = Leandro sempre. Âncora: segunda 19/10/2026 = Glauber.
      // Dia sem home office (noHomeOfficeDates) fica vazio, mas conta no rodízio (a ordem segue o calendário).
      const order = [
        { name: "Glauber", color: "bg-emerald-500 text-white" },
        { name: "Lucas", color: "bg-purple-600 text-white" },
        { name: "Arthur", color: "bg-blue-500 text-white" },
      ];
      const anchor = NEW_RULE_START;
      const extraDays = { Arthur: 0, Glauber: 0, Lucas: 0 };
      const fillStart = new Date(2026, 9, 12);
      const noHomeOfficeDates = ["2026-10-13"];
      const dayMs = 24 * 3600 * 1000;
      let d = new Date(2026, 1, 23);
      let weekIndex = 0;
      while (d.getFullYear() <= 2026) {
        const weeks = Math.round((d - anchor) / (7 * dayMs));
        if (d < NEW_RULE_START) {
          for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
            const skipDate = new Date(d);
            skipDate.setDate(d.getDate() + dayOffset);
            if (noHomeOfficeDates.includes(skipDate.toISOString().split("T")[0])) continue;
            let currentPerson = rotationPattern[(weekIndex + dayOffset) % rotationPattern.length];
            if (!currentPerson && d >= fillStart) {
              const previousPerson = dayOffset > 0
                ? rotationPattern[(weekIndex + dayOffset - 1) % rotationPattern.length]
                : null;
              const nextPerson = dayOffset < 3
                ? rotationPattern[(weekIndex + dayOffset + 1) % rotationPattern.length]
                : fixedParticipant;
              const eligible = participants.filter(function (person) {
                return person.name !== (previousPerson && previousPerson.name) &&
                  person.name !== (nextPerson && nextPerson.name);
              });
              currentPerson = eligible.reduce(function (selected, person) {
                return extraDays[person.name] < extraDays[selected.name] ? person : selected;
              });
              extraDays[currentPerson.name]++;
            }
            if (currentPerson) {
              const currentDayDate = new Date(d);
              currentDayDate.setDate(d.getDate() + dayOffset);
              const dateStr = currentDayDate.toISOString().split("T")[0];
              if (!allEvents[dateStr]) allEvents[dateStr] = [];
              allEvents[dateStr].push(currentPerson);
            }
          }
        } else {
          for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
            const day = new Date(d);
            day.setDate(d.getDate() + dayOffset);
            const dateStr = day.toISOString().split("T")[0];
            if (noHomeOfficeDates.includes(dateStr)) continue;
            const idx = weeks * 4 + dayOffset;
            const person = order[((idx % 3) + 3) % 3];
            if (!allEvents[dateStr]) allEvents[dateStr] = [];
            allEvents[dateStr].push(person);
          }
        }
        const friday = new Date(d);
        friday.setDate(d.getDate() + 4);
        const fridayStr = friday.toISOString().split("T")[0];
        if (!allEvents[fridayStr]) allEvents[fridayStr] = [];
        allEvents[fridayStr].push(fixedParticipant);
        d.setDate(d.getDate() + 7);
        weekIndex++;
      }
      return allEvents;
    }, []);

    const prevMonth = function () {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
    const nextMonth = function () {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const currentDays = getDaysInMonth(currentDate);
    const todayStr = new Date().toDateString();
    const todayIndex = currentDays.findIndex(function (date) {
      return date && date.toDateString() === todayStr;
    });
    const currentWeekRow = todayIndex !== -1 ? Math.floor(todayIndex / 7) : -1;


    return h(
      "div",
      {
        className:
          "h-full flex flex-col font-sans transition-colors duration-300 " +
          (isDivaMode
            ? "bg-gradient-to-b from-pink-50/25 via-purple-50/20 to-gray-50 text-gray-800"
            : "bg-gray-50 text-gray-800"),
      },
      // Header
      h(
        "header",
        {
          className:
            "border-b px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-sm transition-colors duration-300 " +
            (isDivaMode
              ? "bg-white/95 backdrop-blur border-pink-200/90 shadow-pink-100/40"
              : "bg-white border-gray-200"),
        },
        // Lado Esquerdo: Logo LGBT + Título + Subtítulo/Badge
        h(
          "div",
          { className: "flex items-center gap-3 sm:gap-4" },
          h(IconPrideCalendar, {
            className:
              "w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm flex-shrink-0 transition-transform " +
              (isDivaMode ? "animate-pulse" : ""),
          }),
          h(
            "div",
            { className: "flex flex-col" },
            h(
              "h1",
              {
                className:
                  "text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5 " +
                  (isDivaMode
                    ? "bg-gradient-to-r from-pink-500 via-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent"
                    : "text-gray-800"),
              },
              "Escala Home Office",
              isDivaMode ? h("span", { className: "text-lg select-none" }, "🪩✨") : null
            ),
            isDivaMode
              ? h(
                  "span",
                  {
                    className:
                      "inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-xs w-fit mt-0.5",
                  },
                  "Shantay, You Stay (Em Casa)! 🪩✨"
                )
              : h(
                  "span",
                  { className: "text-xs text-gray-500 mt-0.5" },
                  "Planejamento semanal de Home Office 💼"
                )
          )
        ),
        // Centro: Navegação de Mês
        h(
          "div",
          { className: "flex items-center gap-1 sm:gap-2" },
          h(
            "button",
            {
              onClick: prevMonth,
              className:
                "p-2 rounded-full transition-colors cursor-pointer " +
                (isDivaMode
                  ? "hover:bg-pink-100 text-purple-700"
                  : "hover:bg-gray-100 text-gray-600"),
              title: "Mês Anterior",
            },
            h(IconChevronLeft, { className: "w-5 h-5" })
          ),
          h(
            "button",
            {
              onClick: nextMonth,
              className:
                "p-2 rounded-full transition-colors cursor-pointer " +
                (isDivaMode
                  ? "hover:bg-pink-100 text-purple-700"
                  : "hover:bg-gray-100 text-gray-600"),
              title: "Próximo Mês",
            },
            h(IconChevronRight, { className: "w-5 h-5" })
          ),
          h(
            "h2",
            {
              className:
                "text-base sm:text-lg font-bold min-w-[150px] sm:min-w-[180px] text-center " +
                (isDivaMode ? "text-purple-950" : "text-gray-800"),
            },
            monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear()
          )
        ),
        // Lado Direito: Ações & Legenda
        h(
          "div",
          { className: "flex items-center gap-2 sm:gap-3 flex-wrap" },
          // Legenda Desktop
          h(
            "div",
            { className: "hidden xl:flex items-center gap-2 text-xs font-medium" },
            [...participants, fixedParticipant].map(function (p) {
              const pTheme = getParticipantTheme(p.name, isDivaMode);
              return h(
                "div",
                {
                  key: p.name,
                  className:
                    "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all cursor-pointer " +
                    (isDivaMode
                      ? "bg-white/80 border-pink-200/80 hover:bg-white hover:scale-105 shadow-xs"
                      : "bg-gray-50 border-gray-200"),
                  onClick: function () {
                    triggerConfetti();
                  },
                  title: isDivaMode ? pTheme.role : p.name,
                },
                h("div", { className: "w-2.5 h-2.5 rounded-full " + pTheme.dotColor }),
                h("span", { className: "font-semibold" }, pTheme.name)
              );
            })
          ),
          // Botão Jogar Confete
          h(
            "button",
            {
              onClick: triggerSuperCarnavalConfetti,
              className: isDivaMode
                ? "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-white/30"
                : "px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer",
              title: "Explosão carnavalesca de confetes arco-íris!",
            },
            h("span", { className: "text-base" }, "🎉"),
            h("span", { className: "hidden sm:inline" }, "Jogar Confete"),
            h("span", { className: "sm:hidden" }, "Confete")
          ),
          // Botão Alternar Modo
          h(
            "button",
            {
              onClick: toggleDivaMode,
              className: isDivaMode
                ? "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 text-white shadow-md shadow-fuchsia-500/30 hover:scale-105 active:scale-95 ring-2 ring-pink-300 transition-all flex items-center gap-1.5 cursor-pointer border border-white/40"
                : "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer",
              title: isDivaMode
                ? "Alternar para Modo Clássico 💼"
                : "Alternar para Modo Diva 🪩✨",
            },
            isDivaMode ? "Modo Diva 🪩✨" : "Modo Clássico 💼"
          )
        )
      ),
      // Conteúdo Principal
      h(
        "main",
        { className: "flex-1 flex flex-col min-h-0 p-2 sm:p-4 overflow-y-auto gap-3" },
        // Legenda Mobile
        h(
          "div",
          { className: "xl:hidden flex flex-wrap gap-1.5 text-xs flex-shrink-0" },
          [...participants, fixedParticipant].map(function (p) {
            const pTheme = getParticipantTheme(p.name, isDivaMode);
            return h(
              "div",
              {
                key: p.name,
                onClick: function () {
                  triggerConfetti();
                },
                className:
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-xs cursor-pointer " +
                  (isDivaMode
                    ? "bg-white border-pink-200 text-purple-900 hover:bg-pink-50/50"
                    : "bg-white border-gray-200 text-gray-700"),
              },
              h("div", { className: "w-2 h-2 rounded-full " + pTheme.dotColor }),
              h("span", { className: "font-semibold" }, pTheme.name)
            );
          })
        ),
        // Calendário Grid Container
        h(
          "div",
          {
            className:
              "flex-1 flex flex-col min-h-[460px] bg-white rounded-xl shadow-sm border overflow-hidden " +
              (isDivaMode ? "border-pink-200/80 shadow-pink-100/50" : "border-gray-200"),
          },
          // Cabeçalho dos Dias da Semana
          h(
            "div",
            { className: "grid grid-cols-7 border-b border-gray-200 flex-shrink-0" },
            daysOfWeek.map(function (day, dayIndex) {
              const headerClass = isDivaMode
                ? "py-2.5 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 " +
                  DIVA_HEADER_COLORS[dayIndex]
                : "py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-white";

              return h("div", { key: day, className: headerClass }, day);
            })
          ),
          // Células do Calendário
          h(
            "div",
            {
              className:
                "flex-1 grid grid-cols-7 auto-rows-fr min-h-0 gap-px " +
                (isDivaMode ? "bg-pink-100/60" : "bg-gray-200"),
            },
            currentDays.map(function (date, index) {
              const isCurrentWeekRow =
                currentWeekRow !== -1 && Math.floor(index / 7) === currentWeekRow;

              if (!date) {
                return h("div", {
                  key: "empty-" + index,
                  className:
                    "min-h-0 transition-colors " +
                    (isDivaMode
                      ? (isCurrentWeekRow ? "bg-purple-50/30" : "bg-pink-50/15")
                      : (isCurrentWeekRow ? "bg-blue-50/40" : "bg-gray-50")),
                });
              }

              const dateStr = date.toISOString().split("T")[0];
              const dayEvents = events[dateStr] || [];
              const isToday = new Date().toDateString() === date.toDateString();
              const hasEvents = dayEvents.length > 0;

              let bgClass = "";
              if (isDivaMode) {
                if (isToday) {
                  bgClass =
                    "bg-gradient-to-br from-pink-50/90 via-purple-50/80 to-amber-50/80 ring-2 ring-inset ring-pink-400 shadow-inner";
                } else if (isCurrentWeekRow) {
                  bgClass = "bg-gradient-to-r from-purple-50/40 via-pink-50/30 to-blue-50/30 hover:bg-pink-50/50";
                } else {
                  bgClass = "bg-white hover:bg-pink-50/30";
                }
              } else {
                if (isToday) {
                  bgClass = "bg-blue-100/60 ring-2 ring-inset ring-blue-400 hover:bg-blue-100/80";
                } else if (isCurrentWeekRow) {
                  bgClass = "bg-blue-50/40 hover:bg-blue-100/50";
                } else {
                  bgClass = "bg-white hover:bg-gray-50";
                }
              }

              let dateBadgeClass = "";
              if (isDivaMode) {
                if (isToday) {
                  dateBadgeClass =
                    "bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-400 text-white font-black shadow-md shadow-pink-500/30 ring-2 ring-amber-300 ring-offset-1 scale-105";
                } else {
                  dateBadgeClass = "text-gray-700 font-semibold";
                }
              } else {
                if (isToday) {
                  dateBadgeClass = "bg-blue-600 text-white shadow-sm font-medium";
                } else {
                  dateBadgeClass = "text-gray-700 font-medium";
                }
              }

              return h(
                "div",
                {
                  key: dateStr,
                  onClick: function (e) {
                    if (hasEvents) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const origin = {
                        x: (rect.left + rect.width / 2) / (window.innerWidth || 1000),
                        y: (rect.top + rect.height / 2) / (window.innerHeight || 800),
                      };
                      triggerConfetti(origin);
                    }
                  },
                  className:
                    "min-h-0 p-1.5 sm:p-2 flex flex-col transition-all duration-150 " +
                    bgClass +
                    (hasEvents ? " cursor-pointer" : ""),
                  title: hasEvents
                    ? (isDivaMode
                        ? "🎉 Dia de glamour! Clique para confetes! (" +
                          dayEvents
                            .map(function (e) {
                              return getParticipantTheme(e.name, isDivaMode).name;
                            })
                            .join(", ") +
                          ")"
                        : "Home Office: " +
                          dayEvents
                            .map(function (e) {
                              return e.name;
                            })
                            .join(", ") +
                          " (clique para celebrar 🎉)")
                    : undefined,
                },
                // Cabeçalho do dia
                h(
                  "div",
                  { className: "flex justify-center mb-1 sm:mb-1.5 items-center gap-1" },
                  isDivaMode && isToday
                    ? h("span", { className: "text-xs select-none animate-pulse text-amber-500" }, "✨")
                    : null,
                  h(
                    "span",
                    {
                      className:
                        "text-xs sm:text-sm w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full transition-transform " +
                        dateBadgeClass,
                      title: isToday
                        ? (isDivaMode ? "Hoje! Dia de brilhar ✨" : "Hoje")
                        : undefined,
                    },
                    date.getDate()
                  ),
                  isDivaMode && isToday
                    ? h("span", { className: "text-xs select-none animate-pulse text-pink-500" }, "✨")
                    : null
                ),
                // Badges de Eventos
                h(
                  "div",
                  { className: "flex-1 flex flex-col gap-1 min-h-0 overflow-y-auto" },
                  dayEvents.map(function (evt, i) {
                    const pTheme = getParticipantTheme(evt.name, isDivaMode);
                    return h(
                      "div",
                      {
                        key: i,
                        className:
                          "text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-xs truncate transition-transform hover:scale-[1.02] " +
                          pTheme.badgeColor,
                        title:
                          (isDivaMode ? "Diva em Home Office: " : "Home Office: ") +
                          pTheme.name,
                      },
                      pTheme.name
                    );
                  })
                )
              );
            })
          )
        )
      )
    );
  }

  ReactDOM.render(h(App), document.getElementById("root"));
})();
