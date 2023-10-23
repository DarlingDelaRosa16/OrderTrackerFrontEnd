import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AllOrdersComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ordersRoutingModule {}
