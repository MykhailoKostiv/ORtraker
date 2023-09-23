import React, { useEffect, useState } from "react";
import Select from "react-select";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

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

    props.setCurrentTeamPoints([...points]);
  }

  function onChange(newRadio) {
    setCurrentRadio(newRadio);
    setFilteredTeams(teams.filter((el) => el.level === newRadio));
    if (newRadio === "Всі") {
      setFilteredTeams(teams);
      props.setTeamsProgress(teams);
    }
  }

  useEffect(() => {
    props.setTeamsProgress(filteredTeams);
  }, [filteredTeams]);

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "production"
        ? `${window.location.href}teams`
        : `http://localhost:3001/teams`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTeams(
          data.map((el) => ({
            label: el.title,
            value: el.id,
            level: el.level,
            countOfPoints: el.points_count,
          }))
        );

        setFilteredTeams(
          data.map((el) => ({
            label: el.title,
            value: el.id,
            level: el.level,
            countOfPoints: el.points_count,
          }))
        );

        props.setTeamsProgress(
          data.map((el) => ({
            label: el.title,
            countOfPoints: el.points_count,
          }))
        );
      })

      .catch((err) => {
        console.log(err.message);
        NotificationManager.error("Не вдалося з'єднатися з сервером");
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
      <div
        className="btn-group btn-group-toggle mt-2 d-block d-sm-flex overflow-auto huinia"
        role="group"
      >
        {levels.map((el, index) => {
          return (
            <div key={index} className="text-nowrap d-grid ">
              <input
                id={el}
                type="radio"
                value={el}
                name="level"
                checked={currentRadio === el}
                onChange={(e) => onChange(e.target.value)}
                className="btn-check"
              ></input>
              <label
                className="radio-input-label btn btn-light btn-sm "
                htmlFor={el}
              >
                {el}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
