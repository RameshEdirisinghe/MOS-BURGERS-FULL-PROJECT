import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/user/login'; 

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, { user, password });
  }
}