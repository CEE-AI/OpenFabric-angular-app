import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, JwtModule, JwtHelperService, JWT_OPTIONS  } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { httpInterceptorProviders } from './helper/http.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guard/auth.guard';

import { ValidateService } from './service/validate.service';
import { AuthService } from './service/auth.service';
import { FilterPipe } from './pipes/filter.pipe';
import { CartService } from './service/cart.service';
import { ProfileComponent } from './components/profile/profile.component';
// import { AuthGuard } from './guard/auth.guard';

export function tokenGetter() {
  return localStorage.getItem("id_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // CommonModule,
    NavbarComponent,
    CartComponent,
    DashboardComponent,
    RegisterComponent,
    ProductsComponent,
    FilterPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule,
    ModalModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:8701/auth/profile"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [ValidateService, AuthService, 
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,
    multi: true},
    httpInterceptorProviders, AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
