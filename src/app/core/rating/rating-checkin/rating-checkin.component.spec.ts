import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCheckinComponent } from './rating-checkin.component';

describe('RatingCheckinComponent', () => {
  let component: RatingCheckinComponent;
  let fixture: ComponentFixture<RatingCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
