import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Brand } from '../brand/brand.model';
import { Product } from '../product/product.model';
import { Rating } from '../rating/rating.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  public signInWithEmailAndPassword(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        window.alert(error.message);
      });
  }

  public signUpWithEmailAndPassword(email, password, username) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setDefaultUserData(result.user, username);
      });
  }

  public signOut() {
    return this.afAuth.signOut();
  }

  private setDefaultUserData(user, username) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const defaultUser: User = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      photoURL:
        user.photoURL ||
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      emailVerified: user.emailVerified,
    };

    return userRef.set(defaultUser);
  }

  createNewId() {
    return this.afs.createId();
  }

  // PRODUCTS
  createProduct(productData: Product, productId) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `flowers/${productId}`
    );
    return productRef.set(productData, { merge: true });
  }

  getAllProducts() {
    return this.afs
      .collection<Product>(`flowers`, (ref) => ref.limit(10))
      .snapshotChanges();
  }

  getProduct(productId) {
    return this.afs
      .collection<Product>('flowers')
      .doc(productId)
      .snapshotChanges();
  }

  // BRANDS
  getBrand(brandId) {
    return this.afs.collection<Brand>('brands').doc(brandId).snapshotChanges();
  }

  getBrandGlobalActivity(brandId) {
    return this.afs
      .collection<Rating>(`ratings`, (ref) =>
        ref.where('brandId', '==', brandId)
      )
      .snapshotChanges();
  }

  // RATINGS
  rateProduct(rating: Rating, ratingId) {
    const ratingRef: AngularFirestoreDocument<any> = this.afs.doc(
      `ratings/${ratingId}`
    );
    return ratingRef.set(rating, { merge: true });
  }

  getRating(ratingId) {
    return this.afs
      .collection<Rating>('ratings')
      .doc(ratingId)
      .snapshotChanges();
  }

  getAllRatings() {
    return this.afs
      .collection<Rating>(`ratings`, (ref) => ref.limit(10))
      .snapshotChanges();
  }

  getProductGlobalActivity(productId) {
    return this.afs
      .collection<Rating>(`ratings`, (ref) =>
        ref.where('productId', '==', productId)
      )
      .snapshotChanges();
  }

  // USERS
  getUser(userId) {
    return this.afs.collection<User>(`users`).doc(userId).snapshotChanges();
  }
}
