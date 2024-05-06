import { Injectable } from '@angular/core';
import { StoryImage } from '../models/story-image.model';

@Injectable({
  providedIn: 'root',
})
export class StoryDataService {
  private data: StoryImage[] = [
    {
      backgroundSrc: 'IMG_3579.PNG',
      elements: [
        {
          classes: 'animation top-to-bottom',
          height: '40.83%',
          isStoryLink: false,
          src: 'IMG_3580.PNG',
          storyLinkedFrame: -1,
          storyLinkViewed: false,
          styles: '',
          width: '33.23%',
          xPos: '34.79%',
          yPos: '27.41%',
        },
        {
          classes: 'animation left-to-right',
          height: '26.76%',
          isStoryLink: false,
          src: 'IMG_3581.PNG',
          storyLinkedFrame: -1,
          storyLinkViewed: false,
          styles: '',
          width: '19.43%',
          xPos: '18.54%',
          yPos: '11.11%',
        },
        {
          classes: 'animation right-to-left',
          height: '18.70%',
          isStoryLink: true,
          src: 'IMG_3583.PNG',
          storyLinkedFrame: 0,
          storyLinkViewed: false,
          styles: '',
          width: '10.89%',
          xPos: '69.06%',
          yPos: '45.37%',
        },
      ],
      nextFrame: 0, //TODO: This is only for testing. Change this as soon as we get the full frames
      prevFrame: 0,
    },
  ];
  constructor() {}

  getFrame(pos: number): StoryImage {
    return this.data[pos];
  }

  getLimit(): number {
    return this.data.length;
  }

  linkedStoryViewed(pos: number, fElemPos: number): void {
    this.data[pos].elements[fElemPos].storyLinkViewed = true;
  }
}
