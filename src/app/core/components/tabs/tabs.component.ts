import { ApplicationModule, Component, NgModule } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  
  constructor(private router: Router){}
  
  navegar(direccion:string){
    this.router.navigate([direccion])
  }

  
}

