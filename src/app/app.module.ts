import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';
import {AuthInterceptor} from '../retailintercept/AuthInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ErrorInterceptInterceptor} from '../retailintercept/ErrorInterceptInterceptor';
import { RetailComponent } from 'src/retail/retail.component';

@NgModule({
  declarations: [
    AppComponent
    ,LoginComponent
    ,SignupComponent
    ,RetailComponent
    
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,FormsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
