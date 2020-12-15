import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/home.component';
// import { DetailsComponent } from './details/details.component';
const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: 'category/details/:category', component: DetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
