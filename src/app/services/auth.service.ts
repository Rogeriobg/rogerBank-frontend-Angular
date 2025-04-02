import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // URL do seu backend

  constructor(private http: HttpClient, private router: Router) {}

  // Função para realizar o login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Função para salvar os dados do usuário e o token
  saveUserData(token: string, user: any) {
    localStorage.setItem('token', token);  // Salvando o token
    localStorage.setItem('user', JSON.stringify(user));  // Salvando o usuário
  }

  // Função para obter os dados do usuário
  getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;  // Retorna os dados do usuário
  }

  // Função para obter o token
  getToken() {
    return localStorage.getItem('token');  // Retorna o token
  }

  // Função para deslogar (remover dados)
  logout() {
    localStorage.removeItem('user'); // Remove os dados do usuário armazenados
    localStorage.removeItem('token'); // Remove o token
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }

  // Função para verificar se o email já está cadastrado
  verificarEmail(email: string): Observable<any> {
    return this.http.post<{ emailExiste: boolean }>(`${this.apiUrl}/verificar-email`, { email });
  }

  // Função para verificar se o usuário está autenticado (token válido)
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false; // Retorna true se o token estiver presente
  }

  // Função para obter o saldo, verificando a autenticidade antes
  getSaldo(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/login']);  // Se não houver token, redireciona para login
      return new Observable(observer => {
        observer.error('Usuário não autenticado');  // Emite erro caso não tenha token
      });
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/balance`, { headers });
  }
}