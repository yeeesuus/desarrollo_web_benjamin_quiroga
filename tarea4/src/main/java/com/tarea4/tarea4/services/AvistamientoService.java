package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.Avistamiento;
import com.tarea4.tarea4.repositories.AvistamientoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service 
public class AvistamientoService {
    private final AvistamientoRepository avistamientoRepository;

    public AvistamientoService(AvistamientoRepository avistamientoRepository) {
        this.avistamientoRepository = avistamientoRepository;
    }

    public List<Avistamiento> buscarAvistamientos(String texto) {
        return avistamientoRepository.buscarPorTexto(texto);
    }
}
