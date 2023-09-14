import React, { useEffect } from "react";

export function ProgressBar({ teamsProgress }) {
  teamsProgress.sort((a, b) => b.countOfPoints - a.countOfPoints);

  return (
    <div className="progress">
      {teamsProgress.map((el) => {
        return (
          <div className="progress-container">
            <div
              className="team-progress"
              style={{ width: `${(el.countOfPoints / 50) * 100}%` }}
            >
              <div className="progress-bar title">{`${el.label}`}</div>
              <div className="progress-bar">{`${el.countOfPoints}/50`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
