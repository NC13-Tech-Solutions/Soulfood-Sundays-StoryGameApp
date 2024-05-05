import { StoryImageElement } from "./story-image-element.model";

export interface StoryImage {
  prevFrame: number;
  nextFrame: number;
  elements: StoryImageElement[];
  backgroundSrc: string;
}
