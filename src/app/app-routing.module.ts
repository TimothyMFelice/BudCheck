import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { StrainsComponent } from './pages/strains/strains.component';

const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "emailVerification", component: EmailVerificationComponent},
  {path: "strain", component: StrainsComponent},
  {path: "postfeed", component: StrainsComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
