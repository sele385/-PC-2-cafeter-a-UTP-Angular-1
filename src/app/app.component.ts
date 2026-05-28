import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">☕ Cafetería UTP</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/inicio" routerLinkActive="active">Inicio</a>
          <a class="nav-link" routerLink="/productos" routerLinkActive="active">Productos</a>
          <a class="nav-link" routerLink="/pedido" routerLinkActive="active">Registrar Pedido</a>
        </div>
      </div>
    </nav>
    <router-outlet />
  `
})
export class AppComponent {
  title = 'cafeteria-utp';
}
