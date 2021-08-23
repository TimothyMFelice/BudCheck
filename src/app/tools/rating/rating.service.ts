import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private afs: AngularFirestore) { }

  getGlobalRatings() {
    const ratingCollectionRef = this.afs.firestore.collection(`ratings`).orderBy("timestamp", "desc");
    return ratingCollectionRef.get();
  }

  getUser(userId) {
    const userDocRef = this.afs.firestore.doc(`users/${userId}`);
    return userDocRef.get();
  }

  getProduct(productId) {
    const prodcutDocRef = this.afs.firestore.doc(`flowers/${productId}`);
    return prodcutDocRef.get();
  }

  getBrand(brandId) {
    const brandsDocRef = this.afs.firestore.doc(`brands/${brandId}`);
    return brandsDocRef.get();
  }

  getProductRatings(productId) {
    const ratingCollectionRef = this.afs.firestore.collection(`ratings`).where("productId", '==', productId);
    return ratingCollectionRef.get();
  }
}
