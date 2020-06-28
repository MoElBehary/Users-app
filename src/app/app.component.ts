import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();
  constructor(private auth_srvice: AuthService,  ){}
  ngOnInit(){
    const token = localStorage.getItem('token')
    this.auth_srvice.decodedToken = this.helper.decodeToken(token)
    if (this.auth_srvice.decodedToken){
      this.auth_srvice.getSelectedUser(this.auth_srvice.decodedToken?.sub)
    }
  }
}
