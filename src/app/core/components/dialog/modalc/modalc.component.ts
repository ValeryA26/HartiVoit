import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ValidationErrors, FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../../../pages/inventario/inventario.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ClarityModule, ReactiveFormsModule],
  templateUrl: './modalc.component.html',
  styleUrls: ['./modalc.component.scss']
})
export class ModalComponent implements OnChanges, OnInit {
  @Input() open: boolean = false;
  @Input() product: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  productForm: FormGroup;
  lineas: any[] = [];
  proveedores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventoryService
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [null, Validators.required],
      marca: ['', Validators.required],
      linea: ['', Validators.required],
      proveedor: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio_detal: [null, [Validators.required, Validators.min(0)]],
      precio_mayor: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadLineas();
    this.loadProveedores();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue(this.product || {});
    }
  }

  loadLineas(): void {
    this.inventarioService.getLineas().subscribe((data) => {
      this.lineas = data;
    });
  }

  loadProveedores(): void {
    this.inventarioService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      console.log('Form Value:', formValue);  // Verificar los datos

      if (this.product.id) {
        // Actualizar producto existente
        this.inventarioService.updateProducto(this.product.id, formValue).subscribe(
          (updatedProduct) => {
            console.log('Producto actualizado:', updatedProduct);
            this.save.emit(updatedProduct);
            this.onClose();
          },
          (error) => {
            console.error('Update error:', error);
          }
        );
      } else {
        // Crear nuevo producto
        this.inventarioService.addProducto(formValue).subscribe(
          (newProduct) => {
            console.log('Producto creado:', newProduct);
            this.save.emit(newProduct);
            this.onClose();
          },
          (error) => {
            console.error('Create error:', error);
          }
        );
      }
    } else {
      console.error('Formulario inválido');
      console.log('Errores en el formulario:', this.productForm.errors);
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        if (control) {
          const controlErrors: ValidationErrors | null = control.errors;
          if (controlErrors) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Error en el campo:', key, 'Error:', keyError, controlErrors[keyError]);
            });
          }
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
    this.productForm.reset();
  }
}
