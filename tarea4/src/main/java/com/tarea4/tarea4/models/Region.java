package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity 
@Table(name = "region")
public class Region {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;

    @Column(nullable = false, length = 200)
    private String nombre;

    public Region() {
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }
}
