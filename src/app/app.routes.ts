import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Importa o LoginComponent
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { MostrarSaldoComponent } from './components/mostrar-saldo/mostrar-saldo.component';
import { SaqueComponent } from './components/saque/saque.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'deposito', component: DepositoComponent },
  { path: 'mostrar-saldo', component: MostrarSaldoComponent }, // Rota para Mostrar Saldo
  { path: 'saque', component: SaqueComponent },
  { path: 'transactions', component: TransactionsComponent },


  { path: '**', redirectTo: '/login' }
];

