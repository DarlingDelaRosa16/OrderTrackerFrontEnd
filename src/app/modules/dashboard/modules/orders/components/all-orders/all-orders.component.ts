import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrdersComponent } from '../add-orders/add-orders.component';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from '../../alerts/alerts';
import { OrdersService } from '../../services/orders.service';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  allOrderList: any[] = []
  pagina: number = 1
  noPage: number = 1
  formFilter: FormGroup;
  token = localStorage.getItem('token')

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private orderService: OrdersService,
  ) {
    this.formFilter = this.fb.group({
      searchValue: new FormControl(''),
      status: new FormControl(0),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    })

<<<<<<< HEAD
    this.formFilter.valueChanges.subscribe(() => { this.getAllOrders() })
=======
    this.formFilter.valueChanges.subscribe(() => {
      this.pagina = 1;
      this.getAllOrders()
    })
>>>>>>> da05dea4e6249b58e270113ed08aa5780a512544
  }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    const { searchValue, fromDate, toDate, status } = this.formFilter.value
    if (this.token != null) {
      this.orderService.getOrders(searchValue, fromDate, toDate, status, 10, this.pagina, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return throwError(error)
          })
        )
        .subscribe((res: any) => {
          this.allOrderList = res.items
          this.noPage = res.totalPages
        })
    }
  }

  openModal(item: any) {
    console.log(item);

    let dialogRef = this.dialog.open(AddOrdersComponent, { data: { item } }) //{ data: detailId }
    dialogRef.afterClosed().subscribe(() => {
      this.getAllOrders()
    })
  }

  async removeAlert(item: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise && this.token != null) {
      this.orderService.deleteOrders(item, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return throwError(error)
          })
        )
        .subscribe((res: any) => {
          if (res != null) {
            alertRemoveSuccess()
            this.getAllOrders()
          } else {
            alertIsSuccess(false)
          }
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getAllOrders()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getAllOrders()
    }
  }
}
