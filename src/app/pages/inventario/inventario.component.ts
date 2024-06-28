import { Component } from '@angular/core';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { ClrIconModule, ClrInputModule } from '@clr/angular';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [TabsComponent, FormsModule, ClrInputModule, ClrIconModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  input='';
}