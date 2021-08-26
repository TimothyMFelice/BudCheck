import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCheckinComponent } from './product-checkin.component';

describe('ProductCheckinComponent', () => {
  let component: ProductCheckinComponent;
  let fixture: ComponentFixture<ProductCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
