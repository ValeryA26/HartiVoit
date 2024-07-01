import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ClarityModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modalv.component.html',
  styleUrls: ['./modalv.component.css']
})
export class ModalvComponent implements OnChanges {
  @Input() product: any = null;
  @Input() isOpen: boolean = false;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      marca: ['', Validators.required],
      linea: ['', Validators.required],
      proveedor: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio_detal: [0, [Validators.required, Validators.min(0)]],
      precio_mayor: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value);
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}