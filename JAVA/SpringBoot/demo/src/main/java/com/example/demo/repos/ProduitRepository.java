package com.example.demo.repos;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Long>  {

    default void deleteProduitById(Long id)
     {
        deleteById(id);
    }

}
