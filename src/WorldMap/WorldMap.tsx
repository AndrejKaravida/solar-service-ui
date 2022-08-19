import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export const WorldMap = () => {
  return (
    <ComposableMap>
      <Geographies geography={"../../serbiamap.json"}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};
