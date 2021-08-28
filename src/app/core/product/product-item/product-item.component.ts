import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/brand/brand.model';
import { Product } from 'src/app/shared/product/product.model';
import { Rating } from 'src/app/shared/rating/rating.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productDoc: any;

  productId: string;
  productData: Product;
  brandData: Brand;

  fullStars: Array<any> = [];
  halfStars: Array<any> = [];
  noStars: Array<any> = [];

  rating: any;
  ratings: Array<any> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductData();
    this.getProductBrandData();
    this.getProductRatingData();
  }

  getProductData() {
    this.productId = this.productDoc.payload.doc.id;

    this.productData = {
      brandId: this.productDoc.payload.doc.data().brandId,
      cannabisType: this.productDoc.payload.doc.data().cannabisType,
      cbd: this.productDoc.payload.doc.data().cbd,
      description: this.productDoc.payload.doc.data().description,
      displayName: this.productDoc.payload.doc.data().displayName,
      imageURL: this.productDoc.payload.doc.data().imageURL,
      thc: this.productDoc.payload.doc.data().thc,
    };
  }

  getProductBrandData() {
    this.productService.getBrand(this.productData.brandId).subscribe((brandDoc) => {
      this.brandData = {
        displayName: brandDoc.payload.data().displayName,
        description: brandDoc.payload.data().description,
        imageURL: brandDoc.payload.data().imageURL,
        location: brandDoc.payload.data().location,
      };
    });
  }

  getProductRatingData() {
    this.productService
      .getProductGlobalActivity(this.productId)
      .subscribe((ratingDocs) => {
        if (ratingDocs.length <= 0) {
          this.fullStars = [];
          this.halfStars = [];
          this.noStars = ['', '', '', '', ''];
          this.rating = 'Not Rated';
          return;
        }

        ratingDocs.forEach((ratingDoc) => {
          let rating = ratingDoc.payload.doc.data() as Rating;
          let value = rating.value;
          this.ratings.push(value);
        });
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
        }
        else if (value % 1 < 0.5) {
          this.noStars.push(value);
        }
        for (let i = 1; i < 5 - value; i++) {
          this.noStars.push(value);
        }
      });
  }

  private average(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
  }
}
