import {
  CdkDragDrop,
  CdkDragRelease,
  CdkDragStart,
  DragDropModule,
} from '@angular/cdk/drag-drop';
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
import { CurryGameData } from '../shared/models/curry-game-data.model';
import { FrameTransition } from '../shared/models/frame-transition.model';
import { CurryGameDataElement } from '../shared/models/curry-game-data-element.model';
import { CurryGameDataVessel } from '../shared/models/curry-game-data-vessel.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curry-game',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './curry-game.component.html',
  styleUrl: './curry-game.component.sass',
})
export class CurryGameComponent implements AfterViewInit {
  gameData: CurryGameData = {
    backgroundSrc: 'curry_game_bg.png',
    fishElement: {
      //fish
      evolutionData: [
        {
          src: 'cg_e20.png',
        },
      ],
      classes: '',
      src: 'cg_e2.png',
      styles: '',
      height: '16.85%',
      width: '13.54%',
      xPos: '0.05%',
      yPos: '33.15%',
    },
    masalaElements: [
      {
        //salt
        classes: 'movable',
        src: 'cg_e4.png',
        isActive: true,
        styles: '',
        height: '10.56%',
        width: '7.14%',
        xPos: '6.46%',
        yPos: '2.04%',
      },
      {
        //pepper
        classes: 'movable',
        src: 'cg_e5.png',
        isActive: true,
        styles: '',
        height: '10.56%',
        width: '7.03%',
        xPos: '13.7%',
        yPos: '2.13%',
      },
      {
        //turmeric
        classes: 'movable',
        src: 'cg_e6.png',
        isActive: true,
        styles: '',
        height: '12.31%',
        width: '7.08%',
        xPos: '20.78%',
        yPos: '1.2%',
      },
      {
        //chilly
        classes: 'movable',
        src: 'cg_e7.png',
        isActive: true,
        styles: '',
        height: '13.8%',
        width: '9.48%',
        xPos: '27.92%',
        yPos: '1.76%',
      },
      {
        //coriander
        classes: 'movable',
        src: 'cg_e8.png',
        isActive: true,
        styles: '',
        height: '10.19%',
        width: '5.94%',
        xPos: '38.12%',
        yPos: '2.31%',
      },
    ],
    masalaMixingAreaElement: {
      evolutionData: [
        {
          src: 'cg_e10.png',
        },
        {
          src: 'cg_e11.png',
        },
        {
          src: 'cg_e12.png',
        },
        {
          src: 'cg_e13.png',
        },
        {
          src: 'cg_e14.png',
        },
      ],
      classes: '',
      src: 'cg_e9.png',
      styles: '',
      height: '26.11%',
      width: '15.21%',
      xPos: '30.52%',
      yPos: '28.52%',
    },
    panElement: {
      evolutionData: [
        {
          src: 'cg_e18.png',
        },
        {
          src: 'cg_e19.png',
        },
        {
          src: 'cg_e16.png',
        },
      ],
      classes: '',
      src: 'cg_e17.png',
      styles: '',
      height: '20.93%',
      width: '36.41%',
      xPos: '7.66%',
      yPos: '79.26%',
    },
    readyToCookElements: [
      {
        //curry leaves
        classes: 'movable',
        src: 'cg_e1.png',
        styles: '',
        isActive: true,
        height: '16.11%',
        width: '8.23%',
        xPos: '0.05%',
        yPos: '15.65%',
      },
      {
        //oil
        classes: 'movable',
        src: 'cg_e3.png',
        styles: '',
        isActive: true,
        height: '23.52%',
        width: '7.71%',
        xPos: '0.78%',
        yPos: '51.2%',
      },
    ],
    nextFrame: 10,
  };

  frameChange = output<FrameTransition>();
  changeDetect = inject(ChangeDetectorRef);

