import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AdminPageComponent } from './views/adminPage/adminPage.component';
import { ListPageComponent } from './views/listPage/listPage.component';
import { DetailComponent } from './views/listPage/detail/detail.component';
import {ActionComponent} from "./views/adminPage/action/action.component";
import { DonateComponent } from './views/listPage/donate/donate.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
   component: HomeComponent
  },
  {
    path: 'adminPage',
    component: AdminPageComponent
  }, {
    path: 'listPage',
    component: ListPageComponent
  }, {
    path: 'action',
    component: ActionComponent
  },{
    path: 'detail',
    component: DetailComponent
  },{
    path: 'donate',
    component: DonateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
