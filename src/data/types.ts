import { type Either } from "fp-ts/lib/Either";
import { type LatLngTuple } from "leaflet";

export type PlowEvent =
  | "kv"
  | "au"
  | "su"
  | "hi"
  | "nt"
  | "ln"
  | "hs"
  | "pe"
  | "ps"
  | "hn"
  | "hj"
  | "pn";

export type Snowplow = {
  location_history: HistoryPoint[];
  id: string;
  last_location: HistoryPoint;
};

export type HistoryPoint = {
  timestamp: string;
  coords: LatLngTuple;
  events: PlowEvent[];
};

export type SnowplowsResponse = Either<Error, Snowplow[]>;

export type SnowplowResponse = Either<Error, Snowplow>;
