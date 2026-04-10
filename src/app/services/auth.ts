import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Ajustamos al puerto de tu backend 
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(credenciales: { email: string; password: string }): Observable<any> {
    // Esto enviará el POST a http://localhost:8082/api/auth/login
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }
}
