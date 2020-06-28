import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any;
  constructor(private auth_srvice: AuthService, private http: HttpClient) { }
  getAllUsers(){
    return this.http.get(this.auth_srvice._URL)
  }
  deleteUser(id: any){
    return this.http.delete(`${this.auth_srvice._URL}${id}`)
  }
  changePassword(id: any, model: any){
    return this.http.put(`${this.auth_srvice._URL}${id}`, model)
  }
}
