import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "../models/User";
import { Observable } from "rxjs";
import { Result } from "../models/Result";

@Injectable({
    providedIn: 'root'
  })

export class UserService{
    private readonly baseUrl = 'https://localhost:7267/User/';

    http = inject(HttpClient);

    addUser(user: User): Observable<User[]>{
        return this.http.post<User[]>(`${this.baseUrl}`+"AddUser", user);
    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.baseUrl+"GetUsers");
    }
    
    updateUser(user: User): Observable<User[]>{
        return this.http.post<User[]>(`${this.baseUrl}`+"UpdateUser", user);
    }

    deleteUser(id: number): Observable<User[]>{
        return this.http.delete<User[]>(`${this.baseUrl}` + "DeleteUser?id=" + id);
    }
}