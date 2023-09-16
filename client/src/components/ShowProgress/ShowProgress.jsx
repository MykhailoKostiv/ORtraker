import React from "react";
import { useState } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export function ShowProgress({ teamsProgress }) {
  const [showStatistic, setShowStatistic] = useState(false);

  const toggleStatistic = (event) => {
    setShowStatistic(!showStatistic);
  };

  return (
    <div className="show-statistik-container">
      {showStatistic && (
        <div className="statistic-container">
          <button onClick={toggleStatistic} className="close-statistic-button">
            <span className="close-statistic-button-span">X</span>
          </button>
          <ProgressBar teamsProgress={teamsProgress} />
        </div>
      )}

      <div className="statistic-button-container">
        <button onClick={toggleStatistic} className="button-statistic">
          Статистика
        </button>
      </div>
    </div>
  );
}
