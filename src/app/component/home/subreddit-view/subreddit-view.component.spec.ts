import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditViewComponent } from './subreddit-view.component';

describe('SubredditViewComponent', () => {
  let component: SubredditViewComponent;
  let fixture: ComponentFixture<SubredditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubredditViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubredditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
