import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { Brand } from 'src/app/shared/brand/brand.model';
import { Product } from 'src/app/shared/product/product.model';
import { Rating } from 'src/app/shared/rating/rating.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
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

  constructor(
    private activatedroute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedroute.snapshot.paramMap.get('id');

    this.api.getProduct(this.productId).subscribe((productDoc) => {
      this.productData = {
        brandId: productDoc.payload.data().brandId,
        cannabisType: productDoc.payload.data().cannabisType,
        cbd: productDoc.payload.data().cbd,
        description: productDoc.payload.data().description,
        displayName: productDoc.payload.data().displayName,
        imageURL: productDoc.payload.data().imageURL,
        thc: productDoc.payload.data().thc,
      };

      this.api.getBrand(this.productData.brandId).subscribe((brandDoc) => {
        this.brandData = {
          displayName: brandDoc.payload.data().displayName,
        };
      });

      this.api
        .getProductGlobalActivity(this.productId)
        .subscribe((ratingDocs) => {
          this.productRatings = ratingDocs;
          if (this.productRatings.length <= 0) {
            this.fullStars = [];
            this.halfStars = [];
            this.noStars = ['', '', '', '', ''];
            this.rating = 'Not Rated';
            return;
          }

          this.productRatings.forEach((rating) => {
            let rate: Rating = rating.payload.doc.data();

            let value = rate.value;
            this.ratings.push(value);

            this.fullStars = [];
            this.halfStars = [];
            this.noStars = [];
            for (let i = 1; i < value; i++) {
              this.fullStars.push(rate);
            }
            if (value % 1 >= 0.5) {
              this.halfStars.push(rate);
            }
            for (let i = 1; i < 5 - value; i++) {
              this.noStars.push(rate);
            }
          });
          this.rating = this.average(this.ratings);
        });
    });
  }

  average(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
  }
}
