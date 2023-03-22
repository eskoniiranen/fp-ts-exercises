import Api from "~/api";
import { createGetAllRequest, createGetOneRequest } from "./requests";

const requests = {
  getAll: createGetAllRequest(Api.snowplowApi),
  getOne: createGetOneRequest(Api.snowplowApi),
};

const Data = {
  getAll: async () => await requests.getAll(),
  getOne: async (id: string) => await requests.getOne(id)(),
};

export default Data;
