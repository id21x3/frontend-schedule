import React from "react";
import "./App.css";
import bulbIcon from './icons/bulb.png';

function App() {
  const currentDate = new Date(); 
  const currentDayIndex = currentDate.getDay() - 1; 

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
      {
        time: "07:30 - 09:00",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
      },
    ],
    [
      {
        time: "09:10 - 10:40",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
      },
    ],
    [
      {
        time: "07:30 - 09:00",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
      },
      {
        time: "09:10 - 10:40",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
      },
      {
        time: "10:50 - 12:20",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
        note: "Cvičenie bude online, odkaz nájdete na webovej stránke IOT",
      },
    ],
    [
      {
        time: "13:30 - 15:00",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
      },
    ],
    [
      {
        time: "9:10 - 10:40",
        lesson: "Internet vecí a chytré zariadenia",
        teacher: "Ing. Miroslav Biňas, PhD.",
      },
    ],
    [],
    [],
  ];

  return (
    <div>
      <header className="App-header">
        <h1>L9-B524</h1>
      </header>
      <div className="calendar">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`day ${index === currentDayIndex ? "current-day" : ""}`}
          >
            <h2>{day}</h2>
            {weekSchedule[index].length > 0 ? (
              <ul>
                {weekSchedule[index].map((item, i) => (
                  <li key={i} className="lesson">
                    <div className="lesson-details">
                      <div className="lesson-time">{item.time}</div>
                      <div className="lesson-name">{item.lesson}</div>
                    </div>
                    <div className="lesson-teacher">{item.teacher}</div>
                    {item.note && (
                      <div className="note">
                        <img src={bulbIcon} alt="Заметка" className="note-icon" />
                        <span>{item.note}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Víkend</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
