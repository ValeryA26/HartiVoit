import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent {
  constructor(private router: Router, private authService: AuthService){}
  
  navegar(direccion:string){
    this.router.navigate([direccion])
  }

  logout(): void {
    this.authService.logout();
  }
}
