import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  private apiUrl = 'http://localhost:5000/api/bank/balance'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Função para obter o saldo do usuário
  getSaldo(): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    // Corrigindo a URL: removendo o '/balance' extra
    return this.http.get(this.apiUrl, { headers });
  }
}