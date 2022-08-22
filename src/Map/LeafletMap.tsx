import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../images/solar-panel-2.png";
import L from "leaflet";
import { IInvestment } from "../Models/IInvestment";
import { InvestmentCard } from "./InvestmentCard";
import { useEffect, useRef } from "react";

interface IProps {
  investments: IInvestment[];
  investmentSelected: string | null;
}

export const LeafletMap = (props: IProps) => {
  const markersRef = useRef<any>([]);

  useEffect(() => {
    markersRef.current = markersRef.current.slice(0, props.investments.length);
  }, [props.investments]);

  useEffect(() => {
    if (props.investmentSelected) {
      const markerIndex = props.investments.findIndex(
        (x) => x._id === props.investmentSelected
      );
      if (markerIndex > -1) {
        const marker = markersRef.current[markerIndex];
        if (marker) {
          marker.openPopup();
        }
      }
    }
  }, [props.investmentSelected]);

  L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [30, 30],
  });

  const getMarkers = () => {
    return props.investments.map((investment, index) => (
      <Marker
        ref={(el) => (markersRef.current[index] = el)}
        key={index}
        position={[investment.city.lat, investment.city.lon]}
      >
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
