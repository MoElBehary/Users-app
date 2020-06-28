import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _URL = 'http://localhost:4000/users/'
  helper = new JwtHelperService();
  decodedToken: any;
  user: any
  constructor(private http: HttpClient) { }
  // login {POST} method
  login(model: any){
    return this.http.post(this._URL + 'authenticate', model).pipe(
      map((res: any) => {
        const user = res;
        if(user.token){
          localStorage.setItem('token', user.token)
          this.decodedToken = this.helper.decodeToken(user.token)
          this.getSelectedUser(this.decodedToken.sub)
        }
          
       })
    )
  }
  // register {POST} method
  register(model: any){
    return this.http.post(this._URL + 'register', model)
  }
  loggedIn(){
    const token = localStorage.getItem('token')
    return !this.helper.isTokenExpired(token);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getSelectedUser(id){
    const userObs = {
      next: x => {this.user = x},
      error: err => console.log(err)
    }
    this.http.get(this._URL + id).subscribe(userObs)
  }
}
