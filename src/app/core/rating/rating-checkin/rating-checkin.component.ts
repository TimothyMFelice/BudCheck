import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Rating } from 'src/app/shared/rating/rating.model';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rating-checkin',
  templateUrl: './rating-checkin.component.html',
  styleUrls: ['./rating-checkin.component.scss'],
})
export class RatingCheckinComponent implements OnInit {
  @Input() productId: any;

  ratingCheckinForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private ratingService: RatingService) {}

  ngOnInit(): void {
    this.setUpForm();
  }

  private setUpForm() {
    this.ratingCheckinForm = this.fb.group({
      description: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get description() {
    return this.ratingCheckinForm.get('description');
  }

  get rating() {
    return this.ratingCheckinForm.get('rating');
  }

  get image() {
    return this.ratingCheckinForm.get('image');
  }

  checkInProduct(imageInput: HTMLInputElement) {
    const rate: Rating = {
      userId: this.auth.userState.uid,
      productId: this.productId,
      value: this.rating.value,
      description: this.description.value,
      imageURL: '',
      timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
    };

    const file = imageInput.files![0];

    this.ratingService.rateProduct(rate, file);
  }
}
