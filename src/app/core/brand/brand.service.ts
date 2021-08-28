import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private api: ApiService) { }

  getBrand(brandId) {
    return this.api.getBrand(brandId);
  }

  getAllRatings() {
    return this.api.getAllRatings();
  }

  getProduct(productId) {
    return this.api.getProduct(productId);
  }
}
