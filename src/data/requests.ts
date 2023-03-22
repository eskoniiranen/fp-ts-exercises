import { pipe } from "fp-ts/function";
import { fromNullable, Option } from "fp-ts/lib/Option";
import { map, type TaskEither, tryCatch } from "fp-ts/TaskEither";
import { BaseApi } from "~/api/baseApi";
import { SnowplowResponse, SnowplowsResponse } from "./types";

export const createGetAllRequest = (
  api: BaseApi
): TaskEither<Error, SnowplowsResponse> =>
  pipe(
    tryCatch(
      () => api.getAll(),
      (error) => new Error(`Error while getting all: ${error}`)
    ),
    map((response) => response.data)
  );

export const createGetOneRequest =
  (
    api: BaseApi
  ): ((id: string) => TaskEither<Error, Option<SnowplowResponse>>) =>
  (id: string) =>
    pipe(
      tryCatch(
        () =>
          api
            .withParams({
              history: 500,
              temporal_resolution: 15,
            })
            .findById(id),
        (error) => new Error(`Error while getting ${id}: ${error}`)
      ),
      map((response) => fromNullable(response.data))
    );
