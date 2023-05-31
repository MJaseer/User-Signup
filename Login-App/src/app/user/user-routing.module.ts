import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path:'home',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/user/home', pathMatch:'full'},
  {path:'contact', component:ContactComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
