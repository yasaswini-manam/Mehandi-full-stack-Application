package com.online.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shipping_address")
    @JsonProperty("shipping_address")
    private String shippingAddress;

    private int totalAmount;

    // --- NEW RELATIONSHIP ADDED BELOW ---
    // cascade = CascadeType.ALL means when you save an Order, it saves the Bookings too.
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();

    // Helper method to sync both sides of the relationship
    public void addBooking(Booking booking) {
        bookings.add(booking);
        booking.setOrder(this);
    }
}
