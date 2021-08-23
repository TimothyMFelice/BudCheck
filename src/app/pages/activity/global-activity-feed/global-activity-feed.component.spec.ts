import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalActivityFeedComponent } from './global-activity-feed.component';

describe('GlobalActivityFeedComponent', () => {
  let component: GlobalActivityFeedComponent;
  let fixture: ComponentFixture<GlobalActivityFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalActivityFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalActivityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
