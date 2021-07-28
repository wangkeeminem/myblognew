


import publishInfo from "../types/publishInfo"

import {publishRequest} from "./request"
export function getpublishRequest(publishinfo:publishInfo) {
  return publishRequest({url:'/publish',data:publishinfo})
}