import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export interface PedidoRequest {
  nombreEstudiante: string;
  productoId: number;
  cantidad: number;
  observacion: string;
}

// Datos mock por si el backend no está disponible
const MOCK_PRODUCTOS: Producto[] = [
  { id: 1, nombre: 'Hamburguesa Clásica', categoria: 'Comida',  precio: 8.50,  stock: 10 },
  { id: 2, nombre: 'Jugo de Naranja',     categoria: 'Bebida',  precio: 3.50,  stock: 0  },
  { id: 3, nombre: 'Empanada de Carne',   categoria: 'Snack',   precio: 2.00,  stock: 15 },
  { id: 4, nombre: 'Café Americano',      categoria: 'Bebida',  precio: 4.00,  stock: 20 },
  { id: 5, nombre: 'Pizza Personal',      categoria: 'Comida',  precio: 12.00, stock: 0  },
  { id: 6, nombre: 'Ensalada César',      categoria: 'Comida',  precio: 6.50,  stock: 8  }
];

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(`${this.apiUrl}/api/productos`)
      .pipe(catchError(() => of(MOCK_PRODUCTOS)));
  }

  getProducto(id: number): Observable<Producto> {
    return this.http
      .get<Producto>(`${this.apiUrl}/api/productos/${id}`)
      .pipe(catchError(() => of(MOCK_PRODUCTOS.find(p => p.id === id)!)));
  }

  registrarPedido(pedido: PedidoRequest): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/pedidos`, pedido, { observe: 'response' });
  }
}