  hintModalCall = output<{ hint: string; callback?: () => void }>();
  @ViewChild('curryCanvas') curryCanvasElementRef:
    | ElementRef<HTMLDivElement>
    | undefined;
  @ViewChild('masalaDropZone') masalaDropZoneElementRef:
    | ElementRef<HTMLImageElement>
    | undefined;
  @ViewChild('fishMasalaDropZone') fishMasalaDropZoneElementRef:
    | ElementRef<HTMLImageElement>
    | undefined;
  @ViewChild('rtcDropZone') rtcDropZoneElementRef:
    | ElementRef<HTMLImageElement>
    | undefined;
  private curryCanvasRef: HTMLDivElement | undefined;

  masalaDraggedIndex = -1;
  masalaAnimationPos = -1;
  fishMasalaDraggedIndex = -1;
  fishMasalaAnimationPos = -1;
  rtcDraggedIndex = -1;
  rtcAnimationPos = -1;

  fishMasalaLoading = false;
  newRtcElementIndex = -1;

  stockFishElementSrc = this.gameData.fishElement.src;
  stockMasalaMixElementSrc = this.gameData.masalaMixingAreaElement.src;
  stockPanElementSrc = this.gameData.panElement.src;

  masalaMixEvolution = 0;
  fishEvolution = 0;
  panEvolution = 0;
  masalaOrder: number[] = [3, 2, 4, 1, 0];
  panOrder: number[] = [1, 0, 2];

  ngAfterViewInit(): void {
    if (this.curryCanvasElementRef) {
      this.curryCanvasRef = this.curryCanvasElementRef.nativeElement;
      this.loadBgImage(this.gameData.backgroundSrc);
    }
  }

  loadBgImage(file: string): void {
    if (this.curryCanvasRef) {
      this.curryCanvasRef.style.backgroundImage = `url('${this.getImageSrc(
        file
      )}')`;
    }
    this.changeDetect.detectChanges();
  }

  getImageSrc(file: string): string {
    return `assets/img/${file}`;
  }

  getStyleData(data: CurryGameDataElement): string;
  getStyleData(data: CurryGameDataVessel): string;

  getStyleData(data: CurryGameDataElement | CurryGameDataVessel): string {
    return `position: absolute; top: ${data.yPos}; left: ${data.xPos}; height: ${data.height}; width: ${data.width};`;
  }

  goToNextFrame(): void {
    this.frameChange.emit({
      framePos: this.gameData.nextFrame,
      isLinkedFrame: false,
      frameElementVal: -1,
    });
  }

  itemDragStarted(
    elementDetail: string,
    elemPos: number,
    cdkObject: CdkDragStart
  ): void {
    if (elementDetail == 'masala') this.masalaDraggedIndex = elemPos;
    else if (elementDetail == 'fish masala')
      this.fishMasalaDraggedIndex = elemPos;
    else if (elementDetail == 'ready') this.rtcDraggedIndex = elemPos;
  }

