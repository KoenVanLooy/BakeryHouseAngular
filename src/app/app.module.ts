import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderModule } from './order/order.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApplistComponent } from './applist/applist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth-guard';
import { ErrorInterceptor } from './_helpers/error-interceptor';
import { JwtInterceptor } from './_helpers/jwt-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplistComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    OrderModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
