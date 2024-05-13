import { MiniGameImageElement } from "./mini-game-image-element.model";

export interface MiniGameImage {
  nextFrame:  number;
  elements: MiniGameImageElement[];
  backgroundSrc: string;
}
