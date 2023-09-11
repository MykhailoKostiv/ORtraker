import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { pointsToCoords } from "../Search/Search";

export function Map({ currentTeamPoints }) {
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  const toggleSatelliteView = (event) => {
    setIsSatelliteView(!isSatelliteView);
  };

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  function currentToltip(title) {
    if (currentTeamPoints.map((el) => el.title).includes(title)) {
      return <span className="taken-point">{title}</span>;
    }
    return <span>{title}</span>;
  }

  return (
    <div className="map">
      <MapContainer
        style={{ height: "100vh", width: "100%" }}
        center={[49.650068, 24.434413]}
        zoom={12}
        scrollWheelZoom={true}
      >
        {isSatelliteView && (
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt1", "mt2", "mt3"]}
          />
        )}

        {!isSatelliteView && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {pointsToCoords.map((el, index) => (
          <Marker key={index} position={el.value}>
            <Tooltip
              direction="bottom"
              offset={[-15, 25]}
              opacity={1}
              permanent
            >
              {currentToltip(el.title)}
            </Tooltip>
          </Marker>
        ))}

        <button onClick={toggleSatelliteView} className="button">
          {isSatelliteView ? "Карта" : "Супутник"}
        </button>
      </MapContainer>
    </div>
  );
}
