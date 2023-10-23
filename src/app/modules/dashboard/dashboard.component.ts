import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { alertLogOut } from './modules/orders/alerts/alerts';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent {

  sidenavOpened: boolean = false;

  constructor(
    private router: Router,
  ) { }

  async logOut() {
    let closeAccount: boolean = await alertLogOut()

    if (closeAccount) {
      localStorage.clear()
      this.router.navigate(['/']);
    }

  }

}
