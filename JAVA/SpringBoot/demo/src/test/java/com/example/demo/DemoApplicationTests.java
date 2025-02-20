package com.example.demo;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.entities.Produit;
import com.example.demo.repos.ProduitRepository;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private ProduitRepository produitRepository;

    @Test
    public void testCreateProduit() {
        Produit prod = new Produit("PC DELL", 2200.500, new Date());
        produitRepository.save(prod);
    }

    @Test
    public void testFindProduit() {

        Produit p = produitRepository.findById(2L).get();
        System.out.println(p);
    }

    @Test
    public void testUpdateProduit() {
        Produit p = produitRepository.findById(2L).get();
        p.setPrixProduit(111111.6);
        p.setNomProduit("Hp-ElliteBooks");
        produitRepository.save(p);
    }

    @Test
    public void testDeleteProduit() {

        produitRepository.deleteById(4L);
    }

    @Test
    public void testListerTousProduits() {
        List<Produit> prods = produitRepository.findAll();
        for (Produit p : prods) {
            System.out.println(p);
        }
    }
}
