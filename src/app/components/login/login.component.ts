import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Importa o Router
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  emailExiste: boolean = false;
  erroEmail: boolean = false;
  mostrarRegistro: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.verificarEmail(this.email).subscribe(
      (response) => {
        if (response.emailExiste) {
          // Verifica se o email existe e então envia o login com a senha
          this.authService.login(this.email, this.password).subscribe(
            (res) => {
              console.log('Login bem-sucedido:', res);

              // Salvar o token e os dados do usuário
              this.authService.saveUserData(res.token, res.user);

              // Navegar para o dashboard
              this.router.navigate(['/dashboard']);  // Redirecionando para o dashboard
            },
            (err) => {
              console.error('Erro ao fazer login:', err);
            }
          );
        } else {
          console.error('Usuário não cadastrado');
          this.erroEmail = true;
        }
      },
      (error) => {
        console.error('Erro na verificação de email:', error);
      }
    );
  }

  verificarEmail() {
    this.authService.verificarEmail(this.email).subscribe(
      (response) => {
        if (response.emailExiste) {
          this.emailExiste = true;
          this.erroEmail = false;
        } else {
          this.emailExiste = false;
          this.erroEmail = true;
        }
      },
      (error) => {
        this.emailExiste = false;
        this.erroEmail = true;
      }
    );
  }

  onRegister() {
    this.http.post('http://localhost:5000/api/auth/register', { name: this.name, email: this.email, password: this.password })
      .subscribe(
        (res: any) => {
          console.log('Registro bem-sucedido:', res);
          this.mostrarRegistro = false;
        },
        (err) => {
          console.error('Erro ao registrar:', err);
        }
      );
  }
  imagePath: string = 'assets/logo.png';
}