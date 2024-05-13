import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { MiniGameComponent } from '../mini-game/mini-game.component';
import { StoryFrameComponent } from '../story-frame/story-frame.component';
import { StoryDataService } from '../shared/service/story-data.service';
import { FrameTransition } from '../shared/models/frame-transition.model';
import { CommonModule } from '@angular/common';
import { CurryGameComponent } from '../curry-game/curry-game.component';
import { StartAndEndComponent } from '../start-and-end/start-and-end.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
} from '@angular/material/dialog';
import { HintDialogComponent } from '../shared/dialogs/hint-dialog/hint-dialog.component';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { StoryImage } from '../shared/models/story-image.model';

@Component({
  selector: 'app-main-story',
  standalone: true,
  imports: [
    MiniGameComponent,
    StoryFrameComponent,
    CommonModule,
    CurryGameComponent,
    StartAndEndComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-story.component.html',
  styleUrl: './main-story.component.sass',
})
export class MainStoryComponent implements OnInit, AfterViewInit {
  public storyDataService = inject(StoryDataService);
  curFrame = 0;
  prevFrame = 0;
  saveMainStoryFrame = 0;
  MODE: 'start' | 'main' | 'story' | 'curry' | 'match' | 'end' = 'start';
  private audio = new Audio();
  audioText: 'PLAY' | 'PAUSE' = 'PLAY';
  hintDialog = inject(MatDialog);
  changeDetect = inject(ChangeDetectorRef);

  storyFrame: StoryImage | undefined;

  nextFrame(frameData: FrameTransition): void {
    this.playOrPauseMusic();
    console.log(`Next frame pos: ${frameData.framePos}`);
    console.log(`Saved frame pos: ${this.saveMainStoryFrame}`);
    if (frameData.isLinkedFrame) {
      //We are going to the linked story mode
      if (this.MODE == 'main') {
        // Current MODE is main story and we are going in to the linked story mode
        this.storyDataService.linkedStoryViewed(
          this.curFrame,
          frameData.frameElementVal
        );
        this.MODE = 'story';
        this.saveMainStoryFrame = this.curFrame;
        this.prevFrame = frameData.framePos;
        this.curFrame = frameData.framePos;
        this.loadFrame();
        this.changeDetect.detectChanges();
        return;
      }
    } else if (frameData.nextIsGame) {
      // We are going to the game mode
      this.MODE = frameData.nextIsGame;
      this.saveMainStoryFrame = frameData.framePos;
      this.curFrame = frameData.framePos;
      this.loadFrame();
      this.changeDetect.detectChanges();
      return;
    } else {
      if (this.saveMainStoryFrame == frameData.framePos) {
        if (this.MODE == 'story') {
          //Going back to the main story from linked story
          this.prevFrame = this.saveMainStoryFrame;
        }
        this.MODE = 'main';
        this.saveMainStoryFrame = 0;
        this.curFrame = frameData.framePos;
        this.loadFrame();
        this.changeDetect.detectChanges();
        return;
      }
    }

    if (frameData.framePos == this.storyDataService.getLimit()) {
      // Main story has ended
      this.MODE = 'end';
      this.changeDetect.detectChanges();
      return;
    }
    this.curFrame = frameData.framePos;
    this.loadFrame();
    this.changeDetect.detectChanges();
  }

  startGame() {
    this.MODE = 'main';
  }

  ngOnInit(): void {
    this.loadMusic(
      'Lovely Indian traditional Fusion music Royalty free download.mp3'
    );
    this.audioEventListeners();
    if (this.storyFrame == undefined) {
      this.loadFrame();
    }
  }

  ngAfterViewInit(): void {
    this.playOrPauseMusic();
    if (this.storyFrame == undefined) {
      this.loadFrame();
    }
  }

  loadFrame() {
    this.storyFrame = this.storyDataService.getFrame(this.curFrame);
  }

  loadMusic(file: string): void {
    this.audio.src = `assets/audio/${file}`;
    this.audio.loop = true;
  }

  playOrPauseMusic(): void {
    if (this.audio) {
      if (this.audioText == 'PLAY') {
        this.audio.play();
      } /*  else if (this.audioText == 'PAUSE') {
        this.audio.pause();
      } */
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

  showHint(hint: string, callback?: () => void) {
    /* const dialogRef = this.hintDialog.open(DialogDataExampleDialog, {
      data: '' + hint,
      width: '426px',
      height: '240px',
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        console.log(`Hint dialog closed.`);
        if (callback) {
          callback();
        }
      }); */
      alert(hint);
      if(callback)
        callback();
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.html',
  standalone: true,
  imports: [MatDialogContent],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public diaData: string) {
    console.log(diaData);
  }
}
