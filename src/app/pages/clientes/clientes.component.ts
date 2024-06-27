import { Component } from '@angular/core';
import { TabsComponent } from '../../core/components/tabs/tabs.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

}
