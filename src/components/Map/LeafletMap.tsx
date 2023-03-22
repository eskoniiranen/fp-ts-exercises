import { type Component, onMount } from "solid-js";
import { type Map, map as leafletMap, tileLayer, polyline } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ATTRIBUTION,
  INITIAL_ZOOM,
  MAP_ELEMENT_ID,
  MAX_ZOOM,
  MIN_ZOOM,
  TILES,
} from "~/constants";
import { type MapProps } from "./types";
import { getPoints } from "~/data/utils";

const LeafletMap: Component<MapProps> = (props) => {
  onMount(() => {
    const map: Map = leafletMap(MAP_ELEMENT_ID).setView(
      props.center,
      props.initialZoom || INITIAL_ZOOM
    );

    tileLayer(TILES, {
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM,
      attribution: ATTRIBUTION,
    }).addTo(map);

    props.markers.map((marker) => marker.addTo(map));

    if (props.history) polyline(getPoints(props.history)).addTo(map);
  });

  return <div id={MAP_ELEMENT_ID} style={{ height: "400px" }} />;
};

export default LeafletMap;
