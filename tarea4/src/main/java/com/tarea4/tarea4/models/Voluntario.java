package com.tarea4.tarea4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity 
@Table(name = "voluntario")
public class Voluntario {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Column(length = 80)
    private String email;

    @Column(length = 15)
    private String telefono;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @ManyToOne 
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;

    public Voluntario() {
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Comuna getComuna() {
        return comuna;
    }
}
