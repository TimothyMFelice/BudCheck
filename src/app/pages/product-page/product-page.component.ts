import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/tools/api/api.service';
import { Brand, Product } from 'src/app/tools/product/product.model';
import { Rating } from 'src/app/tools/rating/rating.model';
import { RatingService } from 'src/app/tools/rating/rating.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  productId: any;
  productData: Product;
  brandData: Brand;
  productRatings: Array<any>;

  fullStars: Array<any> = [];
  halfStars: Array<any> = [];
  noStars: Array<any> = [];

  rating: any;
  ratings: Array<number> = [];

  constructor(private activatedroute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.productId = this.activatedroute.snapshot.paramMap.get("id");

    this.apiService.getProduct(this.productId).then(doc => {
      this.productData = {
        brandId: doc.data().brandId,
        cannabisType: doc.data().cannabisType,
        cbd: doc.data().cbd,
        description: doc.data().description,
        displayName: doc.data().displayName,
        imageURL: doc.data().imageURL,
        thc: doc.data().thc,
      }

      this.apiService.getBrand(this.productData.brandId).then(doc => {
        this.brandData = {
          displayName: doc.data().displayName,
        }
      });
    });

    this.apiService.getProductGlobalActivity(this.productId).then((querySnapshot) => {
      this.productRatings = querySnapshot.docs;
      if (this.productRatings.length <= 0)
        return;
      this.rating = this.average(this.productRatings);
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
