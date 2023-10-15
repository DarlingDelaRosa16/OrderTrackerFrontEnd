import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdersModule } from './modules/orders/orders.module';

@NgModule({
  declarations: [
    dashboardComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    OrdersModule
  ]
})
export class DashboardModule { }
