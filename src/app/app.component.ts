import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ Importa o RouterOutlet para exibir as rotas
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Corrigido "styleUrls" (com "s")
})
export class AppComponent {
  title = 'rogerbank';
}