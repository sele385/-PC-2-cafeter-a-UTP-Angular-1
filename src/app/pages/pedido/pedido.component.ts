import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService, Producto, PedidoRequest } from '../../services/producto.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card shadow-sm">
            <div class="card-header bg-danger text-white">
              <h4 class="mb-0">📋 Registrar Pedido</h4>
            </div>
            <div class="card-body">

              <!-- Req. 5: Formulario con nombre, producto, cantidad y observación -->
              <form #pedidoForm="ngForm" (ngSubmit)="enviarPedido(pedidoForm)">

                <div class="mb-3">
                  <label for="nombreEstudiante" class="form-label">Nombre del Estudiante</label>
                  <input
                    type="text"
                    id="nombreEstudiante"
                    name="nombreEstudiante"
                    class="form-control"
                    placeholder="Ej: Juan Pérez"
                    [(ngModel)]="pedido.nombreEstudiante"
                    required />
                </div>

                <div class="mb-3">
                  <label for="productoId" class="form-label">Producto</label>
                  <select
                    id="productoId"
                    name="productoId"
                    class="form-select"
                    [(ngModel)]="pedido.productoId"
                    required>
                    <option value="">Seleccione un producto...</option>
                    <!-- *ngFor para recorrer productos con stock -->
                    @for (p of productosDisponibles; track p.id) {
                      <option [value]="p.id">{{ p.nombre }}</option>
                    }
                  </select>
                </div>

                <div class="mb-3">
                  <label for="cantidad" class="form-label">Cantidad</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    class="form-control"
                    min="1"
                    [(ngModel)]="pedido.cantidad"
                    required />
                </div>

                <div class="mb-4">
                  <label for="observacion" class="form-label">Observación</label>
                  <textarea
                    id="observacion"
                    name="observacion"
                    class="form-control"
                    rows="2"
                    placeholder="Ej: Sin azúcar, extra queso..."
                    [(ngModel)]="pedido.observacion">
                  </textarea>
                </div>

                <button type="submit" class="btn btn-danger w-100"
                  [disabled]="pedidoForm.invalid">
                  Enviar Pedido
                </button>
              </form>

              <!-- Req. 7: Mensaje de confirmación cuando el pedido se registre correctamente -->
              @if (mensajeExito) {
                <div class="alert alert-success mt-4">
                  <h5>✅ ¡Pedido registrado con éxito!</h5>
                  <p class="mb-0">
                    El estudiante <strong>{{ ultimoPedidoNombre }}</strong>
                    realizó un pedido de <strong>{{ ultimoPedidoCantidad }}x {{ ultimoPedidoProducto }}</strong>.
                    <span *ngIf="ultimoPedidoObs">
                      <br>Observación: <em>{{ ultimoPedidoObs }}</em>
                    </span>
                  </p>
                </div>
              }

              @if (mensajeError) {
                <div class="alert alert-danger mt-4">
                  <p class="mb-0">{{ mensajeError }}</p>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PedidoComponent implements OnInit {
  productosDisponibles: Producto[] = [];

  pedido: PedidoRequest = {
    nombreEstudiante: '',
    productoId: 0,
    cantidad: 1,
    observacion: ''
  };

  mensajeExito  = false;
  mensajeError  = '';
  ultimoPedidoNombre   = '';
  ultimoPedidoCantidad = 0;
  ultimoPedidoProducto = '';
  ultimoPedidoObs      = '';

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // GET /api/productos → solo los que tienen stock
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productosDisponibles = data.filter(p => p.stock > 0);

        // Pre-seleccionar si viene por URL (?productoId=X)
        this.route.queryParams.subscribe(params => {
          const pid = Number(params['productoId']);
          if (pid) this.pedido.productoId = pid;
        });
      }
    });
  }

  // Req. 6: Enviar pedido al endpoint POST /api/pedidos
  enviarPedido(form: any): void {
    if (form.invalid) return;

    const productoSeleccionado = this.productosDisponibles
      .find(p => p.id === Number(this.pedido.productoId));

    this.productoService.registrarPedido(this.pedido).subscribe({
      next: (res: any) => {
        const status = res?.status ?? 201;
        if (status === 201 || status === 200) {
          // Req. 7: Mostrar confirmación
          this.ultimoPedidoNombre   = this.pedido.nombreEstudiante;
          this.ultimoPedidoCantidad = this.pedido.cantidad;
          this.ultimoPedidoProducto = productoSeleccionado?.nombre ?? '';
          this.ultimoPedidoObs      = this.pedido.observacion;
          this.mensajeExito = true;
          this.mensajeError = '';
          form.resetForm();
          this.pedido = { nombreEstudiante: '', productoId: 0, cantidad: 1, observacion: '' };
        } else {
          this.mensajeError = 'Error al registrar el pedido. Intente nuevamente.';
          this.mensajeExito = false;
        }
      },
      error: (err) => {
        // ✅ Ahora captura el error real del servidor
        console.error('Error al registrar pedido:', err);
        const errorMessage = err?.error?.message || err?.error?.error || 'No se pudo conectar con el servidor.';
        this.mensajeError = errorMessage;
        this.mensajeExito = false;
      }
    });
  }
}
