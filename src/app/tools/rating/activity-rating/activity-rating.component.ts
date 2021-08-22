import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../authenticator/user.model';
import { Brand, Product } from '../../product/product.model';
import { Rating } from '../rating.model';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-activity-rating',
  templateUrl: './activity-rating.component.html',
  styleUrls: ['./activity-rating.component.scss']
})
export class ActivityRatingComponent implements OnInit {

  @Input() ratingDoc: any;
  ratingData: Rating;
  userData: User;
  productData: Product;
  brandData: Brand;

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.ratingData = {
      productId: this.ratingDoc.data().productId,
      userId: this.ratingDoc.data().userId,
      value: this.ratingDoc.data().value,
      description: this.ratingDoc.data().description,
      imageURL: this.ratingDoc.data().imageURL,
      timestamp: this.ratingDoc.data().timestamp
    }

    this.ratingService.getUser(this.ratingData.userId).then(doc => {
      this.userData = {
        uid: doc.data().userId,
        email: doc.data().email,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
        emailVerified: doc.data().emailVerified,
      }
    });

    this.ratingService.getProduct(this.ratingData.productId).then(doc => {
      this.productData = {
        brandId: doc.data().brandId,
        cannabisType: doc.data().cannabisType,
        cbd: doc.data().cbd,
        description: doc.data().description,
        displayName: doc.data().displayName,
        imageURL: doc.data().imageURL,
        thc: doc.data().thc,
      }

      this.ratingService.getBrand(this.productData.brandId).then(doc => {
        this.brandData = {
          displayName: doc.data().displayName,
        }
      });
    });
  }
}
