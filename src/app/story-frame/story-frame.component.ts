import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
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
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './story-frame.component.html',
  styleUrl: './story-frame.component.sass',
})
export class StoryFrameComponent implements OnInit, AfterViewInit {
  @Input('storyInput') storyInput!: StoryImage;
  frameChange = output<FrameTransition>();
  @ViewChild('imageFrame') imageFrameElementRef:
    | ElementRef<HTMLDivElement>
    | undefined;
  private imageFrameRef: HTMLDivElement | undefined;
  private audio = new Audio();
  audioText: 'PLAY' | 'PAUSE' = 'PLAY';
  oneSecDelay = false;
  onTransition = false;
  leftTransition = false;
  rightTransition = false;
  nextFrameTransition = false;

  ngOnInit(): void {
    this.loadMusic('Frag Out Voice Lines - Apex Legends.mp3');
    this.audioEventListeners();
  }
  ngAfterViewInit(): void {
    if (this.imageFrameElementRef) {
      this.imageFrameRef = this.imageFrameElementRef.nativeElement;
      this.loadBgImage(this.storyInput.backgroundSrc);
    }
    this.start1secDelay();
  }

  loadMusic(file: string): void {
    this.audio.src = `assets/audio/${file}`;
  }

  loadBgImage(file: string): void {
    if (this.imageFrameRef)
      this.imageFrameRef.style.backgroundImage = `url('${this.getImageSrc(
        file
      )}')`;
  }

  booleanForImg(isStoryLink: boolean, storyLinkViewed: boolean): boolean {
    if (isStoryLink && !storyLinkViewed && this.oneSecDelay) {
      return true;
    }
    return false;
  }

  getImageSrc(file: string): string {
    return `assets/img/${file}`;
  }

  playOrPauseMusic(): void {
    if (this.audio) {
      if (this.audioText == 'PLAY') {
        this.audio.play();
      } else if (this.audioText == 'PAUSE') {
        this.audio.pause();
      }
    }
  }

  audioEventListeners(): void {
    this.audio.addEventListener('play', () => {
      this.audioText = 'PAUSE';
      console.log('Audio played');
    });

    this.audio.addEventListener('ended', (ev) => {
      this.audioText = 'PLAY';
      console.log(`Audio ended. Event = ${ev}`);
    });

    this.audio.addEventListener('pause', () => {
      this.audioText = 'PLAY';
      console.log('Audio paused');
    });
  }

  getStyleData(data: StoryImageElement): string {
    return `position: absolute; top: ${data.yPos}; left: ${data.xPos}; height: ${data.height}; width: ${data.width};`;
  }

  goToNextFrame(): void {
    this.leftTransition = true;
    this.startFrameTransition(() => {
      this.leftTransition = false;
      this.frameChange.emit({
        framePos: this.storyInput.nextFrame,
        isLinkedFrame: false,
        frameElementVal: 0,
      });
    });
  }

  goToPrevFrame(): void {
    this.rightTransition = true;
    this.startFrameTransition(() => {
      this.rightTransition = false;
      this.frameChange.emit({
        framePos: this.storyInput.prevFrame,
        isLinkedFrame: false,
        frameElementVal: 0,
      });
    });
  }

  goToLinkedFrame(framePos: number, frameElementVal: number): void {
    console.log(
      `Linked frame pos: ${framePos} and frame element pos: ${frameElementVal}`
    );
    this.leftTransition = true;

    this.startFrameTransition(() => {
      this.leftTransition = false;
      this.frameChange.emit({
        framePos: framePos,
        isLinkedFrame: true,
        frameElementVal: frameElementVal,
      });
    });
  }

  startFrameTransition(callback: () => void): void {
    console.log('Started frame Transition');

    this.onTransition = true;
    setTimeout(() => {
      console.log('Transition complete');
      this.start1secDelay();
      this.onTransition = false;
      callback();
    }, 1000);
  }

  start1secDelay(): void {
    this.oneSecDelay = false;
    setTimeout(() => {
      this.oneSecDelay = true;
    }, 1200);
  }
}
