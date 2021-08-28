import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './authentication/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductFeedComponent } from './core/product/product-feed/product-feed.component';
import { ProductItemComponent } from './core/product/product-item/product-item.component';
import { ProductPageComponent } from './core/product/product-page/product-page.component';
import { ActivityFeedComponent } from './core/activity/activity-feed/activity-feed.component';
import { ActivityItemComponent } from './core/activity/activity-item/activity-item.component';
import { ProductCreateComponent } from './core/product/product-create/product-create.component';
import { RatingCheckinComponent } from './core/rating/rating-checkin/rating-checkin.component';
import { BrandPageComponent } from './core/brand/brand-page/brand-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProductFeedComponent,
    ProductItemComponent,
    ProductPageComponent,
    ActivityFeedComponent,
    ActivityItemComponent,
    ProductCreateComponent,
    RatingCheckinComponent,
    BrandPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
