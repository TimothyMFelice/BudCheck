import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-checkin',
  templateUrl: './product-checkin.component.html',
  styleUrls: ['./product-checkin.component.scss'],
})
export class ProductCheckinComponent implements OnInit {
  productCheckInForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setUpForm();
  }

  private setUpForm() {
    this.productCheckInForm = this.fb.group({
      description: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get description() {
    return this.productCheckInForm.get('description');
  }

  get rating() {
    return this.productCheckInForm.get('rating');
  }

  get image() {
    return this.productCheckInForm.get('image');
  }

  checkInProduct(imageInput: HTMLInputElement) {
    console.log(this.description, this.rating, this.image, imageInput);
  }
}
