package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Categorie;
import com.example.demo.entities.Produit;
import com.example.demo.dto.ProduitDTO;

public interface ProduitService {
    Produit saveProduit(Produit p);

    Produit updateProduit(Produit p);

    void deleteProduit(Produit p);

    void deleteProduitById(Long id);

    Produit getProduit(Long id);

    List<Produit> getAllProduits();

    List<Produit> findByNomProduit(String nom);

    List<Produit> findByNomProduitContains(String nom);

    List<Produit> findByNomPrix(String nom, Double prix);

    List<Produit> findByCategorie(Categorie categorie);

    List<Produit> findByCategorieIdCat(Long id);

    List<Produit> findByOrderByNomProduitAsc();

    List<Produit> trierProduitsNomsPrix();

    ProduitDTO convertEntityToDto(Produit produit);

    Produit convertDtoToEntity(ProduitDTO produitDto);

}
