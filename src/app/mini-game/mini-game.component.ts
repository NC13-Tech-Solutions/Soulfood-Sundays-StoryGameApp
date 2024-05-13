import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  output,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MiniGameImage } from '../shared/models/mini-game-image.model';
import { FrameTransition } from '../shared/models/frame-transition.model';
import { MiniGameImageElement } from '../shared/models/mini-game-image-element.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, CommonModule],
  templateUrl: './mini-game.component.html',
  styleUrl: './mini-game.component.sass',
})
export class MiniGameComponent implements AfterViewInit {
  gameData: MiniGameImage = {
    backgroundSrc: 'match_game_bg.png',
    elements: [
      {
        classes: '',
        src: 'scene_10_e2.png',
        styles: '',
        hint: 'blue-ish pot',
        id: 0,
        matchId: 1,
        isActive: true,
        height: '20.83%',
        width: '16.82%',
        xPos: '40.83%',
        yPos: '62.69%',
      },
      {
        classes: '',
        src: 'mg_e2.png',
        styles: '',
        hint: 'look for chicken',
        id: 1,
        matchId: 0,
        isActive: true,
        height: '11.85%',
        width: '9.11%',
        xPos: '72.34%',
        yPos: '53.43%',
      },
      {
        classes: '',
        src: 'scene_10_e1.png',
        styles: '',
        hint: 'steely pot',
        id: 2,
        matchId: 3,
        isActive: true,
        height: '18.06%',
        width: '13.18%',
        xPos: '5.73%',
        yPos: '23.8%',
      },
      {
        classes: '',
        src: 'mg_e3.png',
        styles: '',
        hint: 'a sweet desert',
        id: 3,
        matchId: 2,
        isActive: true,
        height: '11.94%',
        width: '6.25%',
        xPos: '81.46%',
        yPos: '53.33%',
      },
      {
        classes: '',
        src: 'scene_10_e5.png',
        styles: '',
        hint: 'gold-ish pot',
        id: 4,
        matchId: 5,
        isActive: true,
        height: '23.43%',
        width: '14.06%',
        xPos: '42.97%',
        yPos: '20.09%',
      },
      {
        classes: '',
        src: 'mg_e1.png',
        styles: '',
        hint: 'potato potato',
        id: 5,
        matchId: 4,
        isActive: true,
        height: '13.15%',
        width: '9.01%',
        xPos: '78.12%',
        yPos: '20.93%',
      },
      {
        classes: '',
        src: 'scene_10_e3.png',
        styles: '',
        hint: 'bronze pot',
        id: 6,
        matchId: 7,
        isActive: true,
        height: '21.39%',
        width: '17.5%',
        xPos: '20.99%',
        yPos: '22.13%',
      },
      {
        classes: '',
        src: 'mg_e4.png',
        styles: '',
        hint: 'large curry pot',
        id: 7,
        matchId: 6,
        isActive: true,
        height: '13.61%',
        width: '7.45%',
        xPos: '80.05%',
        yPos: '36.39%',
      },
      {
        classes: '',
        src: 'scene_10_e4.png',
        styles: '',
        hint: 'none',
        id: 8,
        matchId: 9,
        isActive: true,
        height: '25.28%',
        width: '14.79%',
        xPos: '22.34%',
        yPos: '60.46%',
      },
      {
        classes: '',
        src: 'mg_e4.png',
        styles: '',
        hint: 'none',
        id: 9,
        matchId: 8,
        isActive: true,
        height: '13.61%',
        width: '7.45%',
        xPos: '72.24%',
        yPos: '36.39%',
      },
      {
        classes: '',
        src: 'scene_10_e6.png',
        styles: '',
        hint: 'none',
        id: 10,
        matchId: 11,
        isActive: true,
        height: '25.83%',
        width: '13.59%',
        xPos: '5.52%',
        yPos: '60.46%',
      },
      {
        classes: '',
        src: 'mg_e5.png',
        styles: '',
        hint: 'none',
        id: 11,
        matchId: 10,
        isActive: true,
        height: '12.41%',
        width: '5.99%',
        xPos: '72.29%',
        yPos: '22.41%',
      },
    ],
    nextFrame: 35,
  };

  selectedElement = -1;
  animationElement = -1;
  changeDetect = inject(ChangeDetectorRef);

  frameChange = output<FrameTransition>();
  hintModalCall = output<{ hint: string; callback?: () => void }>();
  @ViewChild('matchingCanvas') matchingCanvasElementRef:
    | ElementRef<HTMLDivElement>
    | undefined;
  private matchingCanvasRef: HTMLDivElement | undefined;

  ngAfterViewInit(): void {
    if (this.matchingCanvasElementRef) {
      this.matchingCanvasRef = this.matchingCanvasElementRef.nativeElement;
      this.loadBgImage(this.gameData.backgroundSrc);
    }
  }

  loadBgImage(file: string): void {
    if (this.matchingCanvasRef)
      this.matchingCanvasRef.style.backgroundImage = `url('${this.getImageSrc(
        file
      )}')`;
    this.changeDetect.detectChanges();
  }

  getImageSrc(file: string): string {
    return `assets/img/${file}`;
  }

  getStyleData(data: MiniGameImageElement): string {
    return `position: absolute; top: ${data.yPos}; left: ${data.xPos}; height: ${data.height}; width: ${data.width};`;
  }

  goToNextFrame(): void {
    this.frameChange.emit({
      framePos: this.gameData.nextFrame,
      isLinkedFrame: false,
      frameElementVal: 0,
    });
  }

  unSelectElement() {
    this.selectedElement = -1;
  }

  selectElement(id: number) {
    let elementPos = this.findIndexFromId(id);
    if (elementPos == -1) {
      console.log('Unable to find element');
      return;
    }
    if (this.selectedElement == -1) {
      // No element currently selected
      this.selectedElement = id;
    } else {
      // One element currently selected
      if (this.gameData.elements[this.selectedElement].matchId == id) {
        // Match found
        this.gameData.elements[this.selectedElement].isActive = false;
        this.gameData.elements[elementPos].isActive = false;
        this.selectedElement = -1;
        this.animationElement = id;
        this.startAnimationDelay(() => {
          this.animationElement = -1;
          if (this.checkIfGameIsFinished()) {
            this.showHint(
              'Congratulations! You have finished the matching vessels to curries game.',
              () => {
                this.goToNextFrame();
              }
            );
          }
        });
      } else {
        // Not matching
        this.showHint('Sorry. Thats not the one. Hint: '+this.gameData.elements[this.selectedElement].hint);
      }
    }
    this.changeDetect.detectChanges();
  }

  findIndexFromId(id: number): number {
    for (let x = 0; x < this.gameData.elements.length; x++) {
      if (this.gameData.elements[x].id === id) {
        return x;
      }
    }
    return -1;
  }

  showHint(hint: string, callback?: () => void) {
    this.hintModalCall.emit({
      hint,
      callback,
    });
  }

  booleanForHidingImg(id: number, isActive: boolean): boolean {
    if (isActive) return false;
    if (this.animationElement == id) return false;

    return true;
  }

  startAnimationDelay(callback?: () => void): void {
    setTimeout(() => {
      if (callback) {
        callback();
      }
    }, 1200);
  }

  checkIfGameIsFinished(): boolean {
    for (let x of this.gameData.elements) {
      if (x.isActive) {
        return false;
      }
    }
    return true;
  }
}
