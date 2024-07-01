import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ClrModalModule } from '@clr/angular';
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ClrModalModule],
  templateUrl: './modalc.component.html',
  styleUrl: './modalc.component.scss'
})

export class ModalComponent {
  open: boolean = false;
  product: any = {
    id: '',
    producto: '',
    number: null,
    branch: '',
    line: '',
    provider: '',
    description: '',
    priceMinorist: null,
    priceMayorist: null
  };

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  saveProduct() {
    console.log('Product saved', this.product);
    this.closeModal();
  }
}