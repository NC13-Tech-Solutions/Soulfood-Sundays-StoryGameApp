import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurryGameComponent } from './curry-game.component';

describe('CurryGameComponent', () => {
  let component: CurryGameComponent;
  let fixture: ComponentFixture<CurryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurryGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
