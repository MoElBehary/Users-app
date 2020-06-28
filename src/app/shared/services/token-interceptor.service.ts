import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth_srvice: AuthService) { }
  intercept(req, next){
    let authServices = this.auth_srvice.getToken()
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authServices}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
