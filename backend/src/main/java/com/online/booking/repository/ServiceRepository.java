package com.online.booking.repository;

import com.online.booking.entity.Service; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    // This allows you to find and update rows in the 'services' table
}