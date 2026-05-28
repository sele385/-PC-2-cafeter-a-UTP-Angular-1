import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mt-5 text-center">
      <h1 class="display-4">🍕 Bienvenido a la Cafetería UTP</h1>
      <p class="lead text-muted">Consulta nuestros productos y realiza tu pedido fácilmente</p>
      <div class="mt-4">
        <a routerLink="/productos" class="btn btn-outline-danger btn-lg mx-2">Ver Productos</a>
        <a routerLink="/pedido"    class="btn btn-danger btn-lg mx-2">Registrar Pedido</a>
      </div>
    </div>
  `
})
export class InicioComponent {}
