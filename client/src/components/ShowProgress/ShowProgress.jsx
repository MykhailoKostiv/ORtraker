import React from "react";
import { useState } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export function ShowProgress({ teamsProgress }) {
  const [showStatistic, setShowStatistic] = useState(false);

  const toggleStatistic = (event) => {
    setShowStatistic(!showStatistic);
  };

  return (
    <div className="show-statistik-container ">
      {showStatistic && (
        <div className="statistic-container col-md-8 offset-md-2 col-12 col-sm-12 shadow-lg bg-white rounded ">
          <div className="row">
            <div>
              <div className="close-statistic-button-wraper">
                <button
                  onClick={toggleStatistic}
                  type="button"
                  className="btn-close mt-2 me-1"
                  aria-label="Close"
                ></button>
              </div>
              <ProgressBar teamsProgress={teamsProgress} />
            </div>
          </div>
        </div>
      )}

      <div className="statistic-button-container ">
        <button
          onClick={toggleStatistic}
          className="button-statistic btn btn-primary"
          type="button"
        >
          Статистика
        </button>
      </div>
    </div>
  );
}
