package com.javaScrpit.Pc2.controller;

import com.javaScrpit.Pc2.model.Producto;
import com.javaScrpit.Pc2.repository.ProductoRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // GET /api/productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll(Sort.by("id"));
    }

    // GET /api/productos/{id}
    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }
}
