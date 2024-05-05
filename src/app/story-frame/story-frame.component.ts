import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-story-frame',
  standalone: true,
  imports: [],
  templateUrl: './story-frame.component.html',
  styleUrl: './story-frame.component.sass',
})
export class StoryFrameComponent implements OnInit, AfterViewInit {
  @ViewChild('imageFrame') imageFrameElementRef:
    | ElementRef<HTMLDivElement>
    | undefined;
  private imageFrameRef: HTMLDivElement | undefined;
  private audio = new Audio();
  audioText: 'PLAY' | 'PAUSE' = 'PLAY';
  ngOnInit(): void {
    this.loadMusic('Frag Out Voice Lines - Apex Legends.mp3');
    this.audioEventListeners();
  }
  ngAfterViewInit(): void {
    if (this.imageFrameElementRef) {
      this.imageFrameRef = this.imageFrameElementRef.nativeElement;
      this.loadBgImage('KMOTR.png');
    }
  }

  loadMusic(file: string): void {
    this.audio.src = `assets/audio/${file}`;
  }

  loadBgImage(file: string): void {
    if (this.imageFrameRef)
      this.imageFrameRef.style.backgroundImage = `url('assets/img/${file}')`;
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
}
