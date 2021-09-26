import axios from "axios";
import { checkStatusOK } from "axios-utils";

type ApiConfig = {
  publicKey: string;
  secretKey: string;
};

function makeClient(config: ApiConfig) {
  return axios.create({
    headers: {
      Accept: "application/vnd.uploadcare-v0.5+json",
      Authorization: `Uploadcare.Simple ${config.publicKey}:${config.secretKey}`,
    },
  });
}

export async function getFileGroups(config: ApiConfig) {
  const http = makeClient(config);
  const resp = await http.get("https://api.uploadcare.com/groups/");
  checkStatusOK(resp);
  return resp.data;
}

export async function getFileGroup(id: string, config: ApiConfig) {
  const http = makeClient(config);
  const resp = await http.get(`https://api.uploadcare.com/groups/${id}`);
  checkStatusOK(resp);
  return resp.data;
}
