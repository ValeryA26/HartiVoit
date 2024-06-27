import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrDropdownModule } from '@clr/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ClrFormsModule, ClrDropdownModule],
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
}
