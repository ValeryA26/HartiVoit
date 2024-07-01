import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import '@cds/core/icon/register.js';
import '@cds/core/button/register.js';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}productos/`);
  }

  getLineas(): Observable<any> {
    return this.http.get(`${this.apiUrl}lineas/`);
  }

  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}proveedors/`);
  }

  addProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}productos/`, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}productos/${id}/`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}productos/${id}/`);
  }
}
