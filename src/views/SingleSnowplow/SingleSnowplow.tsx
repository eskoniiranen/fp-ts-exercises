import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { bimap } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { Marker } from "leaflet";
import Data from "~/data";
import { HistoryPoint, Snowplow, SnowplowResponse } from "~/data/types";
import { getLatLngTuple, toMarker } from "~/data/utils";
import { ZOOM_ON_SINGLE } from "~/constants";
import {
  match,
  none,
  some,
  type Option,
} from "fp-ts/lib/Option";
import { ask, chain, type Reader } from "fp-ts/lib/Reader";
import NotFound from "~/components/NotFound";
import Loading from "~/components/Loading";
import LeafletMap from "~/components/Map/LeafletMap";
import Input from "~/components/Input";
import Action from "~/components/Action";

const SingleSnowplow: Component = () => {
  const { id } = useParams();
  const [snowplow] = createResource(() => Data.getOne(id));
  const [marker, setMarker] = createSignal<Option<Marker>>(none);
  const [history, setHistory] = createSignal<HistoryPoint[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (changeEvent: any) => {
    changeEvent.preventDefault();
    console.log(changeEvent);
  }

  createEffect(() => {
    !snowplow.loading &&
      pipe(
        snowplow() as SnowplowResponse,
        bimap(
          () => navigate("/error"),
          (plow: Snowplow) => {
            setMarker(some(toMarker(navigate)(plow)));
            setHistory(plow.location_history);
          }
        )
      );
  });

  return (
    <>
      <p class="mb-6 text-lg">Tarkastellaan lumiauraa {id}</p>
      <Show when={!snowplow.loading} fallback={<Loading />}>
        {pipe(
          marker(),
          match(
            () => <NotFound />,
            (mark) => (
              <div class="inline">
                <LeafletMap
                  center={getLatLngTuple(mark)}
                  markers={[mark]}
                  initialZoom={ZOOM_ON_SINGLE}
                  history={history()}
                />
                <div class="my-5 max-w-screen-md">
                  <form class="flex">
                    <Input onInput={handleInputChange} label="Datapisteiden määrä" id="history" placeholder="Lukumäärä" />
                    <Input onInput={handleInputChange} label="Aktiivisuusaikaväli" id="since" placeholder="Päiviä" />
                    <Input onInput={handleInputChange} label="Ajallinen resoluutio" id="temporal_resolution" placeholder="Sekunteja" />
                  </form>
                </div>
              </div>
            )
          )
        )}
      </Show>
      <Action href={"/"} text={"Palaa takaisin"} />
    </>
  );
};

export default SingleSnowplow;
