import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaqueService {
  private apiUrl = 'http://localhost:5000/api/bank/withdraw'; // Remover o espaço extra

  constructor(private http: HttpClient) { }

  realizarSaque(amount: number): Observable<any> {
    const token = localStorage.getItem('token'); // Pegue o token salvo no login

    if (!token) {
      throw new Error('Token JWT não encontrado. Faça login novamente.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Corrigindo a chave enviada para o backend
    return this.http.post(this.apiUrl, { amount }, { headers });
  }
}