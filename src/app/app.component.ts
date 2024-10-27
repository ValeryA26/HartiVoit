import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './core/components/tabs/tabs.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@clr/core/icon';

ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabsComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'hartivoit';
}

