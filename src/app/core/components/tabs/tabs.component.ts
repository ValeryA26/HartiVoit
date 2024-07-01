import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  
  constructor(private router: Router,private authService: AuthService){}
  
  navegar(direccion:string){
    this.router.navigate([direccion])
  }
  logout(): void {
    this.authService.logout();
  }
}

