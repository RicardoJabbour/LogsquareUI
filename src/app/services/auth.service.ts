import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../models/LoginRequest";
import { User } from "../models/User";

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

  signIn(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrlAuth}` + "SignIn", user);
  }
}
