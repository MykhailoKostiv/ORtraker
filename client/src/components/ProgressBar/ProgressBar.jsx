import React from "react";

export function ProgressBar({ teamsProgress }) {
  teamsProgress.sort((a, b) => b.countOfPoints - a.countOfPoints);

  return (
    <div className="progress-custom">
      {teamsProgress.map((el, index) => {
        return (
          <div key={index} className="progress-container">
            <div
              className="team-progress"
              style={{ width: `${(el.countOfPoints / 44) * 100}%` }}
            >
              <div className="progress-bar-custom-title">{`${el.label}`}</div>
              <div className="progress-bar-custom">{`${el.countOfPoints}/44`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
