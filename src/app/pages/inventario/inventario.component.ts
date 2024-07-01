import { Component, OnInit  } from '@angular/core';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { ClrIconModule, ClrInputModule } from '@clr/angular';
import { InventoryService } from './inventario.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../core/components/dialog/modalc/modalc.component';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [ModalComponent,TabsComponent, FormsModule, ClrInputModule, ClrIconModule,CommonModule ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {
  input="";
  isModalOpen: boolean = false;
  selectedProduct: any = null;
  products: any[] = [];  // Lista de productos

  constructor(private productService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductos().subscribe(data => {
      this.products = data;
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  saveProduct(product: any): void {
    if (this.selectedProduct) {
      // Editar producto existente
      const index = this.products.findIndex(p => p === this.selectedProduct);
      if (index !== -1) {
        this.products[index] = product;
      }
    } else {
      // Crear nuevo producto
      this.products.push(product);
    }
    this.closeModal();
  }
}