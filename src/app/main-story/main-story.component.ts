import { Component, inject } from '@angular/core';
import { MiniGameComponent } from '../mini-game/mini-game.component';
import { StoryFrameComponent } from '../story-frame/story-frame.component';
import { StoryDataService } from '../shared/service/story-data.service';
import { FrameTransition } from '../shared/models/frame-transition.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-story',
  standalone: true,
  imports: [MiniGameComponent, StoryFrameComponent, CommonModule],
  templateUrl: './main-story.component.html',
  styleUrl: './main-story.component.sass',
})
export class MainStoryComponent {
  public storyDataService = inject(StoryDataService);
  curFrame = 0;
  prevFrame = 0;
  saveMainStoryFrame = 0;
  MODE: 'main' | 'story' | 'game' = 'main';

  nextFrame(frameData: FrameTransition): void {
    console.log(`Next frame pos: ${frameData.framePos}`);
    if (frameData.isLinkedFrame) {
      //We are going to the linked story mode
      if (this.MODE == 'main') {
        // Current MODE is main story and we are going in to the linked story mode
        this.storyDataService.linkedStoryViewed(
          frameData.framePos,
          frameData.frameElementVal
        );
        this.MODE = 'story';
        this.saveMainStoryFrame = this.curFrame;
        this.prevFrame = frameData.framePos;
      }
    } else {
      if (this.saveMainStoryFrame == frameData.framePos) {
        if (this.MODE == 'story') {
          //Going back to the main story from linked story
          this.MODE = 'main';
          this.prevFrame = this.saveMainStoryFrame;
        }
      }
    }
    this.curFrame = frameData.framePos;
  }
}
