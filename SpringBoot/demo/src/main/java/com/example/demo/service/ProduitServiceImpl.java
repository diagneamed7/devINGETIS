package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Categorie;
import com.example.demo.entities.Produit;
import com.example.demo.repos.ProduitRepository;
import com.example.demo.dto.ProduitDTO;

@Service
public class ProduitServiceImpl implements ProduitService {
    @Autowired
    public ProduitRepository produitRepository;

    @Override
    public Produit saveProduit(Produit p) {
        return produitRepository.save(p);
    }

    @Override
    public Produit updateProduit(Produit p) {
        return produitRepository.save(p);
    }

    @Override
    public void deleteProduit(Produit p) {
        produitRepository.delete(p);
    }

    @Override
    public void deleteProduitById(Long id) {
        produitRepository.deleteById(id);
    }

    @Override
    public Produit getProduit(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    @Override
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Override
    public List<Produit> findByNomProduit(String nom) {
        return produitRepository.findByNomProduit(nom);
    }

    @Override
    public List<Produit> findByNomProduitContains(String nom) {
        return produitRepository.findByNomProduitContains(nom);
    }

    @Override
    public List<Produit> findByNomPrix(String nom, Double prix) {
        return produitRepository.findByNomProduitAndPrixProduit(nom, prix);
    }

    @Override
    public List<Produit> findByCategorie(Categorie categorie) {
        return produitRepository.findByCategorie(categorie);
    }

    @Override
    public List<Produit> findByCategorieIdCat(Long id) {
        return produitRepository.findByCategorieIdCat(id);
    }

    @Override
    public List<Produit> findByOrderByNomProduitAsc() {
        return produitRepository.findByOrderByNomProduitAsc();
    }

    @Override
    public List<Produit> trierProduitsNomsPrix() {
        return produitRepository.trierProduitsNomsPrix();
    }

    @Override
    public ProduitDTO convertEntityToDto(Produit produit) {
        if (produit == null) {
            return null;
        }
        return ProduitDTO.builder()
                .idProduit(produit.getIdProduit())
                .nomProduit(produit.getNomProduit())
                .prixProduit(produit.getPrixProduit())
                .dateCreation(produit.getDateCreation())
                .categorie(produit.getCategorie())
                .build();
    }

    @Override
    public Produit convertDtoToEntity(ProduitDTO produitDto) {
        if (produitDto == null) {
            return null;
        }
        Produit produit = new Produit();
        produit.setIdProduit(produitDto.getIdProduit());
        produit.setNomProduit(produitDto.getNomProduit());
        produit.setPrixProduit(produitDto.getPrixProduit());
        produit.setDateCreation(produitDto.getDateCreation());
        produit.setCategorie(produitDto.getCategorie());
        return produit;
    }
}
