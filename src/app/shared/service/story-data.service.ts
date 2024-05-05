import { Injectable } from '@angular/core';
import { StoryImage } from '../models/story-image.model';

@Injectable({
  providedIn: 'root',
})
export class StoryDataService {
  private data: StoryImage[] = [];
  constructor() {}

  getFrame(pos: number): StoryImage {
    return this.data[pos];
  }

  getLimit(): number{
    return this.data.length;
  }
}
