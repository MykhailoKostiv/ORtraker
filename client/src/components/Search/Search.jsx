import React, { useEffect, useState } from "react";
import Select from "react-select";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

export const pointsToCoords = [
  { title: "A", value: [49.734183333333334, 24.47698611111111] },
  { title: "B", value: [49.730000000000004, 24.44788888888889] },
  { title: "C", value: [49.72112777777778, 24.428069444444446] },
  { title: "D", value: [49.71267777777778, 24.49396388888889] },
  { title: "GL", value: [49.686230555555554, 24.550644444444444] },
  { title: "GH", value: [49.650977777777776, 24.413733333333333] },
  { title: "GG", value: [49.638675, 24.29430277777778] },
  { title: "E", value: [49.648919444444445, 24.42846666666667] },
  { title: "F", value: [49.64318333333333, 24.42878888888889] },
  { title: "G", value: [49.62289166666667, 24.444455555555557] },
  { title: "H", value: [49.63166944444445, 24.419486111111112] },
  { title: "I", value: [49.62853888888889, 24.490850000000002] },
  { title: "J", value: [49.618183333333334, 24.50337777777778] },
  { title: "K", value: [49.650244444444446, 24.502319444444446] },
  { title: "L", value: [49.65206388888889, 24.433183333333336] },
  { title: "M", value: [49.65792777777778, 24.540533333333336] },
  { title: "N", value: [49.66495, 24.534383333333334] },
  { title: "O", value: [49.66235833333333, 24.529480555555555] },
  { title: "P", value: [49.64850277777778, 24.53233611111111] },
  { title: "Q", value: [49.66229722222222, 24.501397222222224] },
  { title: "R", value: [49.64304722222222, 24.539852777777778] },
  { title: "S", value: [49.63663888888889, 24.565886111111112] },
  { title: "LL5", value: [49.59940277777778, 24.53535] },
  { title: "T", value: [49.68192777777777, 24.52937777777778] },
  { title: "LL3", value: [49.56222222222222, 24.30203611111111] },
  { title: "U", value: [49.602580555555555, 24.292741666666668] },
  { title: "V", value: [49.61383055555556, 24.31185] },
  { title: "W", value: [49.59328611111111, 24.33623888888889] },
  { title: "LL6", value: [49.592022222222226, 24.34507222222222] },
  { title: "X", value: [49.60162777777778, 24.38104722222222] },
  { title: "LL4", value: [49.58273611111112, 24.402369444444442] },
  { title: "Y", value: [49.61890277777778, 24.372516666666666] },
  { title: "Z", value: [49.628686111111115, 24.375108333333333] },
  { title: "AA", value: [49.63586388888889, 24.357175] },
  { title: "AB", value: [49.633472222222224, 24.335980555555555] },
  { title: "AC", value: [49.66624, 24.44403] },
  { title: "AD", value: [49.67556, 24.43318] },
  { title: "LL7", value: [49.72149, 24.59455] },
  { title: "AE", value: [49.62474, 24.30579] },
  { title: "AF", value: [49.62355, 24.35409] },
  { title: "AG", value: [49.60229, 24.36465] },
  { title: "LL8", value: [49.61031, 24.40392] },
  { title: "LL1", value: [49.68584, 24.34706] },
  { title: "LL2", value: [49.70085, 24.45748] },
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
      console.log(points);
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
        className="btn-group btn-group-toggle mt-2 d-block d-sm-flex overflow-auto responsive-radio"
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
