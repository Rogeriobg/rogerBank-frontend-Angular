import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importando HttpClientModule
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DepositoService } from '../../services/deposito.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-deposito',
  standalone: true,
    imports: [FormsModule, HttpClientModule, CommonModule,  HeaderComponent, FooterComponent, LogoutButtonComponent], // Declarando HttpClientModule aqui
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {

  user: any = null; // Inicializa como null
  depositoRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/deposito', label: 'Depósito' },
    { path: '/saque', label: 'Saque' },
    { path: '/mostrar-saldo', label: 'Mostrar Saldo' },
    { path: '/extrato', label: 'Extrato' }
  ];
 
  valorDeposito: number | null = null;
  mensagem: string = '';

  constructor(private depositoService: DepositoService, private authService: AuthService) {}
  depositar() {
    // Converter o valor para número e validar
    const valorConvertido = Number(this.valorDeposito);
    console.log('Valor convertido:', valorConvertido); // Log para debug
  
    if (!this.valorDeposito || isNaN(valorConvertido) || valorConvertido <= 0) {
      this.mensagem = 'Por favor, insira um valor válido.';
      return;
    }
  
    console.log('Valor do depósito enviado:', valorConvertido); // Log para verificar envio correto
   
    // Chama o serviço para realizar o depósito
    this.depositoService.realizarDeposito(valorConvertido).subscribe({
      next: (res) => {
        console.log('Resposta do servidor:', res); // Log para debug
        this.mensagem = 'Depósito realizado com sucesso!';
        this.valorDeposito = null; // Limpa o campo após o depósito
      },
      error: (err) => {
        console.error('Erro ao realizar depósito:', err);
        this.mensagem = err?.error?.msg || 'Erro ao processar o depósito.';
      }
    });
  }
  
}