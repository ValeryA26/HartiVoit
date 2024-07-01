import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ClarityModule,ReactiveFormsModule],
  templateUrl: './modalc.component.html',
  styleUrl: './modalc.component.scss'
})

export class ModalComponent implements OnChanges {
  @Input() open: boolean = false;
  @Input() product: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: [null, Validators.required],
      marca: ['', Validators.required],
      linea: ['', Validators.required],
      proveedor: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio_detal: [null, [Validators.required, Validators.min(0)]],
      precio_mayor: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue(this.product || {});
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
    this.productForm.reset();
  }

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