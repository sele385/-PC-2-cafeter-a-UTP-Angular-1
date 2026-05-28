package com.javaScrpit.Pc2.controller;

import com.javaScrpit.Pc2.dto.PedidoRequest;
import com.javaScrpit.Pc2.model.Pedido;
import com.javaScrpit.Pc2.model.Producto;
import com.javaScrpit.Pc2.repository.PedidoRepository;
import com.javaScrpit.Pc2.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final ProductoRepository productoRepository;
    private final PedidoRepository   pedidoRepository;

    public PedidoController(ProductoRepository productoRepository, PedidoRepository pedidoRepository) {
        this.productoRepository = productoRepository;
        this.pedidoRepository   = pedidoRepository;
    }

    // POST /api/pedidos
    @PostMapping
    @Transactional
    public ResponseEntity<Void> crearPedido(@RequestBody PedidoRequest request) {
        if (request == null || request.productoId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "productoId requerido");
        }

        Producto producto = productoRepository.findWithLockById(request.productoId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        if (producto.getStock() < request.cantidad()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Stock insuficiente");
        }

        producto.setStock(producto.getStock() - request.cantidad());

        Pedido pedido = new Pedido();
        pedido.setNombreEstudiante(request.nombreEstudiante());
        pedido.setCantidad(request.cantidad());
        pedido.setObservacion(request.observacion());
        pedido.setProducto(producto);

        pedidoRepository.save(pedido);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
