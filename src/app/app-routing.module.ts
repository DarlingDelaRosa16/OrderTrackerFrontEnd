import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard, authGuardBack } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: ()=>
    import('./modules/dashboard/dashboard.routing.module').then((m)=>m.dashboardRoutingModule)
  },
  { path: '',  component: AuthComponent, canActivate: [authGuardBack], },
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
