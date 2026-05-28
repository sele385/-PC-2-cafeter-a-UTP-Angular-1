package com.javaScrpit.Pc2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nombreEstudiante;

    @Column(nullable = false)
    private int cantidad;

    @Column(length = 255)
    private String observacion;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    public Pedido() {}

    public Long getId()                        { return id; }
    public String getNombreEstudiante()        { return nombreEstudiante; }
    public void setNombreEstudiante(String n)  { this.nombreEstudiante = n; }
    public int getCantidad()                   { return cantidad; }
    public void setCantidad(int c)             { this.cantidad = c; }
    public String getObservacion()             { return observacion; }
    public void setObservacion(String o)       { this.observacion = o; }
    public Producto getProducto()              { return producto; }
    public void setProducto(Producto p)        { this.producto = p; }
}
