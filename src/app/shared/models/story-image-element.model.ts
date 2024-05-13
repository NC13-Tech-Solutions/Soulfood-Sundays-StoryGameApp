import { BasicElementData } from "./basic-element-data.model";

export interface StoryImageElement extends BasicElementData{
  isStoryLink: boolean;
  storyLinkedFrame: number;
  isNextButton: boolean;
  storyLinkViewed: boolean;
}
