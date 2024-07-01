import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges,OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'
import { InventoryService } from '../../../../pages/inventario/inventario.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ClarityModule,ReactiveFormsModule],
  templateUrl: './modalc.component.html',
  styleUrl: './modalc.component.scss'
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
      id: ['', Validators.required],
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
      if (this.lineas.length > 0 && this.proveedores.length > 0) {
        this.productForm.patchValue({
          linea: this.product.linea ? this.product.linea.id : null,
          proveedor: this.product.proveedor ? this.product.proveedor.id : null
        });
      }
    }
  }

  loadLineas(): void {
    this.inventarioService.getLineas().subscribe((data) => {
      this.lineas = data;
      // Establecer el valor del campo 'linea' después de cargar las líneas
      if (this.product.linea) {
        this.productForm.patchValue({ linea: this.product.linea.id });
      }
    });
  }

  loadProveedores(): void {
    this.inventarioService.getProveedores().subscribe((data) => {
      this.proveedores = data;
      // Establecer el valor del campo 'proveedor' después de cargar los proveedores
      if (this.product.proveedor) {
        this.productForm.patchValue({ proveedor: this.product.proveedor.id });
      }
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
    this.productForm.reset();
  }
}