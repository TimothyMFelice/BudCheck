import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ActivityFeedComponent } from './core/activity/activity-feed/activity-feed.component';
import { BrandPageComponent } from './core/brand/brand-page/brand-page.component';
import { ProductCreateComponent } from './core/product/product-create/product-create.component';
import { ProductFeedComponent } from './core/product/product-feed/product-feed.component';
import { ProductPageComponent } from './core/product/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'activity',
    component: ActivityFeedComponent,
  },
  {
    path: 'products',
    component: ProductFeedComponent,
  },
  {
    path: 'product/:id',
    component: ProductPageComponent,
  },
  {
    path: 'brands',
    component: ProductFeedComponent,
  },
  {
    path: 'brand/:id',
    component: BrandPageComponent,
  },
  {
    path: 'createproduct',
    component: ProductCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
