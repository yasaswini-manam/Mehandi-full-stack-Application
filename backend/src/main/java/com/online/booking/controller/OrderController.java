package com.online.booking.controller;

import com.online.booking.entity.Order;
import com.online.booking.entity.Booking;
import com.online.booking.repository.OrderRepository;
import com.online.booking.repository.ServiceRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final ServiceRepository serviceRepository;

    public OrderController(OrderRepository orderRepository, ServiceRepository serviceRepository) {
        this.orderRepository = orderRepository;
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<Order> getAllOrders() {
    return orderRepository.findAll();
    }

    @PostMapping
    public Order saveOrder(@RequestBody Order order) {
        if (order.getBookings() != null) {
            for (Booking booking : order.getBookings()) {
                booking.setOrder(order);

                // Fetch the service by ID to update availability
                serviceRepository.findById(booking.getServiceId()).ifPresent(service -> {
                    int currentCount = service.getBookingCount() != null ? service.getBookingCount() : 0;
                    service.setBookingCount(currentCount + 1);
                    
                    // Toggle availability based on count
                    if (service.getBookingCount() >= 10) {
                        service.setAvailable(false);
                    } else {
                        service.setAvailable(true); 
                    }
                    serviceRepository.save(service);
                });
            }
        }
        return orderRepository.save(order);
    }

    @GetMapping("/user/{email}")
    public List<Order> getOrdersByUserEmail(@PathVariable String email) {
        return orderRepository.findByEmailOrderByIdDesc(email);
    }
}