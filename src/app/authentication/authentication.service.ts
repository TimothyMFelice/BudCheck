import { Injectable } from '@angular/core/';
import { AngularFireAuth } from '@angular/fire/auth/angular-fire-auth';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private api: ApiService,
    private router: Router
  ) {
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

  public registerWithEmailAndPassword(email, password, username) {
    this.api.signUpWithEmailAndPassword(email, password, username);
  }

  public logout() {
    this.api.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
