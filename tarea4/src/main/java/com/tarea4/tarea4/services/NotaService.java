package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.Avistamiento;
import com.tarea4.tarea4.models.Nota;
import com.tarea4.tarea4.repositories.AvistamientoRepository;
import com.tarea4.tarea4.repositories.NotaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service 
public class NotaService {
    private final NotaRepository notaRepository;
    private final AvistamientoRepository avistamientoRepository;

    public NotaService(NotaRepository notaRepository, AvistamientoRepository avistamientoRepository) {
        this.notaRepository = notaRepository;
        this.avistamientoRepository = avistamientoRepository;
    }

    public void agregarNota(Integer avistamientoId, Integer valor) {
        if (valor == null || valor < 1 || valor > 7) {
            throw new IllegalArgumentException("La nota debe estar entre 1 y 7");
        }

        Avistamiento avistamiento = avistamientoRepository
                .findById(avistamientoId)
                .orElseThrow(() -> new IllegalArgumentException("Avistamiento no encontrado"));
        
        Nota nota = new Nota();
        nota.setAvistamiento(avistamiento);
        nota.setNota(valor);

        notaRepository.save(nota);
    }

    public Double calcularPromedio(Integer avistamientoId) {
        List<Nota> notas = notaRepository.findAll().stream()
                .filter(n -> n.getAvistamiento().getId().equals(avistamientoId))
                .toList();
        
        if (notas.isEmpty()) {
            return null;
        }

        return notas.stream()
                .mapToInt(n -> n.getNota())
                .average()
                .orElse(0.0);
    }       
}
