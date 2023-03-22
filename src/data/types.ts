import { Either } from "fp-ts/lib/Either";
import { Option } from "fp-ts/lib/Option";
import { LatLngTuple } from "leaflet";

export type Event =
  "kv" |
  "au" |
  "su" |
  "hi" |
  "nt" |
  "ln" |
  "hs" |
  "pe" |
  "ps" |
  "hn" |
  "hj" |
  "pn";

export type Snowplow = {
  location_history: HistoryPoint[];
  id: string;
  last_location: HistoryPoint;
}

export type HistoryPoint = {
  timestamp: string,
  coords: LatLngTuple,
  events: Event[]
}

export type SnowplowsResponse = Either<Error, Snowplow[]>

export type SnowplowResponse = Either<Error, Option<Snowplow>>