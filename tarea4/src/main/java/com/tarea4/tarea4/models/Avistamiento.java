package com.tarea4.tarea4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity 
@Table(name = "avistamiento")
public class Avistamiento {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne 
    @JoinColumn(name = "voluntario_id", nullable = false)
    private Voluntario voluntario;

    @ManyToOne 
    @JoinColumn(name = "ave_id", nullable = false)
    private Ave ave;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    @Column(length = 200)
    private String lugar;

    @Column(length = 500)
    private String descripcion;

    public Avistamiento() {
    }

    public Integer getId() {
        return id;
    }

    public Voluntario getVoluntario() {
        return voluntario;
    }

    public Ave getAve() {
        return ave;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }
}
