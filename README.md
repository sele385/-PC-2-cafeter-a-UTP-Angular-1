# Sistema de Pedidos - Cafetería UTP

## Estructura del proyecto

```
cafeteria-utp-angular/    ← Frontend Angular 17
  src/app/
    pages/
      inicio/             ← Página de inicio
      productos/          ← Listado de productos (@for + CurrencyPipe)
      pedido/             ← Formulario de pedido (*ngFor + POST)
    services/
      producto.service.ts ← HTTP calls a la API
  src/environments/

Pc2/                      ← Backend Spring Boot
  src/main/java/.../
    controller/
      ProductoController  ← GET /api/productos, GET /api/productos/{id}
      PedidoController    ← POST /api/pedidos
    model/
      Producto.java
      Pedido.java
```

## Ejecutar el frontend Angular

```bash
cd cafeteria-utp-angular
npm install
ng serve
# Abre: http://localhost:4200
```

## Ejecutar el backend Spring Boot

```bash
cd Pc2
./mvnw spring-boot:run
# Corre en: http://localhost:8080
```

## Endpoints disponibles

| Método | Endpoint               | Descripción                  |
|--------|------------------------|------------------------------|
| GET    | /api/productos         | Lista todos los productos     |
| GET    | /api/productos/{id}    | Obtiene un producto por ID    |
| POST   | /api/pedidos           | Registra un nuevo pedido      |
