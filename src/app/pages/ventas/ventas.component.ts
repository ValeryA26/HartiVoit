import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import '@clr/icons';

ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [TabsComponent, ClrFormsModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})



export class VentasComponent {

}
