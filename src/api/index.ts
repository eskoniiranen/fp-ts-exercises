import { SNOWPLOW_URL } from "~/constants";
import { BaseApi } from "./baseApi";

const Api = {
  snowplowApi: new BaseApi(SNOWPLOW_URL),
};

export default Api;
