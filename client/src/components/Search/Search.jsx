import React, { useEffect, useState } from "react";
import Select from "react-select";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const pointsToCoords = [
  { title: "A", value: [49.659785, 24.476246] },
  { title: "B", value: [49.66423, 24.408439] },
  { title: "C", value: [49.639667, 24.399513] },
  { title: "Y", value: [49.643336, 24.474357] },
  { title: "Z", value: [49.631336, 24.414357] },
  { title: "R", value: [49.65566582666878, 24.431663565916153] },
];

const pointsHash = {};

pointsToCoords.forEach((el) => {
  pointsHash[el.title] = el;
});

const startFinishPoints = [
  { title: "R", value: [49.65566582666878, 24.431663565916153] },
];

// const baseUrl = window.location.href.endsWith("/")
//   ? window.location.href
//   : `${window.location.href}/`;

export function Search(props) {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [currentRadio, setCurrentRadio] = useState("Всі");

  const levels = ["УСП-УПС", "УПЮ14+Д", "УПЮ14-Д", "УПЮ14+Х", "УПЮ14-Х", "Всі"];

  async function onClick(data) {
    const url =
      process.env.NODE_ENV === "production"
        ? `${window.location.href}teams/${data.value}`
        : `http://localhost:3001/teams/${data.value}`;

    const result = await fetch(url);
    const points = [];
    const teamsAndPoints = await result.json();

    teamsAndPoints.points.map((el) => {
      if (el in pointsHash) {
        points.push({ title: el, value: pointsHash[el].value });
      }
    });
    console.log(pointsHash);
    console.log("dasda", points);

    props.setCurrentTeamPoints([...points]);
  }

  function onChange(newRadio) {
    setCurrentRadio(newRadio);
    setFilteredTeams(teams.filter((el) => el.level === newRadio));
  }

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "production"
        ? `${window.location.href}teams`
        : `http://localhost:3001/teams`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTeams(
          data.map((el) => ({ label: el.title, value: el.id, level: el.level }))
        );
        setFilteredTeams(
          data.map((el) => ({ label: el.title, value: el.id, level: el.level }))
        );

        // console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
        // NotificationManager.error("Помилка");
      });
  }, []);

  return (
    <div className="search">
      <Select
        options={filteredTeams}
        onChange={(data) => onClick(data)}
        placeholder="Оберіть команду..."
        className="select"
      />
      <div className="radio-buttons">
        {levels.map((el) => {
          return (
            <div className="radio-inputs">
              <input
                id={el}
                type="radio"
                value={el}
                name="gender"
                checked={currentRadio === el}
                onChange={(e) => onChange(e.target.value)}
              ></input>
              <label htmlFor={el}>{el}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
