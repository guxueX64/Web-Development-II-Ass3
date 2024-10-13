import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './views/adminPage/adminPage.component';
import {ActionComponent} from "./views/adminPage/action/action.component";


const routes: Routes = [
  { path: '', redirectTo: 'adminPage', pathMatch: 'full' },
  {
    path: 'adminPage',
    component: AdminPageComponent
  }, {
    path: 'action',
    component: ActionComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
