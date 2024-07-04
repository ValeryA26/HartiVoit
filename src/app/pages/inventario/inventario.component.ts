import { Component, OnInit  } from '@angular/core';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { ClrIconModule, ClrInputModule } from '@clr/angular';
import { InventoryService } from './inventario.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../core/components/dialog/modalc/modalc.component';
import { ConfirmModalComponent } from '../../core/components/dialog/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [ConfirmModalComponent,ModalComponent,TabsComponent, FormsModule, ClrInputModule, ClrIconModule,CommonModule ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {
  input="";
  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;
  selectedProduct: any = {};
  products: any[] = [];  // Lista de productos
  filteredProducts: any[] = [];  // Lista de productos filtrados

  constructor(private productService: InventoryService, private authService: AuthService) {}

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
    this.filteredProducts = [...this.products];
    this.closeModal();
  }
  
  deleteProduct(product: any): void {
    this.selectedProduct = product;
    this.isConfirmModalOpen = true;
  }

  confirmDeleteProduct(): void {
    this.productService.deleteProducto(this.selectedProduct.id).subscribe(() => {
      this.products = this.products.filter(p => p !== this.selectedProduct);
      this.filteredProducts = this.products;
    });
    this.isConfirmModalOpen = false;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(product => 
      product.nombre.toLowerCase().includes(this.input.toLowerCase()) || 
      product.custom_id.toLowerCase().includes(this.input.toLowerCase())
    );
  }
  hasEditPermission(): boolean {
    return this.authService.hasPermission('can_edit');
  }

  hasDeletePermission(): boolean {
    return this.authService.hasPermission('can_delete');
  }
  
  hasCreatePermission(): boolean {
    return this.authService.hasPermission('can_create');
  }
}