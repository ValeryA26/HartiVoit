import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrDropdownModule } from '@clr/angular';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ClrFormsModule, ClrDropdownModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = {
    type: 'local',
    username: '',
    password: '',
    rememberMe: false,
  };
  
  errorMessage: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.form.username, this.form.password).subscribe(
      () => {
        this.loginFailed = false; 
      },
      error => {
        this.errorMessage = 'Credenciales inválidas';
        this.loginFailed = true; 
      }
    );
  }
}
