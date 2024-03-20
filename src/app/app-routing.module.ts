import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './login.guard';
import { dashboardGuard } from './guard/dashboard.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  // {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,
   canActivate:[dashboardGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
