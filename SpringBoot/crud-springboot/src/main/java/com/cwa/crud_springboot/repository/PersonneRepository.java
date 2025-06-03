package com.cwa.crud_springboot.repository;
import com.cwa.crud_springboot.Entities.Personne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonneRepository extends JpaRepository<Personne, Long> {
    
}
