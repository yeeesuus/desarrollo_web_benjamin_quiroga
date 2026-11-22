package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.services.NotaService;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController 
public class NotaController {
    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PatchMapping("/evaluar-avistamiento")
    public Map<String, Object> evaluarAvistamiento(
            @RequestParam("avistamientoId") Integer avistamientoId, 
            @RequestParam("nota") Integer nota) {
        notaService.agregarNota(avistamientoId, nota);

        Double promedio = notaService.calcularPromedio(avistamientoId);

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("promedio", promedio);

        return resultado;
    }
}
