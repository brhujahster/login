import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {InputTextModule } from 'primeng/inputtext';
import {ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.prod';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginHttpSecurityService } from './login-http-security.service';
import { AuthServiceService } from './auth-service.service';
import { AuthGuardService } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),

    ButtonModule,
    InputTextModule
  ],
  providers: [
    AuthGuardService,
    AuthServiceService,
    LoginHttpSecurityService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
