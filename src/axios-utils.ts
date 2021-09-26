import { AxiosResponse } from "axios";

function isStatusOK(status: number) {
  return status >= 200 && status < 300;
}

export function checkStatusOK(resp: AxiosResponse) {
  if (!isStatusOK(resp.status)) {
    throw new Error(JSON.stringify(resp.data));
  }
}
