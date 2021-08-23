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

  // Users
  getUser(userId) {
    const userDocRef = this.afs.firestore.doc(`users/${userId}`);
    return userDocRef.get();
  }

  // Products
  getProduct(productId) {
    const prodcutDocRef = this.afs.firestore.doc(`flowers/${productId}`);
    return prodcutDocRef.get();
  }

  // Brand
  getBrand(brandId) {
    const brandsDocRef = this.afs.firestore.doc(`brands/${brandId}`);
    return brandsDocRef.get();
  }
}
