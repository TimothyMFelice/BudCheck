import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  ratings: Observable<any>;

  constructor(private api: ApiService) { }

  getAllRatings() {
    this.ratings = this.api.getAllRatings();
    return this.ratings;
  }

  getUser(userId) {
    return this.api.getUser(userId);
  }

  getProduct(productId) {
    return this.api.getProduct(productId);
  }

  getBrand(brandId) {
    return this.api.getBrand(brandId);
  }
}
