import { Component, inject } from '@angular/core';
import { MiniGameComponent } from '../mini-game/mini-game.component';
import { StoryFrameComponent } from '../story-frame/story-frame.component';
import { StoryDataService } from '../shared/service/story-data.service';

@Component({
  selector: 'app-main-story',
  standalone: true,
  imports: [MiniGameComponent, StoryFrameComponent],
  templateUrl: './main-story.component.html',
  styleUrl: './main-story.component.sass',
})
export class MainStoryComponent {
  storyDataService = inject(StoryDataService);
  curFrame = 0;
}
