(function () {
  "use strict";

  const { createElement: h, useMemo, useState } = React;

  function IconCalendar(props) {
    return h(
      "svg",
      Object.assign(
        { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
        props
      ),
      h("path", { d: "M8 2v4m8-4v4" }),
      h("rect", { width: 18, height: 18, x: 3, y: 4, rx: 2 }),
      h("path", { d: "M3 10h18" })
    );
  }

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

  const participants = [
    { name: "Arthur", color: "bg-blue-500 text-white" },
    { name: "Caio", color: "bg-orange-500 text-white" },
    { name: "Glauber", color: "bg-emerald-500 text-white" },
    { name: "Lucas", color: "bg-purple-600 text-white" },
  ];

  const fixedParticipant = { name: "Leandro", color: "bg-slate-600 text-white" };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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

    const events = useMemo(function () {
      const allEvents = {};
      let d = new Date(2026, 1, 23);
      let weekIndex = 0;
      while (d.getFullYear() <= 2026) {
        for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
          const currentPerson = participants[(weekIndex + dayOffset) % participants.length];
          const currentDayDate = new Date(d);
          currentDayDate.setDate(d.getDate() + dayOffset);
          const dateStr = currentDayDate.toISOString().split("T")[0];
          if (!allEvents[dateStr]) allEvents[dateStr] = [];
          allEvents[dateStr].push(currentPerson);
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
      { className: "h-full flex flex-col bg-gray-50 text-gray-800 font-sans" },
      h(
        "header",
        {
          className:
            "bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm",
        },
        h("div", { className: "flex items-center gap-4" },
          h("div", { className: "flex items-center gap-2 text-blue-600" },
            h(IconCalendar, { className: "w-8 h-8" }),
            h("h1", {
              className: "text-2xl font-semibold text-gray-700 hidden sm:block",
            }, "Escala Home Office")
          ),
          h("div", { className: "flex items-center gap-2 ml-4 md:ml-8" },
            h("button", {
              onClick: prevMonth,
              className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
            }, h(IconChevronLeft, { className: "w-5 h-5 text-gray-600" })),
            h("button", {
              onClick: nextMonth,
              className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
            }, h(IconChevronRight, { className: "w-5 h-5 text-gray-600" })),
            h("h2", {
              className: "text-xl font-medium text-gray-800 min-w-[200px] ml-2",
            }, monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear())
          )
        ),
        h(
          "div",
          { className: "hidden lg:flex items-center gap-3 text-sm" },
          [...participants, fixedParticipant].map(function (p) {
            return h("div", { key: p.name, className: "flex items-center gap-1.5" },
              h("div", {
                className: "w-3 h-3 rounded-full " + p.color.split(" ")[0],
              }),
              h("span", null, p.name)
            );
          })
        )
      ),
      h("main", { className: "flex-1 flex flex-col min-h-0 p-2 md:p-4" },
        h(
          "div",
          { className: "lg:hidden flex flex-wrap gap-2 mb-2 text-xs flex-shrink-0" },
          [...participants, fixedParticipant].map(function (p) {
            return h("div", {
              key: p.name,
              className: "flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm",
            },
              h("div", { className: "w-2 h-2 rounded-full " + p.color.split(" ")[0] }),
              h("span", null, p.name)
            );
          })
        ),
        h("div", {
          className: "flex-1 flex flex-col min-h-0 bg-white rounded-lg shadow border border-gray-200 overflow-hidden",
        },
          h("div", { className: "grid grid-cols-7 border-b border-gray-200 flex-shrink-0" },
            daysOfWeek.map(function (day) {
              return h("div", {
                key: day,
                className: "py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider",
              }, day);
            })
          ),
          h("div", {
            className: "flex-1 grid grid-cols-7 auto-rows-fr min-h-0 bg-gray-200 gap-px",
          },
            currentDays.map(function (date, index) {
              const isCurrentWeekRow =
                currentWeekRow !== -1 && Math.floor(index / 7) === currentWeekRow;
              if (!date) {
                return h("div", {
                  key: "empty-" + index,
                  className: "min-h-0 transition-colors " + (isCurrentWeekRow ? "bg-blue-50/40" : "bg-gray-50"),
                });
              }
              const dateStr = date.toISOString().split("T")[0];
              const dayEvents = events[dateStr] || [];
              const isToday = new Date().toDateString() === date.toDateString();
              let bgClass = isCurrentWeekRow
                ? "bg-blue-50/40 hover:bg-blue-100/50"
                : "bg-white hover:bg-gray-50";
              if (isToday) {
                bgClass = "bg-blue-100/60 ring-2 ring-inset ring-blue-400 hover:bg-blue-100/80";
              }
              return h(
                "div",
                {
                  key: dateStr,
                  className: "min-h-0 p-2 flex flex-col transition-colors " + bgClass,
                },
                h("div", { className: "flex justify-center mb-2" },
                  h("span", {
                    className:
                      "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full " +
                      (isToday ? "bg-blue-600 text-white shadow-sm" : "text-gray-700"),
                  }, date.getDate())
                ),
                h("div", { className: "flex-1 flex flex-col gap-1 min-h-0 overflow-y-auto" },
                  dayEvents.map(function (evt, i) {
                    return h("div", {
                      key: i,
                      className:
                        "text-xs px-2 py-1 rounded-md shadow-sm truncate font-medium " +
                        evt.color,
                      title: "Home Office: " + evt.name,
                    }, evt.name);
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
