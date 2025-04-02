import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout-button',
  template: `<button class="btn-sair" (click)="logout()">Sair</button>`,
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout(); // Encerra a sessão e redireciona
  }
}