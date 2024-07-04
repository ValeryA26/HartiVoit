import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModalComponent } from './modalc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { InventoryService } from '../../../../pages/inventario/inventario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        ClarityModule,
        HttpClientTestingModule,
        ModalComponent // Importa el componente standalone aquí
      ],
      providers: [InventoryService]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lineas and proveedores on init', () => {
    const lineas = [{ id: 1, nombre: 'Linea 1' }];
    const proveedores = [{ id: 1, nombre: 'Proveedor 1' }];
    spyOn(inventoryService, 'getLineas').and.returnValue(of(lineas));
    spyOn(inventoryService, 'getProveedores').and.returnValue(of(proveedores));

    component.ngOnInit();
    expect(component.lineas).toEqual(lineas);
    expect(component.proveedores).toEqual(proveedores);
  });

  it('should emit save event when save button is clicked for new product', fakeAsync(() => {
    spyOn(component.save, 'emit');
    const newProduct = {
      id: 1,
      nombre: 'Test Product',
      cantidad: 10,
      marca: 'Test Marca',
      linea: 'Test Linea',
      proveedor: 'Test Proveedor',
      descripcion: 'Test Descripcion',
      precio_detal: 100,
      precio_mayor: 80
    };
    spyOn(inventoryService, 'addProducto').and.returnValue(of(newProduct));

    component.productForm.setValue({
      nombre: 'Test Product',
      cantidad: 10,
      marca: 'Test Marca',
      linea: 'Test Linea',
      proveedor: 'Test Proveedor',
      descripcion: 'Test Descripcion',
      precio_detal: 100,
      precio_mayor: 80
    });

    component.onSave();
    tick(); // Procesa el código asincrónico

    expect(component.save.emit).toHaveBeenCalledWith(jasmine.objectContaining(newProduct));
  }));

  it('should emit save event when save button is clicked for existing product', fakeAsync(() => {
    spyOn(component.save, 'emit');
    const updatedProduct = {
      id: 1,
      nombre: 'Updated Product',
      cantidad: 5,
      marca: 'Updated Marca',
      linea: 'Updated Linea',
      proveedor: 'Updated Proveedor',
      descripcion: 'Updated Descripcion',
      precio_detal: 150,
      precio_mayor: 130
    };
    spyOn(inventoryService, 'updateProducto').and.returnValue(of(updatedProduct));

    component.product = { id: 1 };
    component.ngOnChanges({
      product: {
        currentValue: { id: 1 },
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    component.productForm.setValue({
      nombre: 'Updated Product',
      cantidad: 5,
      marca: 'Updated Marca',
      linea: 'Updated Linea',
      proveedor: 'Updated Proveedor',
      descripcion: 'Updated Descripcion',
      precio_detal: 150,
      precio_mayor: 130
    });

    component.onSave();
    tick(); // Procesa el código asincrónico

    expect(component.save.emit).toHaveBeenCalledWith(jasmine.objectContaining(updatedProduct));
  }));

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
