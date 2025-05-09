package com.example.demo.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Produit;
import com.example.demo.service.ProduitService;

@RestController
@RequestMapping("/api")
@CrossOrigin

public class produitRestController {
    @Autowired
    ProduitService produitService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Produit geProduitById(@PathVariable("id") long id) {
        return produitService.getProduit(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Produit updateProduit(@RequestBody Produit produit) {
        return produitService.updateProduit(produit);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteProduit(@PathVariable("id") Long id) {
        produitService.deleteProduitById(id);
    }

    @RequestMapping(value = "/prodscat/{idCat}", method = RequestMethod.GET)
    public List<Produit> getProduitsByCatId(@PathVariable("idCat") Long idCat) {
        return produitService.findByCategorieIdCat(idCat);
    }

}
