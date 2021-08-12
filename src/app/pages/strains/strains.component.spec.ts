import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainsComponent } from './strains.component';

describe('StrainsComponent', () => {
  let component: StrainsComponent;
  let fixture: ComponentFixture<StrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
