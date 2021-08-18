import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  state = AuthenticatorCompState.LOGIN;
  firebaseAuth: FirebaseTSAuth;

  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router) {
    this.firebaseAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }

  onResetClick(resetEmail: HTMLInputElement) {
  }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
  }

  onRegisterClick(registerEmail: HTMLInputElement, registerPassword: HTMLInputElement, registerConfirmPassword: HTMLInputElement) {
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string) {
    return text == comparedWith;
  }

  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    if (this.state === AuthenticatorCompState.LOGIN) {
      let email = this.email;
      let password = this.password;

      if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
        this.firebaseAuth.signInWith(
          {
            email: email,
            password: password,
            onComplete: (uc) => {
              this.router.navigate(["postfeed"]);
            },
            onFail: (err) => {
              alert(err);
            }
          });
      }
    }
    else {
      this.state = AuthenticatorCompState.LOGIN;
    }
  }

  isLoginState() {
    return this.state === AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state === AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState() {
    return this.state === AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getLoginColor() {
    return this.isLoginState() ? 'primary' : '';
  }

  getRegisterColor() {
    return this.isRegisterState() ? 'primary' : '';
  }

  getForgotPasswordColor() {
    return this.isForgotPasswordState() ? 'primary' : '';
  }

  getLoginClass() {
    return this.isLoginState() ? 'mat-raised-button' : 'mat-flat-button';
  }

  getRegisterClass() {
    return this.isRegisterState() ? 'mat-raised-button' : 'mat-flat-button';
  }

  getForgotPasswordClass() {
    return this.isForgotPasswordState() ? 'mat-raised-button' : 'mat-flat-button';
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}