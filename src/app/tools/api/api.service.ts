import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }


  // Ratings
  getAllRatings(): Promise<any> {
    const ratingCollectionRef = this.afs.firestore.collection(`ratings`).orderBy("timestamp", "desc");
    return ratingCollectionRef.get();
  }

  getProductGlobalActivity(productId): Promise<any> {
    console.log(productId);
    const ratingCollectionRef = this.afs.firestore.collection(`ratings`).where("productId", "==", productId);
    return ratingCollectionRef.get();
  }


  // Users
  getUser(userId): Promise<any> {
    const userDocRef = this.afs.firestore.doc(`users/${userId}`);
    return userDocRef.get();
  }

  // Products
  getProduct(productId): Promise<any> {
    const prodcutDocRef = this.afs.firestore.doc(`flowers/${productId}`);
    return prodcutDocRef.get();
  }

  // Brand
  getBrand(brandId): Promise<any> {
    const brandsDocRef = this.afs.firestore.doc(`brands/${brandId}`);
    return brandsDocRef.get();
  }
}
