package com.javaScrpit.Pc2.config;

import com.javaScrpit.Pc2.model.Producto;
import com.javaScrpit.Pc2.repository.ProductoRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductoRepository productoRepository;

    public DataInitializer(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) {
        if (productoRepository.count() > 0) return;

        List<Producto> productos = List.of(
            new Producto("Hamburguesa Clásica", "Comida",  8.50, 10),
            new Producto("Jugo de Naranja",     "Bebida",  3.50,  0),
            new Producto("Empanada de Carne",   "Snack",   2.00, 15),
            new Producto("Café Americano",      "Bebida",  4.00, 20),
            new Producto("Pizza Personal",      "Comida", 12.00,  0)
        );

        productoRepository.saveAll(productos);
    }
}
