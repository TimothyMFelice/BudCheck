import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    });
  }
}
