package com.cwa.crud_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cwa.crud_springboot.Entities.user;


public interface userRepository extends JpaRepository<user, Long> {
    // Additional query methods can be defined here if needed

}
