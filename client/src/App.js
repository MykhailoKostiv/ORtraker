import { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Search } from "./components/Search/Search";
import { Map } from "./components/Map/Map";
import { NotificationContainer } from "react-notifications";

function App() {
  const [currentTeamPoints, setCurrentTeamPoints] = useState([]);

  return (
    <div className="App">
      <NotificationContainer />
      <Map currentTeamPoints={currentTeamPoints} />
      <div className="side-bar">
        <Search setCurrentTeamPoints={setCurrentTeamPoints} />
      </div>
    </div>
  );
}

export default App;
