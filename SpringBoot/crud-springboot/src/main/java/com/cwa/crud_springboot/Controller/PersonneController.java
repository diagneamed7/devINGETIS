package com.cwa.crud_springboot.Controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwa.crud_springboot.Entities.Personne;

import java.util.List;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cwa.crud_springboot.repository.PersonneRepository;

@RestController
@RequestMapping("/api/personnes")
public class PersonneController {

    final PersonneRepository personneRepository;

    public PersonneController(PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

    @GetMapping
    public ResponseEntity<List<Personne>> getAllPersonnes() {
        return new ResponseEntity<>(personneRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Personne> createPersonne(@RequestBody Personne personne) {
        Personne savedPersonne = personneRepository.save(personne);
        return new ResponseEntity<>(savedPersonne, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personne> getPersonneById(@PathVariable Long id) {
        Optional<Personne> optionalPersonne = personneRepository.findById(id);
        if (optionalPersonne.isPresent()) {
            return new ResponseEntity<>(optionalPersonne.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personne> updatepersonne(@PathVariable long id, @RequestBody Personne personneDetails) {
        Optional<Personne> optionalPersonne = personneRepository.findById(id);
        if (optionalPersonne.isPresent()) {
            Personne existingPersonne = optionalPersonne.get();
            existingPersonne.setVille(personneDetails.getVille());
            existingPersonne.setNumeroTelephone(personneDetails.getNumeroTelephone());
            return new ResponseEntity<>(personneRepository.save(existingPersonne), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonne(@PathVariable long id) {
        Optional<Personne> optionalPersonne = personneRepository.findById(id);
        if (optionalPersonne.isPresent()) {
            personneRepository.deleteById((id));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
