package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity 
@Table(name = "nota")
public class Nota {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne 
    @JoinColumn(name = "avistamiento_id", nullable = false)
    private Avistamiento avistamiento;

    @Column(nullable = false)
    private Integer nota;

    public Nota(){
    }

    public Integer getId() {
        return id;
    }

    public Avistamiento getAvistamiento() {
        return avistamiento;
    }

    public Integer getNota() {
        return nota;
    }

    public void setAvistamiento(Avistamiento avistamiento) {
        this.avistamiento = avistamiento;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }
}
