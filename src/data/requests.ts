import { AxiosResponse } from "axios";
import { pipe } from "fp-ts/function";
import { map, type TaskEither, tryCatch } from "fp-ts/TaskEither";
import { BaseApi } from "../api/baseApi";

export const createGetAllRequest = (api: BaseApi): TaskEither<Error, AxiosResponse> => pipe(
  tryCatch(
    () => api.withParams({
      history: 10,
      temporal_resolution: 10
    }).getAll(),
    (error) => new Error(`Error while getting all: ${error}`)
  ),
  map((response) => response.data)
);

// export const createGetOneRequest = (api: BaseApi): (id: string) => TaskEither<Error, AxiosResponse> => (id: string) => pipe(
export const createGetOneRequest = (api: BaseApi) => (id: string) => pipe(
  tryCatch(
    () => api.withParams({
      history: 500,
      temporal_resolution: 15
    }).findById(id),
    (error) => new Error(`Error while getting ${id}: ${error}`)
  ),
  map((response) => response.data)
);
