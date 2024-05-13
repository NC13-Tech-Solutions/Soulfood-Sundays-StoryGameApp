import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAndEndComponent } from './start-and-end.component';

describe('StartAndEndComponent', () => {
  let component: StartAndEndComponent;
  let fixture: ComponentFixture<StartAndEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartAndEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartAndEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
