import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AppComponent } from './app.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['home']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  { path: '', component: SignInComponent},
  { path: 'sign-in', component: SignInComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } },
  { path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
