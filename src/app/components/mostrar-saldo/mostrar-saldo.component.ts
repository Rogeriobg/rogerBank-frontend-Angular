import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoService } from '../../services/saldo.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-mostrar-saldo',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, HeaderComponent, FooterComponent, LogoutButtonComponent],
  templateUrl: './mostrar-saldo.component.html',
  styleUrls: ['./mostrar-saldo.component.css']
})
export class MostrarSaldoComponent implements OnInit {
  saldo: number = 0;
  mensagemErro: string = '';
  saldoValido: boolean = false;

  // Corrigindo menuRoutes para seguir o padrão esperado pelo <app-header>
  menuRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/deposito', label: 'Depósito' },
    { path: '/saque', label: 'Saque' },
    { path: '/mostrar-saldo', label: 'Mostrar Saldo' },
    { path: '/extrato', label: 'Extrato' }
  ];

  constructor(
    private saldoService: SaldoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.mensagemErro = 'Usuário não autenticado. Por favor, faça login.';
      return;
    }

    console.log('Usuário autenticado, carregando saldo...');

    this.saldoService.getSaldo().subscribe({
      next: (data) => {
        if (data?.balance !== undefined) {
          const balance = Number(data.balance);
          if (!isNaN(balance)) {
            this.saldo = balance;
            this.saldoValido = true;
          } else {
            this.saldoValido = false;
            this.mensagemErro = 'Erro ao processar saldo recebido.';
          }
        } else {
          this.saldoValido = false;
          this.mensagemErro = 'Saldo não disponível.';
        }
      },
      error: (err) => {
        console.error('Erro ao carregar saldo:', err);
        this.mensagemErro = err?.error?.msg || 'Erro ao carregar saldo.';
        this.saldoValido = false;
      }
    });
  }
}