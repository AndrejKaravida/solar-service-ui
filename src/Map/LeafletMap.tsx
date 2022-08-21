import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../images/solar-panel-2.png";
import L from "leaflet";
import { IInvestment } from "../Models/IInvestment";
import { InvestmentCard } from "./InvestmentCard";

interface IProps {
  investments: IInvestment[];
  investmentSelected: string | null;
}

export const LeafletMap = (props: IProps) => {
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [30, 30],
  });

  const getMarkers = () => {
    return props.investments.map((investment, index) => (
      <Marker key={index} position={[investment.city.lat, investment.city.lon]}>
        <Popup>
          <InvestmentCard investment={investment} />
        </Popup>
      </Marker>
    ));
  };

  return (
    <MapContainer center={[44.7, 20.5]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {getMarkers()}
    </MapContainer>
  );
};
