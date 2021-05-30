import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { AuthGuard } from './_helpers/auth-guard';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path:'orders', component: OrderListComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
