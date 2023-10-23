import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://localhost:7294/api"

  constructor(private http: HttpClient) { }

  logIn(user: any) { return this.http.post<any>(`${this.baseUrl}/auth/login`, user) }
}
