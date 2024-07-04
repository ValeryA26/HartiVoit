import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: true,
  imports: [CommonModule,ClarityModule]
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmación';
  @Input() message = '¿Estás seguro?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
    this.isOpen = false;
  }

  close() {
    this.closed.emit();
    this.isOpen = false;
  }
}
