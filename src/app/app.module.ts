import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
// Modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
// service
import { TokenInterceptorService } from './shared/services/token-interceptor.service'
// GARD!!
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './pages/users/users.component'
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule
  ],
  providers: [AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
