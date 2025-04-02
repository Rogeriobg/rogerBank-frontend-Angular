import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes'; // Verifique se este caminho está correto!

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ✅ Configura as rotas
    provideHttpClient()       // ✅ Fornece o HttpClient para a aplicação

  ]
}).catch(err => console.error(err));
