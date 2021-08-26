import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Observable<any>;

  constructor(private api: ApiService) {}

  getAllProducts() {
    this.products = this.api.getAllProducts();
    return this.products;
  }

  getProduct(productId) {
    return this.api.getProduct(productId);
  }

  getBrand(brandId) {
    return this.api.getBrand(brandId);
  }

  getProductGlobalActivity(productId) {
    return this.api.getProductGlobalActivity(productId);
  }
}
