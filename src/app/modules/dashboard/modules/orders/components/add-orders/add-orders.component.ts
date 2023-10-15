import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { alertIsSuccess, alertServerDown } from '../../alerts/alerts';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  formNewOrder: FormGroup;

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public order: any,
    private orderService: OrdersService,
    private dialogRef: MatDialogRef<AddOrdersComponent>,
  ) {
    this.formNewOrder = this.fb.group({
      orderId: new FormControl(''),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      firstPayment: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      customerId: new FormControl(''),
      orderstatusid: new FormControl(''),
    })
  }

  ngOnInit(): void {
    if (this.order.item != null) {
      this.formNewOrder.patchValue({
        orderId: this.order.item.orderId,
        description: this.order.item.description,
        price: this.order.item.price,
        firstPayment: this.order.item.firstPayment,
        customerId: this.order.item.customerId,
        name: this.order.item.customerName,
        orderstatusid: this.order.item.statusId
      })
    }
  }

  closeModal() { this.dialogRef.close() }

  sendData() {

    if (this.formNewOrder.valid) {

      if (this.order.item == null) {

        this.orderService.postOrders(this.formNewOrder.value)
          .pipe(catchError((error) => {
            alertServerDown()
            return error
          }))
          .subscribe((res: any) => {
            if (res != null) {
              alertIsSuccess(true)
              this.closeModal()
            } else {
              alertIsSuccess(false)
            }
          })

      } else {
        this.orderService.putOrders(this.formNewOrder.value)
          .pipe(catchError((error) => {
            alertServerDown()
            return throwError(error)
          }))
          .subscribe((res: any) => {
            if (res != null) {
              alertIsSuccess(true)
              this.closeModal()
            } else {
              alertIsSuccess(false)
            }
          })
      }
    }
  }

}
