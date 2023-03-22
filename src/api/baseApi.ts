import axios, { type AxiosPromise } from "axios";
import { type SnowplowRequest } from "./types";

export class BaseApi {
  url: string;
  params: {};

  constructor(url: string) {
    this.url = url;
    this.params = {};
  }

  withParams = (params: SnowplowRequest): this => {
    this.params = params;

    return this;
  };

  getAll = async (): AxiosPromise => {
    const response = await axios.get(this.url + this._joinParams(this.params));
    this.params = {};

    return response;
  };

  findById = async (id: string): AxiosPromise => {
    const response = await axios.get(
      this.url + id + this._joinParams(this.params)
    );
    this.params = {};

    return response;
  };

  _joinParams = (params: SnowplowRequest) =>
    "?" +
    Object.entries(params)
      .map((KVPair) => KVPair.join("="))
      .join("&");
}
