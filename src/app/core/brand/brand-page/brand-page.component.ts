import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/brand/brand.model';
import { Rating } from 'src/app/shared/rating/rating.model';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss'],
})
export class BrandPageComponent implements OnInit {
  brandId: any;
  brandData: Brand;
  brandRatings: Array<any> = [];
  brandProducts: Array<any> = [];

  fullStars: Array<any> = [];
  halfStars: Array<any> = [];
  noStars: Array<any> = [];

  rating: any;
  ratings: Array<number> = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.brandId = this.activatedroute.snapshot.paramMap.get('id');

    this.getBrandData();
    this.getBrandRatings();
  }

  getBrandData() {
    this.brandService.getBrand(this.brandId).subscribe((brandDoc) => {
      this.brandData = {
        displayName: brandDoc.payload.data().displayName,
        description: brandDoc.payload.data().description,
        imageURL: brandDoc.payload.data().imageURL,
        location: brandDoc.payload.data().location,
      };
    });
  }

  getBrandRatings() {
    this.brandService.getAllRatings().subscribe((ratingsDocs) => {
      ratingsDocs.forEach((ratingDoc) => {
        this.brandService
          .getProduct(ratingDoc.payload.doc.data().productId)
          .subscribe((productDoc) => {
            if (productDoc.payload.data().brandId == this.brandId) {
              console.log(ratingDoc);
              this.ratings.push(ratingDoc.payload.doc.data().value);
              this.brandRatings.push(ratingDoc);
              this.brandProducts.push(productDoc);
              this.calculateRating();
            }
          });
      });
    });
  }

  private calculateRating() {
    if (this.ratings.length <= 0) {
      this.fullStars = [];
      this.halfStars = [];
      this.noStars = ['', '', '', '', ''];
      this.rating = 'Not Rated';
      return;
    }
    this.rating = this.average(this.ratings).toFixed(2);
    let value = this.rating;

    this.fullStars = [];
    this.halfStars = [];
    this.noStars = [];
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
  }

  private average(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
  }
}
