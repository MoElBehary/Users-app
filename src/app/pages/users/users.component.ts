import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service'
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('passwordInp') passwordINP: ElementRef
  constructor(
    public users_service: UsersService,
    public auth_srvice: AuthService,
    public progress_service: ProgressBarService,
    private alertService: AlertService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  // [#] CONTROLLERS
  // [?] refresh the input value
  refreshInp(){
    this.passwordINP.nativeElement.value = ''
  }
  // [#] HTTP REQs
  // [?] get all users
  getAllUsers(){
    this.progress_service.startLoading()
    const users = {
      next: res=>{
        this.progress_service.setSuccess()
        this.users_service.users = res
        this.progress_service.completeLoading()
      },
      error: err=> console.log(err)
    }
    this.users_service.getAllUsers().subscribe(users)
  }
  // [?] log out after deleting yourself
  deleteYourSelf(id: any){
    if(id === this.auth_srvice.user.id){
      localStorage.removeItem('token')
      this.alertService.success('Bye :(')
      this._router.navigate(['/login'])
    }
  }
  // [?] delete selected user
  deleteUser(id: any, name: String, index: number){
    this.progress_service.startLoading()
    const dataOps = {
      next: res=>{
        this.progress_service.setSuccess()
        this.alertService.success(`${name} is deleted!`);
        this.progress_service.completeLoading()
      },
      error: err => {
        this.progress_service.setError()
        console.log(err)
        this.alertService.danger('Sorry there is an error!');
        this.progress_service.completeLoading()
      },
      complete: ()=>{
        this.users_service.users.splice(index,1)
        this.deleteYourSelf(id)
      }
    }
    this.users_service.deleteUser(id).subscribe(dataOps)
  }
  // [?] update new password
  changePassword(newPassword: any){
    this.progress_service.startLoading()
    let data = {password: newPassword}
    const updatedDataObs = {
      next: res=>{
        this.progress_service.setSuccess()
        this.alertService.success(`Password changed`);
      },
      error: err=>{
        this.progress_service.setError()
        console.log(err)
        this.alertService.danger('Sorry there is an error!');
        this.progress_service.completeLoading()
      },
      complete: () => { 
        this.refreshInp()
        this.progress_service.completeLoading()
      }
    }
    this.users_service.changePassword(this.auth_srvice.user.id, data).subscribe(updatedDataObs)
  }
}
