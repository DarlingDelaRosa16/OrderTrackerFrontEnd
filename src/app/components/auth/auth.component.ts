import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { alerUserWrong, alertServerDown } from 'src/app/modules/dashboard/modules/orders/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  formUserLogIn!: FormGroup;
  seePass: string = 'password'

  constructor(
    public fb: FormBuilder,
    private api: AuthService,
    private router: Router,
    //private localStore: LocalStorageService
  ){
    this.formUserLogIn = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  seePassword() {
    if (this.seePass == 'password') this.seePass = 'text'
    else this.seePass = 'password'
  }

  logIn() {
    if (this.formUserLogIn.valid) {

      this.api.logIn(this.formUserLogIn.value)
      .pipe(
        catchError((error)=>{
          alertServerDown();
          return error
        })
      )
      .subscribe((res: any) => {

          if(res != null){
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard/orders']);
          }
          else{ alerUserWrong() }
      })
    }
  }
}


