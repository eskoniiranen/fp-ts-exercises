import { pipe } from "fp-ts/function";
import { Option, some } from "fp-ts/lib/Option";
import { map as TEMap, type TaskEither, tryCatch } from "fp-ts/TaskEither";
import { BaseApi } from "~/api/baseApi";
import { SnowplowResponse, SnowplowsResponse } from "./types";

export const createGetAllRequest = (
  api: BaseApi
): TaskEither<Error, SnowplowsResponse> =>
  pipe(
    tryCatch(
      () => api.getAll(),
      (error) => error instanceof Error ? error : new Error(`Error while getting all: ${error}`)
    ),
    TEMap((response) => response.data)
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
        (error) => error instanceof Error ? error : new Error(`Error while getting ${id}: ${error}`)
      ),
      TEMap((response) => some(response.data))
    );
