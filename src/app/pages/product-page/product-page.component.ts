import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  productRatings: Array<Rating> = [];

  constructor(private activatedroute: ActivatedRoute, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.productId = this.activatedroute.snapshot.paramMap.get("id");

    this.ratingService.getProduct(this.productId).then(doc => {
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

    this.ratingService.getGlobalRatings().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        this.productRatings.push({
          productId: doc.data().productId,
          userId: doc.data().userId,
          value: doc.data().value,
          description: doc.data().description,
          imageURL: doc.data().imageURL,
          timestamp: doc.data().timestamp
        });
      });
    });
  }

}
