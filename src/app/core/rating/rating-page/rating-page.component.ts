import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/brand/brand.model';
import { Product } from 'src/app/shared/product/product.model';
import { Rating } from 'src/app/shared/rating/rating.model';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrls: ['./rating-page.component.scss'],
})
export class RatingPageComponent implements OnInit {
  ratingId: any;
  ratingData: Rating;
  productData: Product;
  brandData: Brand;

  fullStars: Array<any> = [];
  halfStars: Array<any> = [];
  noStars: Array<any> = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.ratingId = this.activatedroute.snapshot.paramMap.get('id');

    this.getRatingData();
  }

  getRatingData() {
    this.ratingService.getRating(this.ratingId).subscribe((ratingDoc) => {
      this.ratingData = {
        userId: ratingDoc.payload.data().userId,
        productId: ratingDoc.payload.data().productId,
        value: ratingDoc.payload.data().value,
        description: ratingDoc.payload.data().description,
        imageURL: ratingDoc.payload.data().imageURL,
        timestamp: ratingDoc.payload.data().timestamp,
      };

      this.fullStars = [];
      this.halfStars = [];
      this.noStars = [];
      let value = this.ratingData.value;
      for (let i = 1; i < value; i++) {
        this.fullStars.push(value);
      }
      if (value % 1 >= 0.5) {
        this.halfStars.push(value);
      } else if (value % 1 < 0.5) {
        this.noStars.push(value);
      }
      for (let i = 1; i < 5 - value; i++) {
        this.noStars.push(value);
      }

      this.getProductData();
    });
  }

  getProductData() {
    this.ratingService
      .getProduct(this.ratingData.productId)
      .subscribe((productDoc) => {
        this.productData = {
          brandId: productDoc.payload.data().brandId,
          cannabisType: productDoc.payload.data().cannabisType,
          cbd: productDoc.payload.data().cbd,
          description: productDoc.payload.data().description,
          displayName: productDoc.payload.data().displayName,
          imageURL: productDoc.payload.data().imageURL,
          thc: productDoc.payload.data().thc,
        };

        this.getBrandData();
      });
  }

  getBrandData() {
    this.ratingService.getBrand(this.productData.brandId).subscribe(brandDoc => {
      this.brandData = {
  displayName: brandDoc.payload.data().displayName,
  description: brandDoc.payload.data().description,
  imageURL: brandDoc.payload.data().imageURL,
  location: brandDoc.payload.data().location,
      }
    })
  }
}
