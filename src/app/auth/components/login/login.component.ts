import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  constructor(
      private auth_srvice: AuthService,
      public progress_service: ProgressBarService,
      private alertService: AlertService,
      private _router: Router 
      ) { }

  ngOnInit() {
    this.auth_srvice.loggedIn() ? this._router.navigate(['/users']): false;
    window.addEventListener("resize", function () {
      resizeContentHolder('loginFormHolder');
    });
    // [?] resize the content container holder to fit the window height size
    function resizeContentHolder(holder) {
      var elem = document.getElementById(holder)
      var innerWidth = window.innerWidth;
      var innerHeightWithoutNav = window.innerHeight - 56;
      if (innerWidth < 992) {
        elem.style.height = innerHeightWithoutNav + 'px'
      } else {
        if (innerHeightWithoutNav > 700) {
          elem.style.height = innerHeightWithoutNav + 'px'
        } else {
          elem.style.height = 700 + 'px'
        }
      }
    }
    // [?] on load at ther realtime
    resizeContentHolder('loginFormHolder');
  }
  // [#] HTTP REQs
  // [?] Login req
  onSubmit(f:  NgForm) {
    this.progress_service.startLoading()
    const loginObs = {
      next: res => {
        this.user = res
        this.progress_service.setSuccess()
        console.log('user logged in ')
        this.alertService.success('Welcome back!');
        this.progress_service.completeLoading()
      },
      error: err => {
        this.progress_service.setError()
        console.log(err)
        this.alertService.danger('Sorry there is an error!');
        this.progress_service.completeLoading()
      },
      complete: ()=>{
        this._router.navigate(['/'])
        this.progress_service.completeLoading()
      }
    }
    this.auth_srvice.login(f.value).subscribe(loginObs)
  }
}
