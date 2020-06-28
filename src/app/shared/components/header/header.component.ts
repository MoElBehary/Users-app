import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../../services/progress-bar.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private progress: NgProgress,
     public progress_service: ProgressBarService,
      public auth_service: AuthService,
      private alertService: AlertService
      ) { }

  ngOnInit() {
    this.progress_service.progressRef = this.progress.ref('progressBar');
  }
  // [?] remove token from localstorage (log out)
  logOut(){
    localStorage.removeItem('token')
    this.alertService.success('Logged out successfuly!')
  }
}
