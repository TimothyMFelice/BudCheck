import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Brand, Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productDoc: any;

  productId: any;

  productData: Product;
  brandData: Brand;

  productRatings: Array<any>;
  ratings: Array<number> = [];

  fullStars: Array<any> = [];
  halfStars: Array<any> = [];
  noStars: Array<any> = [];

  rating: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductData();

    this.getProductBrandData();

    this.getProductRatingData();
  }

  getProductData() {
    this.productId = this.productDoc.id;

    this.productData = {
      brandId: this.productDoc.data().brandId,
      cannabisType: this.productDoc.data().cannabisType,
      cbd: this.productDoc.data().cbd,
      description: this.productDoc.data().description,
      displayName: this.productDoc.data().displayName,
      imageURL: this.productDoc.data().imageURL,
      thc: this.productDoc.data().thc,
    }
  }

  getProductBrandData() {
    this.apiService.getBrand(this.productData.brandId).then(doc => {
      this.brandData = {
        displayName: doc.data().displayName,
      }
    });
  }

  getProductRatingData() {
    this.apiService.getProductGlobalActivity(this.productId).then((querySnapshot) => {
      this.productRatings = querySnapshot.docs;
      if (this.productRatings.length <= 0) {
        this.rating = 'Not Rated'
        return;
      }

      this.productRatings.forEach(rating => {
        let value = rating.data().value;
        this.ratings.push(value);

        for (let i = 1; i < value; i++) {
          this.fullStars.push({
            productId: rating.data().productId,
            userId: rating.data().userId,
            value: rating.data().value,
            description: rating.data().description,
            imageURL: rating.data().imageURL,
            timestamp: rating.data().timestamp
          })
        }
        if (value % 1 >= 0.5) {
          this.halfStars.push({
            productId: rating.data().productId,
            userId: rating.data().userId,
            value: rating.data().value,
            description: rating.data().description,
            imageURL: rating.data().imageURL,
            timestamp: rating.data().timestamp
          });
        }
        for (let i = 1; i < (5 - value); i++) {
          this.noStars.push({
            productId: rating.data().productId,
            userId: rating.data().userId,
            value: rating.data().value,
            description: rating.data().description,
            imageURL: rating.data().imageURL,
            timestamp: rating.data().timestamp
          })
        }
      });

      this.rating = this.average(this.ratings);
    });
  }

  average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
  }
}
