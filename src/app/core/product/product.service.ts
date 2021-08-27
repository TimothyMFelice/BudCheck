import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { Product } from 'src/app/shared/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Observable<any>;

  constructor(private api: ApiService, private storage: AngularFireStorage) {}

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

  createProduct(imagefile: File, productData: Product) {
    const productId = this.createNewId();

    const file = imagefile;
    const filePath = `flowers/${productId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task.then(() => {
      const downloadURL = fileRef.getDownloadURL();
      downloadURL.subscribe((url) => {
        productData.imageURL = url;
        return this.api.createProduct(productData, productId);
      });
    });
  }

  createNewId() {
    return this.api.createNewId();
  }
}