  itemDragEnded(
    elementDetail: string,
    elemPos: number,
    cdkObject: CdkDragRelease
  ): void {
    if (elementDetail == 'masala') {
      this.masalaDraggedIndex = -1;
      if (
        this.calculateIfInsideBoundary(
          elemPos,
          cdkObject.source.element.nativeElement,
          elementDetail
        )
      ) {
        // Masala drop successful
        this.masalaAnimationPos = elemPos;
        this.gameData.masalaElements[elemPos].isActive = false;
        this.loadEvolvedData('masala');
        this.startAnimationDelay(() => {
          this.masalaAnimationPos = -1;
          if (this.checkIfMasalaComplete()) {
            // Main masala is complete. So we load fish Masala to apply it to the fish
            this.loadFishMasala();
            this.fishMasalaLoading = true;
            this.startAnimationDelay(() => {
              this.fishMasalaLoading = false;
              this.loadEvolvedData('masala');
            });
          }
        });
      } else {
        // Masala drop failed
        this.resetTransitions(cdkObject);
      }
    } else if (elementDetail == 'fish masala') {
      if (this.gameData.fishMasala) {
        this.fishMasalaDraggedIndex = -1;
        if (
          this.calculateIfInsideBoundary(
            elemPos,
            cdkObject.source.element.nativeElement,
            elementDetail
          )
        ) {
          // Fish Masala drop successful
          this.fishMasalaAnimationPos = elemPos;
          this.gameData.fishMasala.isActive = false;
          this.loadEvolvedData('fish masala');
          this.startAnimationDelay(() => {
            this.fishMasalaAnimationPos = -1;
            // Fish is ready to cook
            this.loadRtcFish();
            this.newRtcElementIndex =
              this.gameData.readyToCookElements.length - 1;
            this.startAnimationDelay(() => {
              this.newRtcElementIndex = -1;
              this.loadEvolvedData('fish masala');
            });
          });
        } else {
          // Fish Masala drop failed
          this.resetTransitions(cdkObject);
        }
      }
    } else if (elementDetail == 'ready') {
      this.rtcDraggedIndex = -1;
      if (
        this.calculateIfInsideBoundary(
          elemPos,
          cdkObject.source.element.nativeElement,
          elementDetail
        )
      ) {
        // Ready To Cook item drop successful
        this.rtcAnimationPos = elemPos;
        this.gameData.readyToCookElements[elemPos].isActive = false;
        this.loadEvolvedData('ready');
        this.startAnimationDelay(() => {
          this.rtcAnimationPos = -1;
          if (this.checkIfGameIsFinished()) {
            this.showHint(
              'Congratulations! You have finished the fish fry making game.',
              () => {
                this.goToNextFrame();
              }
            );
          }
        });
        // TODO: Evolved data will be loaded inside the Pan Area
      } else {
        // Ready To Cook item drop failed
        this.resetTransitions(cdkObject);
      }
    }
  }

  showHint(hint: string, callback?: () => void) {
    this.hintModalCall.emit({
      hint,
      callback,
    });
  }

  resetTransitions(cdkObject: CdkDragRelease) {
    cdkObject.source._dragRef.reset();
  }

  calculateIfInsideBoundary(
    elemPos: number,
    elemRef: HTMLElement,
    zone: 'masala' | 'fish masala' | 'ready'
  ): boolean {
    if (zone == 'masala') {
      if (this.masalaDropZoneElementRef) {
        const masalaDropZoneRef = this.masalaDropZoneElementRef.nativeElement;
        const dropZoneRect = masalaDropZoneRef.getBoundingClientRect();

        const masalaRect = elemRef.getBoundingClientRect();
        let zoneInfo = this.ifInsideZone(dropZoneRect, masalaRect);
        if (zoneInfo) {
          // Inside zone. Now we check if its in the correct order
          return this.isCorrectMasalaOrder(elemPos);
        }
        return false;
      }
    } else if (zone == 'fish masala') {
      if (this.fishMasalaDropZoneElementRef) {
        const fishMasalaDropZoneRef =
          this.fishMasalaDropZoneElementRef.nativeElement;
        const dropZoneRect = fishMasalaDropZoneRef.getBoundingClientRect();

        const fishMasalaRect = elemRef.getBoundingClientRect();
        return this.ifInsideZone(dropZoneRect, fishMasalaRect);
      }
    } else if (zone == 'ready') {
      if (this.rtcDropZoneElementRef) {
        const rtcDropZoneRef = this.rtcDropZoneElementRef.nativeElement;
        const dropZoneRect = rtcDropZoneRef.getBoundingClientRect();

        const rtcRect = elemRef.getBoundingClientRect();
        let zoneInfo = this.ifInsideZone(dropZoneRect, rtcRect);
        if (zoneInfo) {
          // Inside zone. Now we check if its in the correct order
          return this.isCorrectRtcOrder(elemPos);
        }
        return false;
      }
    }

    return false;
  }

