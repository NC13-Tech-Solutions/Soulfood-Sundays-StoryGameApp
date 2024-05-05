import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFrameComponent } from './story-frame.component';

describe('StoryFrameComponent', () => {
  let component: StoryFrameComponent;
  let fixture: ComponentFixture<StoryFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
