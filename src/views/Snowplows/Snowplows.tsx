import {
  type Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import { Navigate, useNavigate } from "@solidjs/router";
import { bimap } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { type Marker } from "leaflet";
import Loading from "~/components/Loading";
import { HELSINKI } from "~/constants";
import Data from "~/data";
import { type SnowplowsResponse, type Snowplow } from "~/data/types";
import { toMarker } from "~/data/utils";
import LeafletMap from "~/components/Map/LeafletMap";

const Snowplows: Component = () => {
  const [snowplows] = createResource(() => Data.getAll());
  const [markers, setMarkers] = createSignal<Marker[]>([]);
  const navigate = useNavigate();

  createEffect(() => {
    snowplows() &&
      pipe(
        snowplows() as SnowplowsResponse,
        bimap(
          () => <Navigate href="/error" />,
          (snowplowData: Snowplow[]) =>
            setMarkers(snowplowData.map(toMarker(navigate)))
        )
      );
  });

  return (
    <>
      <p>Valitse kartalta lumiaura tarkastellaksesi sen reittihistoriaa</p>
      <Show when={!snowplows.loading} fallback={<Loading />}>
        <LeafletMap center={HELSINKI} markers={markers()} />
      </Show>
    </>
  );
};

export default Snowplows;