  ifInsideZone(zone: DOMRect, e: DOMRect): boolean {
    const BUFFER = 40; //TODO: Change this to make the zone smaller or bigger. Bigger the buffer lesser the zone will be.
    const zTop = zone.top;
    const zLeft = zone.left;
    const zRight = zone.right;
    const zBottom = zone.bottom;

    if (
      zRight - BUFFER <= e.left ||
      zLeft + BUFFER >= e.right ||
      zTop + BUFFER >= e.bottom ||
      zBottom - BUFFER <= e.top
    ) {
      return false;
    }
    return true;
  }

  booleanForHidingElement(
    elementDetail: string,
    index: number,
    isActive: boolean
  ) {
    if (elementDetail == 'masala') {
      if (isActive) return false;
      if (this.masalaAnimationPos == index) return false;
    } else if (elementDetail == 'fish masala') {
      if (isActive) return false;
      if (this.fishMasalaAnimationPos == index) return false;
    } else if (elementDetail == 'ready') {
      if (isActive) return false;
      if (this.rtcAnimationPos == index) return false;
    }

    return true;
  }

  startAnimationDelay(callback?: () => void): void {
    setTimeout(() => {
      if (callback) {
        callback();
        this.changeDetect.detectChanges();
      }
    }, 1200);
  }

  isCorrectMasalaOrder(elemPos: number) {
    if (this.masalaOrder[this.masalaMixEvolution] == elemPos) {
      return true;
    }
    return false;
  }

  isCorrectRtcOrder(elemPos: number) {
    if (this.panOrder[this.panEvolution] == elemPos) {
      return true;
    }
    return false;
  }

  checkIfMasalaComplete(): boolean {
    for (let mm of this.gameData.masalaElements) {
      if (mm.isActive) return false;
    }
    return true;
  }

  checkIfGameIsFinished(): boolean {
    if (this.checkIfMasalaComplete()) {
      if (this.gameData.fishMasala) {
        if (!this.gameData.fishMasala.isActive) {
          for (let rtc of this.gameData.readyToCookElements) {
            if (rtc.isActive) {
              return false;
            }
          }
          return true;
        }
      }
    }
    return false;
  }

  loadFishMasala() {
    this.gameData.fishMasala = {
      classes: 'movable',
      src: 'cg_e15.png',
      isActive: true,
      styles: '',
      height: '8.43%',
      width: '12.08%',
      xPos: '32.08%',
      yPos: '34.72%',
    };
    this.changeDetect.detectChanges();
  }

  loadRtcFish() {
    this.gameData.readyToCookElements.push({
      classes: 'movable',
      src: 'cg_e21.png',
      styles: '',
      isActive: true,
      height: '14.72%',
      width: '10.99%',
      xPos: '1.67%',
      yPos: '33.06%',
    });
    this.changeDetect.detectChanges();
  }

  loadEvolvedData(zone: 'masala' | 'fish masala' | 'ready') {
    switch (zone) {
      case 'masala':
        if (
          this.masalaMixEvolution <
          this.gameData.masalaMixingAreaElement.evolutionData.length
        ) {
          this.gameData.masalaMixingAreaElement.src =
            this.gameData.masalaMixingAreaElement.evolutionData[
              this.masalaMixEvolution
            ].src;
          this.masalaMixEvolution++;
        } else {
          this.gameData.masalaMixingAreaElement.src =
            this.stockMasalaMixElementSrc;
        }
        break;
      case 'fish masala':
        if (
          this.fishEvolution < this.gameData.fishElement.evolutionData.length
        ) {
          this.gameData.fishElement.src =
            this.gameData.fishElement.evolutionData[this.fishEvolution].src;
          this.fishEvolution++;
        } else {
          this.gameData.fishElement.src = this.stockFishElementSrc;
        }
        break;
      case 'ready':
        if (this.panEvolution < this.gameData.panElement.evolutionData.length) {
          this.gameData.panElement.src =
            this.gameData.panElement.evolutionData[this.panEvolution].src;
          this.panEvolution++;
        } else {
          this.gameData.fishElement.src = this.stockPanElementSrc;
        }
    }
    this.changeDetect.detectChanges();
  }
}
