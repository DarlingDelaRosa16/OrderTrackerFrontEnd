import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: dashboardComponent,
    children:[
      {
        path: 'orders',
        loadChildren: ()=>
        import('./modules/orders/orders.routing.module').then((m)=>m.ordersRoutingModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardRoutingModule {}
