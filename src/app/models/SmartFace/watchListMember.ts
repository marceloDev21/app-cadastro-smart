import { Images } from "./Images";
import { FaceDetectorConfig } from "./faceDetectorConfig";
import { v4 as uuidv4 } from 'uuid';


export class WatchListMember{

  id: string = uuidv4();
  images = new Array<Images>();
  watchlistIds: string[] = [];
  faceDetectorConfig = new FaceDetectorConfig();
  faceDetectorResourceId ='cpu';
  templateGeneratorResourceId = 'cpu';
  keepAutoLearnPhotos = false;
  displayName = '';
  fullName = '';
  labels =  new Array<string>;

}
