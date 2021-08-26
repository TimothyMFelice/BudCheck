import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/product/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-feed',
  templateUrl: './product-feed.component.html',
  styleUrls: ['./product-feed.component.scss'],
})
export class ProductFeedComponent implements OnInit {

  productsDocs: Array<any>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(result => {
      this.productsDocs = result;
    });
  }
}
