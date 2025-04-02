import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-transactions',
  imports: [FormsModule, HttpClientModule, CommonModule, HeaderComponent, FooterComponent, LogoutButtonComponent],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  mensagemErro: string = '';

  menuRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/deposito', label: 'Depósito' },
    { path: '/saque', label: 'Saque' },
    { path: '/mostrar-saldo', label: 'Mostrar Saldo' },
    { path: '/extrato', label: 'Extrato' }
  ];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    // Verificar se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      this.mensagemErro = 'Usuário não autenticado. Por favor, faça login.';
      return;
    }

    this.http.get<any[]>('http://localhost:5000/api/bank/transactions', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe({
      next: (data) => {
        // Transforma os tipos de transações para "Depósito" e "Retirada"
        this.transactions = data.map(transaction => {
          transaction.type = this.mapTransactionType(transaction.type);
          return transaction;
        });
      },
      error: (err) => {
        console.error('Erro ao buscar transações:', err);
        this.mensagemErro = err?.error?.msg || 'Erro ao carregar transações.';
      }
    });
  }

  // Função para mapear o tipo da transação
  mapTransactionType(type: string): string {
    switch (type) {
      case 'deposit':
        return 'Depósito';
      case 'withdraw':
        return 'Retirada';
      default:
        return type; // Retorna o tipo original caso não seja nem 'deposit' nem 'withdraw'
    }
  }

  generatePDF() {
    // Gerar o PDF com as transações
    this.http.get('http://localhost:5000/api/bank/generate-statement', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
      responseType: 'blob'
    }).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'extrato_bancario.pdf';
        a.click();
      },
      error: (err) => {
        console.error('Erro ao gerar o PDF:', err);
        this.mensagemErro = 'Erro ao gerar o extrato PDF.';
      }
    });
  }
}