import { LatLngTuple, Marker } from "leaflet";
import { HistoryPoint } from "../../data/types";

export interface MapProps {
  center: LatLngTuple;
  initialZoom?: number;
  markers: Marker[];
  history?: HistoryPoint[];
}
