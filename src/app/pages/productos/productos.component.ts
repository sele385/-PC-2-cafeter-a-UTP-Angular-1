import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">🛒 Catálogo de Productos</h2>

      <!-- Req. 2: @for para recorrer la lista de productos -->
      <div class="row">
        @for (producto of productos; track producto.id) {

          <!-- Req. 4: Condición visual para productos sin stock -->
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm" [class.sin-stock]="producto.stock === 0">
              <div class="card-body">
                <h5 class="card-title">{{ producto.nombre }}</h5>
                <h6 class="card-subtitle mb-2">
                  <span class="badge bg-secondary">{{ producto.categoria }}</span>
                </h6>
                <p class="card-text mt-2">
                  <!-- Req. 3: Pipe de moneda para mostrar el precio -->
                  <strong>Precio:</strong>
                  <span class="text-danger fw-bold fs-5">
                    {{ producto.precio | currency:'PEN':'S/ ':'1.2-2' }}
                  </span>
                </p>
                <p class="card-text">
                  <strong>Stock:</strong> {{ producto.stock }}
                </p>
              </div>
              <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
                @if (producto.stock === 0) {
                  <span class="badge bg-danger">Sin stock</span>
                } @else {
                  <span class="badge bg-success">Disponible</span>
                  <a [routerLink]="['/pedido']"
                     [queryParams]="{ productoId: producto.id }"
                     class="btn btn-sm btn-danger">
                    Pedir
                  </a>
                }
              </div>
            </div>
          </div>

        }
      </div>

      @if (productos.length === 0) {
        <div class="alert alert-info">Cargando productos...</div>
      }
    </div>
  `
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    // GET /api/productos
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}
