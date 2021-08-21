import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../authenticator/user.model';
import { Star } from './star.model';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private afs: AngularFirestore) { }

  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId));
    return starsRef.valueChanges();
  }

  getProductStars(productId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('productId', '==', productId));
    return starsRef.valueChanges();
  }

  setStar(userId, productId, value) {
    const star: Star = { userId, productId, value };
    
    const starPath = `stars/${this.afs.createId()}`;
    
    return this.afs.doc(starPath).set(star);
  }
}
