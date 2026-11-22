package com.tarea4.tarea4.repositories;

import com.tarea4.tarea4.models.Avistamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository 
public interface AvistamientoRepository extends JpaRepository<Avistamiento, Integer> {
    @Query("""
        SELECT a FROM Avistamiento a
        JOIN FETCH a.ave
        JOIN FETCH a.voluntario v
        JOIN FETCH v.comuna c
        WHERE LOWER(a.ave.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))
        OR LOWER(v.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))
        OR LOWER(c.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))
    """)
    List<Avistamiento> buscarPorTexto(@Param("texto") String texto);
}
