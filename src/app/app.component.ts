import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BudCheck';
  auth = new FirebaseTSAuth();
  firestone = new FirebaseTSFirestore();
  userHasProfile = true;
  static userDocument: UserDocument;
  onWhitePage = false;

  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState({
          whenSignedIn: user => {
          },
          whenSignedOut: user => {
            AppComponent.userDocument = null;
            this.onWhitePage = false;
          },
          whenSignedInAndEmailNotVerified: user => {
            this.router.navigate(["emailVerification"]);
            this.onWhitePage = true;
          },
          whenSignedInAndEmailVerified: user => {
            this.getUserProfile();
            this.onWhitePage = true;
          },
          whenChanged: user => {

          }
        });
      }
    )
  }

  public static getUserDocument(): UserDocument {
    return AppComponent.userDocument;
  }

  isUserDocValid() {
    return AppComponent.userDocument != null;
  }

  getUserName() {
    try {
      return AppComponent.userDocument.publicName;
    }
    catch (err) {
      return null;
    }
  }

  getUserProfile() {
    this.firestone.listenToDocument({
      name: "Getting Document",
      path: ["Users", this.auth.getAuth().currentUser?.uid!],
      onUpdate: (result) => {
        AppComponent.userDocument = <UserDocument>result.data();
        this.userHasProfile = result.exists;
        AppComponent.userDocument.userId = this.auth.getAuth().currentUser.uid;
        if (this.userHasProfile) {
          this.router.navigate(["postfeed"]);
          this.onWhitePage = true;
        }
      }
    })
  }

  loggedIn() {
    return this.auth.isSignedIn();
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }

  onLogoutClick() {
    this.auth.signOut();
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}