import Api from "../api";
import { createGetAllRequest, createGetOneRequest } from "./requests";

const requests = {
  all: createGetAllRequest(Api.snowplowApi),
  one: createGetOneRequest(Api.snowplowApi),
};

const Data = {
  getAll: async () => await requests.all(),
  getOne: async (id: string) => await requests.one(id)(),
};

export default Data;
