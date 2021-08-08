
import { getVideos } from "./request";

export default function getVideoInfo(){
  return getVideos({url:'getVideos'})
}