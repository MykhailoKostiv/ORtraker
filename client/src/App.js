import { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Search } from "./components/Search/Search";
import { Map } from "./components/Map/Map";
import { NotificationContainer } from "react-notifications";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { ShowProgress } from "./components/ShowProgress/ShowProgress";

function App() {
  const [currentTeamPoints, setCurrentTeamPoints] = useState([]);
  const [teamsProgress, setTeamsProgress] = useState([]);

  return (
    <div className="App">
      <NotificationContainer />
      <Map currentTeamPoints={currentTeamPoints}></Map>
      <Search
        setCurrentTeamPoints={setCurrentTeamPoints}
        setTeamsProgress={setTeamsProgress}
      />
      <ShowProgress teamsProgress={teamsProgress} />
    </div>
  );
}

export default App;
