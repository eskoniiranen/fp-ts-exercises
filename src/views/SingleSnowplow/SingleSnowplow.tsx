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
import { Marker } from "leaflet";
import Loading from "~/components/Loading";
import LeafletMap from "~/components/Map/LeafletMap";
import Data from "~/data";
import { HistoryPoint, Snowplow, SnowplowResponse } from "~/data/types";
import { getLatLngTuple, toMarker } from "~/data/utils";
import { ZOOM_ON_SINGLE } from "~/constants";
import { isSome, map as OMap, match, none, some, type Option } from "fp-ts/lib/Option";

const SingleSnowplow: Component = () => {
  const { id } = useParams();
  const [snowplow] = createResource(() => Data.getOne(id));
  const [marker, setMarker] = createSignal<Option<Marker>>(none);
  const [history, setHistory] = createSignal<HistoryPoint[]>([]);
  const navigate = useNavigate();

  createEffect(() => {
    !snowplow.loading &&
      pipe(
        snowplow() as SnowplowResponse,
        bimap(
          () => <Navigate href="/error" />,
          OMap((plow: Snowplow) => {
            setMarker(some(toMarker(navigate)(plow)));
            setHistory(plow.location_history);
          })
        )
      );
  });

  return (
    <>
      <p>Tarkastellaan lumiauraa {id}</p>
      <Show when={!snowplow.loading && isSome(marker())} fallback={<Loading />}>
        {pipe(
          marker(),
          match(
            () => <Navigate href="/not-found" />,
            (mark) => <LeafletMap
              center={getLatLngTuple(mark)}
              markers={[mark]}
              initialZoom={ZOOM_ON_SINGLE}
              history={history()}
            />
          )
        )}
      </Show>
      <Link href="/">Palaa takaisin</Link>
    </>
  );
};

export default SingleSnowplow;
