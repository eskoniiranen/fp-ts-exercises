import { Navigator } from "@solidjs/router";
import { type LatLngTuple, marker, type Marker, circle, type Circle } from "leaflet";
import { eventMap } from "../constants";
import { type Snowplow, Event, HistoryPoint } from "./types";

const flipLatLngTuple = (tuple: LatLngTuple | number[]): LatLngTuple => [tuple[1], tuple[0]]

const mapEventKeyToTranslation = (eventKey: Event ) => eventMap[eventKey];

export const toMarker = (navigationCallback: Navigator) => (snowplow: Snowplow ): Marker => marker(
  flipLatLngTuple(snowplow.last_location.coords),
  { title: mapEventKeyToTranslation(snowplow.last_location.events[0]) }
  ).on('click', () => navigationCallback(`/${snowplow.id}`))

export const getPoints = (historyPoints: HistoryPoint[]) => historyPoints.map(historyPoint => ({
  lat: historyPoint.coords[1],
  lng: historyPoint.coords[0]
}))

export const getLatLngTuple = (marker: Marker) => {
  const latLng = marker.getLatLng();
  return [latLng.lat, latLng.lng] as LatLngTuple;
}
