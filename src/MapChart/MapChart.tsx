import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { IMarker } from "../Models/IMarker";
import { SolarPanelIcon } from "./SolarPanel";

interface IMapChartProps {
  markers: IMarker[];
  onChooseCity: (city: string) => void;
}

export const MapChart = ({ markers, onChooseCity }: IMapChartProps) => {
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  // @ts-ignore
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -40.0, 0],
        scale: 900,
      }}
    >
      <ZoomableGroup zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {markers.map(({ markerOffset, name, coordinates }) => (
          <Marker
            key={name}
            className="cursor-pointer"
            coordinates={coordinates}
            onClick={() => onChooseCity(name)}
          >
            <SolarPanelIcon />

            <text
              textAnchor="right"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};
