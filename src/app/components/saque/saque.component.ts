import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaqueService } from '../../services/saque.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-saque',
  standalone: true,

  imports: [FormsModule, HttpClientModule, CommonModule, HeaderComponent, FooterComponent, LogoutButtonComponent],
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent {
  user: any = null; // Inicializa como null
  // Corrigindo menuRoutes para seguir o padrão esperado pelo <app-header>
  menuRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/deposito', label: 'Depósito' },
    { path: '/saque', label: 'Saque' },
    { path: '/mostrar-saldo', label: 'Mostrar Saldo' },
    { path: '/extrato', label: 'Extrato' }
  ];

  valorSaque: number | null = null;
  mensagem: string = '';
  mensagemSucesso: boolean = false;

  constructor(private saqueService: SaqueService) {}

  sacar() {
    if (!this.valorSaque || this.valorSaque <= 0) {
      this.mensagem = 'Por favor, insira um valor válido.';
      this.mensagemSucesso = false;
      return;
    }

    this.saqueService.realizarSaque(this.valorSaque).subscribe({
      next: () => {
        this.mensagem = 'Saque realizado com sucesso!';
        this.mensagemSucesso = true;
        this.valorSaque = null;
      },
      error: (err) => {
        this.mensagem = err?.error?.msg || 'Erro ao processar o saque.';
        this.mensagemSucesso = false;
      }
    });
  }
}