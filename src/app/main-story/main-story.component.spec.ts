import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStoryComponent } from './main-story.component';

describe('MainStoryComponent', () => {
  let component: MainStoryComponent;
  let fixture: ComponentFixture<MainStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
