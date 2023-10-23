import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  baseUrl = environment.domain

  constructor(private http: HttpClient) {}

  getOrders(value: string, fromDate: Date, toDate: Date, status: number, itemPP: number, page: number, token: string) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${token}`})

    let fd = ''
    let td = ''
    console.log(typeof status);

    if(fromDate && toDate){
      fd = format(fromDate, 'yyyy/MM/dd');
      td = format(toDate, 'yyyy/MM/dd');
    }
    return this.http.get<any>(`${this.baseUrl}/Order?rowsperpage=${itemPP}&page=${page}&Status=${status}&searchvalue=${value}&FromDate=${fd}&ToDate=${td}`, {headers}) //, AreaTokenHeader
  }

  postOrders(order: any, token: string) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${token}`})
    return this.http.post<any>(`${this.baseUrl}/Order`, order, {headers})
  }

  putOrders(order: any, token: string) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${token}`})
    return this.http.put<any>(`${this.baseUrl}/Order`, order, {headers})
  }

  deleteOrders(id: number, token: string) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${token}`})
    return this.http.delete<any>(`${this.baseUrl}/Order/${id}`, {headers})
  }
}
