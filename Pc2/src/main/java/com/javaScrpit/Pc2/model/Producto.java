package com.javaScrpit.Pc2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nombre;

    @Column(nullable = false, length = 60)
    private String categoria;

    @Column(nullable = false)
    private double precio;

    @Column(nullable = false)
    private int stock;

    public Producto() {}

    public Producto(String nombre, String categoria, double precio, int stock) {
        this.nombre    = nombre;
        this.categoria = categoria;
        this.precio    = precio;
        this.stock     = stock;
    }

    public Long getId()               { return id; }
    public String getNombre()         { return nombre; }
    public void setNombre(String n)   { this.nombre = n; }
    public String getCategoria()      { return categoria; }
    public void setCategoria(String c){ this.categoria = c; }
    public double getPrecio()         { return precio; }
    public void setPrecio(double p)   { this.precio = p; }
    public int getStock()             { return stock; }
    public void setStock(int s)       { this.stock = s; }
}
