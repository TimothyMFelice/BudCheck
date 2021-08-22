import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRatingComponent } from './activity-rating.component';

describe('ActivityRatingComponent', () => {
  let component: ActivityRatingComponent;
  let fixture: ComponentFixture<ActivityRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
