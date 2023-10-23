import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent {

  sidenavOpened: boolean = false;

  constructor(
    private router: Router,
  ){}

  logOut(){
    localStorage.clear()
    this.router.navigate(['/']);
  }

}
