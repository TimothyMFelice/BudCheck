import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './pages/activity/activity.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "activity", component: ActivityComponent},
  {path: "**", component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
