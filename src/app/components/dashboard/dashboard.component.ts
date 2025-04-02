import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, LogoutButtonComponent], // Adicionado
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  // Adicionado implements OnInit
  user: any = null; // Inicializa como null
  dashboardRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/deposito', label: 'Depósito' },
    { path: '/saque', label: 'Saque' },
    { path: '/mostrar-saldo', label: 'Mostrar Saldo' },
    { path: '/transactions', label: 'Extrato' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {  // Adicionado tipo de retorno void para boas práticas
    this.user = this.authService.getUserData();
    console.log('Usuário carregado:', this.user);
    console.log('Rotas enviadas para o Header:', this.dashboardRoutes);
  }
}