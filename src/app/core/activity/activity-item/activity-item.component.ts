import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/brand/brand.model';
import { Product } from 'src/app/shared/product/product.model';
import { Rating } from 'src/app/shared/rating/rating.model';
import { User } from 'src/app/shared/user/user.model';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {
  @Input() ratingDoc: any;

  ratingData: Rating;
  userData: User;
  productData: Product;
  brandData: Brand;

  fullStars: Array<any> = [];
  halfStars: Array<any> = [];
  noStars: Array<any> = [];

  constructor(private actvityService: ActivityService) {}

  ngOnInit(): void {
    this.getRatingData();
    this.getRatingUserData();
    this.getRatingProductData();
  }

  private getRatingData() {
    this.ratingData = {
      productId: this.ratingDoc.payload.doc.data().productId,
      userId: this.ratingDoc.payload.doc.data().userId,
      value: this.ratingDoc.payload.doc.data().value,
      description: this.ratingDoc.payload.doc.data().description,
      imageURL: this.ratingDoc.payload.doc.data().imageURL,
      timestamp: this.ratingDoc.payload.doc.data().timestamp,
    };

    let value = this.ratingData.value;
    for (let i = 1; i <= value; i++) {
      this.fullStars.push(value);
    }
    if (value % 1 >= 0.5) {
      this.halfStars.push(value);
    }
    for (let i = 1; i < 5 - value; i++) {
      this.noStars.push(value);
    } 
  }

  private getRatingUserData() {
    this.actvityService.getUser(this.ratingData.userId).subscribe((userDoc) => {
      this.userData = {
        uid: userDoc.payload.data().uid,
        email: userDoc.payload.data().email,
        displayName: userDoc.payload.data().displayName,
        photoURL: userDoc.payload.data().photoURL,
        emailVerified: userDoc.payload.data().emailVerified,
      };
    });
  }

  private getRatingProductData() {
    this.actvityService
      .getProduct(this.ratingData.productId)
      .subscribe((ratingDoc) => {
        this.productData = {
          brandId: ratingDoc.payload.data().brandId,
          cannabisType: ratingDoc.payload.data().cannabisType,
          cbd: ratingDoc.payload.data().cbd,
          description: ratingDoc.payload.data().description,
          displayName: ratingDoc.payload.data().displayName,
          imageURL: ratingDoc.payload.data().imageURL,
          thc: ratingDoc.payload.data().thc,
        };

        this.getRatingBrandData();
      });
  }

  private getRatingBrandData() {
    this.actvityService
      .getBrand(this.productData.brandId)
      .subscribe((brandDoc) => {
        this.brandData = {
          displayName: brandDoc.payload.data().displayName,
        };
      });
  }
}
