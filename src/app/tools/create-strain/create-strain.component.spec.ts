import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStrainComponent } from './create-strain.component';

describe('CreateStrainComponent', () => {
  let component: CreateStrainComponent;
  let fixture: ComponentFixture<CreateStrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
