import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { OrdersHistoryComponent } from './orders/orders-history/orders-history.component';
import { ActiveOrdersComponent } from './orders/active-orders/active-orders.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { PlaceOrderComponent } from './orders/place-order/place-order.component';
import { ImportOrderComponent } from './orders/import-order/import-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    RegisterComponent,
    ProfileComponent,
    CreateOrderComponent,
    OrdersHistoryComponent,
    ActiveOrdersComponent,
    EditOrderComponent,
    PlaceOrderComponent,
    ImportOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
