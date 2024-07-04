import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioComponent } from './inventario.component';
import { InventoryService } from './inventario.service';
import { AuthService } from '../../core/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrIconModule, ClrInputModule } from '@clr/angular';
import { ModalComponent } from '../../core/components/dialog/modalc/modalc.component';
import { ConfirmModalComponent } from '../../core/components/dialog/confirm-modal/confirm-modal.component';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;
  let inventoryService: InventoryService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ClrIconModule,
        ClrInputModule,
        InventarioComponent, // Importa el componente standalone aquí
        ModalComponent, // Importa el componente standalone aquí
        ConfirmModalComponent // Importa el componente standalone aquí
      ],
      providers: [InventoryService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const products = [{ custom_id: '1', nombre: 'Producto 1', marca: 'Marca 1', linea_nombre: 'Linea 1', cantidad: 10 }];
    spyOn(inventoryService, 'getProductos').and.returnValue(of(products));
    component.ngOnInit();
    expect(component.products).toEqual(products);
  });

  it('should filter products based on search input', () => {
    component.products = [
      { custom_id: '1', nombre: 'Producto 1', marca: 'Marca 1', linea_nombre: 'Linea 1', cantidad: 10 },
      { custom_id: '2', nombre: 'Producto 2', marca: 'Marca 2', linea_nombre: 'Linea 2', cantidad: 20 }
    ];
    component.input = 'Producto 1';
    component.searchProducts();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].nombre).toBe('Producto 1');
  });

  it('should call deleteProduct method from InventoryService', () => {
    spyOn(inventoryService, 'deleteProducto').and.callThrough();
    component.selectedProduct = { id: 1, nombre: 'Test Product' };
    component.confirmDeleteProduct();
    expect(inventoryService.deleteProducto).toHaveBeenCalledWith(1);
  });
});
