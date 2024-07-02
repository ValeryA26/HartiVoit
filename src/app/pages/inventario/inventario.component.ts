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
  selectedProduct: any = {};
  products: any[] = [];  // Lista de productos
  filteredProducts: any[] = [];  // Lista de productos filtrados

  constructor(private productService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductos().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  openModal(product: any = {}): void {
    this.isModalOpen = true;
    this.selectedProduct = product || {};
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = {};
  }

  saveProduct(product: any = null): void {
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
  deleteProduct(product: any): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el producto ${product.nombre}?`)) {
      this.productService.deleteProducto(product.id).subscribe(() => {
        this.products = this.products.filter(p => p !== product);
      });
    }
  }
  searchProducts(): void {
    this.filteredProducts = this.products.filter(product => 
      product.nombre.toLowerCase().includes(this.input.toLowerCase()) || 
      product.custom_id.toLowerCase().includes(this.input.toLowerCase())
    );
  }
}