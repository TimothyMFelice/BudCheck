import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage'

import { environment } from '../environments/environment';
import { AuthService } from './tools/authenticator/auth.service';
import { NavbarComponent } from './tools/navbar/navbar.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { StarReviewComponent } from './tools/star/star-review/star-review.component';
import { ProductComponent } from './tools/product/product.component';
import { ActivityRatingComponent } from './tools/rating/activity-rating/activity-rating.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ActivityItemComponent } from './tools/activity/activity-item/activity-item.component';
import { GlobalActivityFeedComponent } from './pages/activity/global-activity-feed/global-activity-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavbarComponent,
    ActivityComponent,
    StarReviewComponent,
    ProductComponent,
    ActivityRatingComponent,
    ProductPageComponent,
    ActivityItemComponent,
    GlobalActivityFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
