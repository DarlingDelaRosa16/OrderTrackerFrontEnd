import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AddOrdersComponent } from './components/add-orders/add-orders.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AllOrdersComponent,
    AddOrdersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule
  ]
})
export class OrdersModule { }
