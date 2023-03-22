import { Navigator } from "@solidjs/router";
import {
  type LatLngTuple,
  marker,
  type Marker,
  type Icon,
  icon,
  type IconOptions,
} from "leaflet";
import { eventMap, ICON_SIZE } from "~/constants";
import { type Snowplow, type PlowEvent, type HistoryPoint } from "./types";
import tractor from "~/assets/tractor.png";

const tractorIcon: Icon = icon(<IconOptions>{
  iconUrl: tractor,
  iconSize: ICON_SIZE,
});

const flipLatLngTuple = (tuple: LatLngTuple): LatLngTuple => [
  tuple[1],
  tuple[0],
];

const mapEventKeyToTranslation = (eventKey: PlowEvent) => eventMap[eventKey];

export const toMarker =
  (navigationCallback: Navigator) =>
  (snowplow: Snowplow): Marker =>
    marker(flipLatLngTuple(snowplow.last_location.coords), {
      title: mapEventKeyToTranslation(snowplow.last_location.events[0]),
      icon: tractorIcon,
    }).on("click", () => navigationCallback(`/${snowplow.id}`));

export const getPoints = (historyPoints: HistoryPoint[]) =>
  historyPoints.map((historyPoint) => ({
    lat: historyPoint.coords[1],
    lng: historyPoint.coords[0],
  }));

export const getLatLngTuple = (marker: Marker) => {
  const latLng = marker.getLatLng();
  return [latLng.lat, latLng.lng] as LatLngTuple;
};
