import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { ActiveOrdersComponent } from './orders/active-orders/active-orders.component';
import { OrdersHistoryComponent } from './orders/orders-history/orders-history.component';
import { ImportOrderComponent } from './orders/import-order/import-order.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'create', component: CreateOrderComponent},
  {path: 'active', component: ActiveOrdersComponent},
  {path: 'history', component: OrdersHistoryComponent},
  {path: 'import', component: ImportOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
