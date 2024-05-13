import { BasicElementData } from "./basic-element-data.model";
import { CurryGameDataElement } from "./curry-game-data-element.model";
import { EvolutionData } from "./evolution-data.model";

export interface CurryGameDataVessel extends BasicElementData{
  evolutionData: EvolutionData[];
}
