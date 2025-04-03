import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // Corrigido: Importação dos módulos necessários
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() menuRoutes: { path: string; label: string }[] = [];
  idiomaSelecionado: string = 'pt';
  imagePath: string = 'assets/logo.png';
  menuOpen: boolean = false;

  trocarIdioma(event: any) {
    this.idiomaSelecionado = event.target.value;
    console.log('Idioma alterado para:', this.idiomaSelecionado);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}