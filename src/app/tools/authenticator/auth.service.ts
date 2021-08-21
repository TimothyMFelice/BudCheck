import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { User } from './user.model';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  public signInWithEmailAndPassword(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  public signUpWithEmailAndPassword(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationEMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  public signInWithGoogle() {
    return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  private AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  public signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  public sendVerificationEMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      })
  }

  public forgotPassword(email) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  private setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState, { merge: true })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  getUserNameFromUserId(userId) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userId}`);
    return userRef.valueChanges().subscribe(result => {
      return result.displayName;
    });
  }

  getUser(userId): Observable<User> {
    const usersDocuments = this.afs.doc<User>(`users/${userId}`);
    return usersDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  getProduct(productId): Observable<User> {
    const productsDocuments = this.afs.doc<User>(`flowers/${productId}`);
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }
}
