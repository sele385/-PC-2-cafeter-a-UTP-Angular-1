import { Routes } from '@angular/router';
import { InicioComponent }    from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PedidoComponent }    from './pages/pedido/pedido.component';

export const routes: Routes = [
  { path: '',         component: InicioComponent },
  { path: 'inicio',   component: InicioComponent },
  { path: 'productos',component: ProductosComponent },
  { path: 'pedido',   component: PedidoComponent },
  { path: '**',       redirectTo: '' }
];
