import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { User } from '../../authenticator/user.model';
import { Brand, Product } from '../../product/product.model';
import { Rating } from '../../rating/rating.model';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  @Input() ratingDoc: any;

  ratingData: Rating;
  userData: User;
  productData: Product;
  brandData: Brand;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRatingData();
    this.getRatingUserData();
    this.getRatingProductData();
  }

  getRatingData() {
    this.ratingData = {
      productId: this.ratingDoc.data().productId,
      userId: this.ratingDoc.data().userId,
      value: this.ratingDoc.data().value,
      description: this.ratingDoc.data().description,
      imageURL: this.ratingDoc.data().imageURL,
      timestamp: this.ratingDoc.data().timestamp
    }
  }

  getRatingUserData() {
    this.apiService.getUser(this.ratingData.userId).then(doc => {
      this.userData = {
        uid: doc.data().userId,
        email: doc.data().email,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
        emailVerified: doc.data().emailVerified,
      }
    });
  }

  getRatingProductData() {
    this.apiService.getProduct(this.ratingData.productId).then(doc => {
      this.productData = {
        brandId: doc.data().brandId,
        cannabisType: doc.data().cannabisType,
        cbd: doc.data().cbd,
        description: doc.data().description,
        displayName: doc.data().displayName,
        imageURL: doc.data().imageURL,
        thc: doc.data().thc,
      }

      this.getRatingBrandData();
    });
  }

  getRatingBrandData() {
    this.apiService.getBrand(this.productData.brandId).then(doc => {
      this.brandData = {
        displayName: doc.data().displayName,
      }
    });

  }
}
