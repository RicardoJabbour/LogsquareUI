import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../models/LoginRequest";

@Injectable({
    providedIn: 'root'
  })

export class AuthService{

    private readonly baseUrlAuth = 'https://localhost:7267/Auth/';

    http = inject(HttpClient);

    login(loginRequest: Login): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.baseUrlAuth + "Login", loginRequest, { headers });
      }
}
