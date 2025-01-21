import React, { useState, useEffect } from "react";
import "./App.css";
import bulbIcon from "./icons/bulb.png";

function App() {
  // ========== ЛОГИКА СОСТОЯНИЙ ==========
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay() - 1;

  const [view, setView] = useState("today"); // 'today' | 'full' | 'detail'
  const [selectedDay, setSelectedDay] = useState(null); 
  const [timerId, setTimerId] = useState(null);

  // При смене view устанавливаем таймеры
  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    if (view === "full") {
      // 15с, потом на "today"
      const newTimer = setTimeout(() => {
        setView("today");
      }, 15000);
      setTimerId(newTimer);
    } else if (view === "detail") {
      // 20с, потом на "today"
      const newTimer = setTimeout(() => {
        setView("today");
        setSelectedDay(null);
      }, 20000);
      setTimerId(newTimer);
    }
    // в 'today' таймеров нет

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [view]); // упрощённо, без зависимостей timerId

  // ========== ДАННЫЕ ==========
  const daysOfWeek = [
    "Pondelok",
    "Utorok",
    "Streda",
    "Štvrtok",
    "Piatok",
    "Sobota",
    "Nedeľa",
  ];

  const weekSchedule = [
    [
      { time: "07:30 - 09:00", lesson: "Internet vecí a chytré zariadenia", teacher: "Ing. Miroslav Biňas, PhD." },
      { time: "09:10 - 10:40", lesson: "Iný predmet #1", teacher: "Ing. X Y" },
      { time: "10:50 - 12:20", lesson: "Iný predmet #2", teacher: "Ing. Z Q" },
    ],
    [
      { time: "09:10 - 10:40", lesson: "IoT 2", teacher: "Ing. Miroslav Biňas, PhD." },
      { time: "10:50 - 12:20", lesson: "Sieťové technológie", teacher: "Ing. XYZ" },
    ],
    [
      { time: "07:30 - 09:00", lesson: "IoT 3", teacher: "Ing. Miroslav Biňas, PhD." },
      { time: "09:10 - 10:40", lesson: "IoT 3 cvičenie", teacher: "Ing. Miroslav Biňas, PhD." },
      { 
        time: "10:50 - 12:20", 
        lesson: "Internet vecí a chytré zariadenia", 
        teacher: "Ing. Miroslav Biňas, PhD.",
        note: "Cvičenie online, link je na webe",
      },
      { time: "13:30 - 15:00", lesson: "Iný predmet #3", teacher: "Doc. AAA BBB" },
    ],
    [
      { time: "13:30 - 15:00", lesson: "Internet vecí a chytré zariadenia", teacher: "Ing. Miroslav Biňas, PhD." },
    ],
    [
      { time: "9:10 - 10:40", lesson: "Iný predmet #4", teacher: "Ing. CCC DDD" },
    ],
    [],
    [],
  ];

  // ========== ФУНКЦИЯ ОТРИСОВКИ ОДНОГО ДНЯ ==========
  // isToday => розовый фон (если нужно)
  // isPartial => признак "день показывается не полностью"
  // onClickDay => клик по дню (можно открыть детально)
  const renderDay = (dayIndex, isToday, isPartial, onClickDay) => {
    const dayName = daysOfWeek[dayIndex] || "Neznámy deň";
    const schedule = weekSchedule[dayIndex] || [];

    // В "частичном" режиме показываем не все занятия
    // Допустим, показываем максимум 2:
    const PARTIAL_COUNT = 2;
    const displayedSchedule = isPartial 
      ? schedule.slice(0, PARTIAL_COUNT) 
      : schedule;

    const handleDayClick = () => {
      if (onClickDay) onClickDay(dayIndex);
    };

    return (
      <div
        className={`day ${isToday ? "current-day" : ""}`}
        style={{ cursor: onClickDay ? "pointer" : "default" }}
        onClick={handleDayClick}
      >
        <h2>{dayName}</h2>

        {displayedSchedule.length > 0 ? (
          <ul>
            {displayedSchedule.map((item, i) => (
              <li key={i} className="lesson">
                <div className="lesson-details">
                  <div className="lesson-time">{item.time}</div>
                  <div className="lesson-name">{item.lesson}</div>
                </div>
                <div className="lesson-teacher">{item.teacher}</div>
                {item.note && (
                  <div className="note">
                    <img src={bulbIcon} alt="Zametka" className="note-icon" />
                    <span>{item.note}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Víkend</p>
        )}

        {/* Если мы обрезали часть занятий => показываем (nie je celé) */}
        {schedule.length > displayedSchedule.length && (
          <div style={{ marginTop: "10px", fontSize: "0.9rem", opacity: 0.7 }}>
            (nie je celé)
          </div>
        )}
      </div>
    );
  };

  // ========== ОБРАБОТЧИКИ ==========
  const handleShowAll = () => {
    setSelectedDay(null);
    setView("full");
  };
  const handleShowToday = () => {
    setSelectedDay(null);
    setView("today");
  };
  const handleDayClick = (dayIndex) => {
    // Детальный просмотр дня
    setSelectedDay(dayIndex);
    setView("detail");
  };
  const handleBackToSchedule = () => {
    setSelectedDay(null);
    setView("full");
  };

  // ========== РЕНДЕР В ЗАВИСИМОСТИ ОТ view ==========
  
  // 1) Детальный просмотр дня:
  if (view === "detail" && selectedDay !== null) {
    const isToday = (selectedDay === currentDayIndex);
    return (
      <div className="App-container">
        <header className="App-header">
          <h1>L9-B524</h1>
          <button className="schedule-button" onClick={handleBackToSchedule}>
            Späť na rozvrh
          </button>
        </header>
        
        <div className="calendar single-day">
          {/* Показываем всё расписание дня (isPartial=false) */}
          {renderDay(selectedDay, isToday, false)}
        </div>
      </div>
    );
  }

  // 2) Полное расписание:
  if (view === "full") {
    return (
      <div className="App-container">
        <header className="App-header">
          <h1>L9-B524</h1>
          <button className="schedule-button" onClick={handleShowToday}>
            Vrátiť sa na dnešok
          </button>
        </header>
        
        <div className="calendar">
          {daysOfWeek.map((_, index) => {
            const isToday = (index === currentDayIndex);
            // Здесь isPartial=true (мы «обрезаем»)
            return renderDay(index, isToday, true, handleDayClick);
          })}
        </div>
      </div>
    );
  }

  // 3) Главный экран (today)
  return (
    <div className="App-container">
      <header className="App-header">
        <h1>L9-B524</h1>
        <button className="schedule-button" onClick={handleShowAll}>
          Ukázať celé (15s)
        </button>
      </header>
      <div className="calendar single-day">
        {/* Показываем ВСЕ занятия сегодняшнего дня (isPartial=false),
            причём этот день (по задаче) у нас не розовый => isToday=false */}
        {renderDay(currentDayIndex, false, false)}
      </div>
    </div>
  );
}

export default App;
