import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../authenticator/user.model';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  public registerWithEmailAndPassword(email, password, username) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user.user, username) // create initial user document
      })
      .catch(error => this.handleError(error));
  }

  public signOut() {

  }

  getCurrentUserData() {
    return this.afAuth.currentUser.then(user => {
      const userDocRef = this.afs.firestore.doc(`users/${user.uid}`);
      return userDocRef.get();
    })
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user, username) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      photoURL: user.photoURL || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      emailVerified: user.emailVerified
    }

    return userRef.set(data)
  }

  // Update properties on the user document
  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data)
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
  }
}