import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import { Link, Navigate, useNavigate, useParams } from "@solidjs/router";
import { bimap } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { LatLngTuple, Marker } from "leaflet";
import Loading from "../../components/Loading";
import LeafletMap from "../../components/Map/LeafletMap";
import Data from "../../data";
import { HistoryPoint, Snowplow, SnowplowResponse } from "../../data/types";
import { getLatLngTuple, toMarker } from "../../data/utils";
import { ZOOM_ON_SINGLE } from "../../constants";
import { map as optionMap } from "fp-ts/lib/Option";

const SingleSnowplow: Component = () => {
  const { id } = useParams();
  const [snowplow] = createResource(() => Data.getOne(id));
  const [marker, setMarker] = createSignal<Marker | null>(null);
  const [history, setHistory] = createSignal<HistoryPoint[]>([]);
  const navigate = useNavigate();

  createEffect(() => {
    !snowplow.loading &&
      pipe(
        snowplow() as SnowplowResponse,
        bimap(
          () => <Navigate href="/error" />,
          optionMap((plow: Snowplow) => {
            setMarker(toMarker(navigate)(plow));
            setHistory(plow.location_history as HistoryPoint[]);
          })
        )
      );
  });

  return (
    <>
      <p>Tarkastellaan lumiauraa {id}</p>
      <Show when={!snowplow.loading && marker()} fallback={<Loading />}>
        <LeafletMap
          center={getLatLngTuple(marker() as Marker) as LatLngTuple}
          markers={[marker() as Marker]}
          initialZoom={ZOOM_ON_SINGLE}
          history={history()}
        />
      </Show>
      <Link href="/">Palaa takaisin</Link>
    </>
  );
};

export default SingleSnowplow;
