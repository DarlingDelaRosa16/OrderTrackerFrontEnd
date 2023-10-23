import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.domain;

  constructor(private http: HttpClient) { }

  logIn(user: any) { return this.http.post<any>(`${this.baseUrl}/auth/login`, user) }
}
