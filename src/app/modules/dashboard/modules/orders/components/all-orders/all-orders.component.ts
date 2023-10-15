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
export class AllOrdersComponent implements OnInit{

  allOrderList: any[] = []
  pagina: number = 1
  noPage: number = 1
  formFilter: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private orderService: OrdersService,
  ) {
    this.formFilter = this.fb.group({
      searchValue: new FormControl(''),
      status: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    })

    this.formFilter.valueChanges.subscribe(() => { this.getAllOrders()})
  }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    const {searchValue, fromDate, toDate, status} = this.formFilter.value

    this.orderService.getOrders(searchValue, fromDate, toDate, status, 10, this.pagina)
    .pipe(
      catchError((error)=>{
        alertServerDown()
        return throwError(error)
      })
    )
    .subscribe((res:any)=>{
      this.allOrderList = res.items
      this.noPage = res.totalPages
    })
  }

  openModal(item: any) { //detailId: number
    console.log(item);

    let dialogRef = this.dialog.open(AddOrdersComponent, { data: {item}}) //{ data: detailId }
    dialogRef.afterClosed().subscribe(() => {
      this.getAllOrders()
    })
  }

  async removeAlert(item: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if(removeChoise){
      this.orderService.deleteOrders(item)
      .pipe(
        catchError((error)=>{
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any)=>{
        if(res!= null){
          alertRemoveSuccess()
          this.getAllOrders()
        }else{
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
