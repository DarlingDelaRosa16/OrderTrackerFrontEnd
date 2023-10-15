import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';


@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  baseUrl = "https://localhost:7294/api"
  constructor(private http: HttpClient) { }

  getOrders(value: string, fromDate: Date, toDate: Date, status: number, itemPP: number, page: number) {
    // const AreaTokenHeader = { headers: this.headers }
    let fd = ''
    let td = ''
    console.log(typeof status);

    if(fromDate && toDate){
      fd = format(fromDate, 'yyyy/MM/dd');
      td = format(toDate, 'yyyy/MM/dd');
    }
    return this.http.get<any>(`${this.baseUrl}/Order?rowsperpage=${itemPP}&page=${page}&Status=${status}&searchvalue=${value}&FromDate=${fd}&ToDate=${td}`) //, AreaTokenHeader
  }

  postOrders(order: any) {
    // const AreaTokenHeader = { headers: this.headers }
    return this.http.post<any>(`${this.baseUrl}/Order`, order)//AreaTokenHeader
  }

  putOrders(order: any) {
    // const AreaTokenHeader = { headers: this.headers }
    return this.http.put<any>(`${this.baseUrl}/Order`, order)//AreaTokenHeader
  }

  deleteOrders(id: number){
    return this.http.delete<any>(`${this.baseUrl}/Order/${id}`)
  }
}
