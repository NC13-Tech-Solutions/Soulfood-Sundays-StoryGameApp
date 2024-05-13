export interface FrameTransition {
  framePos: number;
  isLinkedFrame: boolean;
  frameElementVal: number;
  nextIsGame?: 'curry' | 'match';
}
