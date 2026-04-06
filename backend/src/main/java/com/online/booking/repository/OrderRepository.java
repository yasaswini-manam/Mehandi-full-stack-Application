package com.online.booking.repository;

import com.online.booking.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Leave this empty! JpaRepository handles the save/find logic for you.
}