import { Advice } from './advice';
import { Image } from './image';

export class Documento {
  image = new Image();
  advice: Advice = new Advice();
}
