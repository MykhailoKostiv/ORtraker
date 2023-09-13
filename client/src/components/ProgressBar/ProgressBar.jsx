import React from "react";

export function ProgressBar() {
  const teamsProgress = [
    { title: "Тестова команда", countOFPoints: 3 },
    { title: "asdasd", countOFPoints: 12 },
    { title: "asdasd", countOFPoints: 49 },
    { title: "asdasd", countOFPoints: 16 },
    { title: "asdasd", countOFPoints: 16 },
    { title: "asdasd", countOFPoints: 16 },
  ];

  return (
    <div className="progress">
      {teamsProgress.map((el) => {
        return (
          <div className="progress-container">
            <div
              className="team-progress"
              style={{ width: `${(el.countOFPoints / 50) * 100}%` }}
            >
              <div className="progress-bar title">{`${el.title}`}</div>
              <div className="progress-bar">{`${el.countOFPoints}/50`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
