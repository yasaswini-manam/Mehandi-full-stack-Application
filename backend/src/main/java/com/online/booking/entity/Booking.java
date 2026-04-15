package com.online.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_id")
    @JsonProperty("service_id")
    private Long serviceId;

    @Column(name = "booking_date")
    @JsonProperty("booking_date")
    private LocalDate bookingDate;


    @Column(name = "time_slot")
    @JsonProperty("time_slot")
    private String timeSlot;

    @Column(name = "customer_name")
    @JsonProperty("customer_name")
    private String customerName;

    private String email;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id") 
    @JsonIgnore // Prevents infinite loops when converting to JSON
    private Order order;
}