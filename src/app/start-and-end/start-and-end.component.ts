import { AfterViewInit, Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-start-and-end',
  standalone: true,
  imports: [],
  templateUrl: './start-and-end.component.html',
  styleUrl: './start-and-end.component.sass',
})
export class StartAndEndComponent implements AfterViewInit {
  @Input('imgSrc') imgSrc: string | undefined;
  @Input('isStart') isStart!: boolean;
  gotoMain = output<void>();

  imgLoaded = false;
  called = false;

  ngAfterViewInit(): void {
    if (this.imgLoaded) {
      if (this.isStart) {
        if (!this.called) {
          this.called = true;
          this.startDelay(9500);
        }
      }
    }
  }
  onImgLoad() {
    this.imgLoaded = true;
      if (this.isStart) {
        if (!this.called) {
          this.called = true;
          this.startDelay(9500);
        }
      }
  }

  startDelay(secs: number): void {
    setTimeout(() => {
      this.gotoMain.emit()
    }, secs);
  }
}
