import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from '../shared/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userState: any;

  constructor(private afAuth: AngularFireAuth, private api: ApiService) {
    this.trackUserState();
  }

  private trackUserState() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
      } else {
        this.userState = null;
      }
    });
  }

  public loginWithEmailAndPassword(email, password) {
    this.api.signInWithEmailAndPassword(email, password);
  }
}
