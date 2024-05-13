import { CurryGameDataElement } from './curry-game-data-element.model';
import { CurryGameDataVessel } from './curry-game-data-vessel.model';

export interface CurryGameData {
  nextFrame: number;
  masalaElements: CurryGameDataElement[];
  masalaMixingAreaElement: CurryGameDataVessel;
  readyToCookElements: CurryGameDataElement[];
  fishElement: CurryGameDataVessel;
  panElement: CurryGameDataVessel;
  backgroundSrc: string;
  fishMasala?: CurryGameDataElement;
}
