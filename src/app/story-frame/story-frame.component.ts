import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { StoryImage } from '../shared/models/story-image.model';
import { StoryImageElement } from '../shared/models/story-image-element.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FrameTransition } from '../shared/models/frame-transition.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story-frame',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './story-frame.component.html',
  styleUrl: './story-frame.component.sass',
})
export class StoryFrameComponent implements OnInit, AfterViewInit {
  storyInput = input.required<StoryImage>();
  frameChange = output<FrameTransition>();
  changeDetect = inject(ChangeDetectorRef);

  @ViewChild('imageFrame') imageFrameElementRef:
    | ElementRef<HTMLDivElement>
    | undefined;
  private imageFrameRef: HTMLDivElement | undefined;
  oneSecDelay = false;
  onTransition = false;
  leftTransition = false;
  rightTransition = false;
  nextFrameTransition = false;

  constructor() {
    effect(() => {
      this.loadBgImage(this.storyInput().backgroundSrc);
      this.start1secDelay();
    });
  }
  ngOnInit(): void {
    this.loadBgImage(this.storyInput().backgroundSrc);
  }

  ngAfterViewInit(): void {
    this.loadBgImage(this.storyInput().backgroundSrc);
    this.start1secDelay();
  }

  loadBgImage(file: string): void {
    if (this.imageFrameElementRef) {
      this.imageFrameRef = this.imageFrameElementRef.nativeElement;
      if (this.imageFrameRef)
        this.imageFrameRef.style.backgroundImage = `url('${this.getImageSrc(
          file
        )}')`;
    }
  }

  booleanForImg(isStoryLink: boolean, storyLinkViewed: boolean): boolean {
    if (isStoryLink && !storyLinkViewed && !this.oneSecDelay) {
      return true;
    }
    return false;
  }

  booleanForElementAnimation(): boolean {
    if (this.onTransition) return false;
    if (this.oneSecDelay) return false;
    return true;
  }

  getImageSrc(file: string): string {
    return `assets/img/${file}`;
  }

  getStyleData(data: StoryImageElement): string {
    return `position: absolute; top: ${data.yPos}; left: ${data.xPos}; height: ${data.height}; width: ${data.width};`;
  }

  goToNextFrame(): void {
    const genFunc = () => {
      this.frameChange.emit({
        framePos: this.storyInput().nextFrame,
        isLinkedFrame: false,
        frameElementVal: 0,
        nextIsGame: this.storyInput().nextGameIs,
      });
    };

    if (this.storyInput().shouldTransition) {
      this.leftTransition = true;
      this.startFrameTransition(() => {
        this.leftTransition = false;
        genFunc();
      });
    } else {
      genFunc();
    }
  }

  goToPrevFrame(): void {
    const genFunc = () => {
      this.frameChange.emit({
        framePos: this.storyInput().prevFrame,
        isLinkedFrame: false,
        frameElementVal: 0,
      });
    };

    if (this.storyInput().shouldTransition) {
      this.rightTransition = true;
      this.startFrameTransition(() => {
        this.rightTransition = false;
        genFunc();
      });
    } else {
      genFunc();
    }
  }

  goToLinkedFrame(framePos: number, frameElementVal: number): void {
    const genFunc = () => {
      this.frameChange.emit({
        framePos: framePos,
        isLinkedFrame: true,
        frameElementVal: frameElementVal,
      });
    };

    if (this.storyInput().shouldTransition) {
      this.rightTransition = true;
      this.startFrameTransition(() => {
        this.rightTransition = false;
        genFunc();
      });
    } else {
      genFunc();
    }
  }

  startFrameTransition(callback: () => void): void {
    console.log('Started frame Transition');

    this.onTransition = true;
      this.changeDetect.detectChanges();
    setTimeout(() => {
      console.log('Transition complete');
      this.onTransition = false;
      this.changeDetect.detectChanges();
      callback();
    }, 1000);
  }

  start1secDelay(): void {
    this.oneSecDelay = true;
    setTimeout(() => {
      this.oneSecDelay = false;
      this.changeDetect.detectChanges();
    }, 1200);
  }

  functionCallBasedOnLogic(
    isStoryLink: boolean,
    isNextButton: boolean,
    storyLinkedFrame: number,
    index: number
  ): void {
    if (isNextButton) {
      this.goToNextFrame();
    } else if (isStoryLink) {
      this.goToLinkedFrame(storyLinkedFrame, index);
    }
  }
}
