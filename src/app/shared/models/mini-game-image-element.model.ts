import { BasicElementData } from "./basic-element-data.model";

export interface MiniGameImageElement extends BasicElementData{
  id: number;
  hint: string;
  matchId: number;
  isActive: boolean;
}
