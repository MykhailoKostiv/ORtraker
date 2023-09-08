import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { pointsToCoords } from "../Search/Search";
import AUrl from "./letersSVG/A.svg";
import BUrl from "./letersSVG/B.svg";
import CUrl from "./letersSVG/C.svg";
import DUrl from "./letersSVG/D.svg";
import EUrl from "./letersSVG/E.svg";
import FUrl from "./letersSVG/F.svg";
import GUrl from "./letersSVG/G.svg";
import HUrl from "./letersSVG/H.svg";
import IUrl from "./letersSVG/I.svg";
import JUrl from "./letersSVG/J.svg";
import KUrl from "./letersSVG/K.svg";
import LUrl from "./letersSVG/A.svg";
import MUrl from "./letersSVG/M.svg";
import NUrl from "./letersSVG/N.svg";
import OUrl from "./letersSVG/O.svg";
import PUrl from "./letersSVG/P.svg";
import QUrl from "./letersSVG/Q.svg";
import RUrl from "./letersSVG/R.svg";
import SUrl from "./letersSVG/S.svg";
import TUrl from "./letersSVG/T.svg";
import UUrl from "./letersSVG/U.svg";
import VUrl from "./letersSVG/V.svg";
import WUrl from "./letersSVG/W.svg";
import XUrl from "./letersSVG/X.svg";
import YUrl from "./letersSVG/Y.svg";
import ZUrl from "./letersSVG/Z.svg";

export function Map({ currentTeamPoints }) {
  const pointsNames = {
    A: AUrl,
    B: BUrl,
    C: CUrl,
    D: DUrl,
    E: EUrl,
    F: FUrl,
    G: GUrl,
    H: HUrl,
    I: IUrl,
    J: JUrl,
    K: KUrl,
    L: LUrl,
    M: MUrl,
    N: NUrl,
    O: OUrl,
    P: PUrl,
    Q: QUrl,
    R: RUrl,
    S: SUrl,
    T: TUrl,
    U: UUrl,
    V: VUrl,
    W: WUrl,
    X: XUrl,
    Y: YUrl,
    Z: ZUrl,
  };
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  const toggleSatelliteView = (event) => {
    setIsSatelliteView(!isSatelliteView);
  };

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  async function titleIcon(title) {
    return new LeafIcon({
      iconUrl: `/public/letersSVG/${title}`,
    });
  }

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
