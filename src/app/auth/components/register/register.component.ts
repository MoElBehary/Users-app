import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth_srvice: AuthService,
     public progress_service: ProgressBarService,
      private alertService: AlertService,
      private _router: Router
      ) { }

  ngOnInit() {
    this.auth_srvice.loggedIn() ? this._router.navigate(['/users']) : false;
    window.addEventListener("resize", function () {
      resizeContentHolder('registerFormHolder');
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
    resizeContentHolder('registerFormHolder');
  }
  // [#] HTTP REQs
  // [?] Register req
  onSubmit(f: NgForm) {
    this.progress_service.startLoading()
    const registerObs = {
      next: res=>{
        this.progress_service.setSuccess()
        this.alertService.success('Registerd :)');
        this.progress_service.completeLoading()
      },
      error: err =>{
        this.progress_service.setError()
        this.alertService.danger(err.error.message);
        console.log(err)
        this.progress_service.completeLoading()
      },
      complete: ()=>{this._router.navigate(['/login'])}
    }
    this.auth_srvice.register(f.value).subscribe(registerObs)
  }
}
