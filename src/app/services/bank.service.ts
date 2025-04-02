import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Remove imports, pois HttpClient já está disponível
})
export class BankService {
  private apiUrl = 'http://localhost:5000/api/bank';

  constructor(private http: HttpClient) {}

  getBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/balance`, this.getHeaders());
  }

  deposit(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit`, { amount }, this.getHeaders());
  }

  withdraw(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw`, { amount }, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('x-auth-token', token || '')
    };
  }
}