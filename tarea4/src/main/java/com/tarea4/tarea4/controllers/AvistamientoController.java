package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.models.Avistamiento;
import com.tarea4.tarea4.services.AvistamientoService;
import com.tarea4.tarea4.services.NotaService;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController 
public class AvistamientoController {
    private final AvistamientoService avistamientoService;
    private final NotaService notaService;

    public AvistamientoController(AvistamientoService avistamientoService, NotaService notaService) {
        this.avistamientoService = avistamientoService;
        this.notaService = notaService;
    }

    @GetMapping("/buscar-avistamientos")
    public List<Map<String, Object>> buscarAvistamientos(
        @RequestParam("texto") String texto) {
            List<Avistamiento> avistamientos = avistamientoService.buscarAvistamientos(texto);

            return avistamientos.stream().map(avistamiento -> {
                Map<String, Object> resultado = new HashMap<>();

                resultado.put("id", avistamiento.getId());
                resultado.put("ave", avistamiento.getAve().getNombre());
                resultado.put("voluntario", avistamiento.getVoluntario().getNombre());
                resultado.put("comuna", avistamiento.getVoluntario().getComuna().getNombre());
                resultado.put("fecha", avistamiento.getFechaHora().toLocalDate().toString());
                
                Double promedio = notaService.calcularPromedio(avistamiento.getId());
                resultado.put("promedio", promedio == null ? "-" : promedio);

                return resultado;
            }).toList();
        }
}
