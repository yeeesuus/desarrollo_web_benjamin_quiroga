package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity 
@Table(name = "comuna")
public class Comuna {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @ManyToOne 
    @JoinColumn(name = "region_id")
    private Region region;

    public Comuna(){
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Region getRegion() {
        return region;
    }
}
