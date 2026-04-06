package com.online.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services") // Matches your SQL table name exactly
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int price;
    private int duration;

    @Column(columnDefinition = "TEXT") // Better match for 'description TEXT' in SQL
    private String description;

@Column(name = "booking_count")
private int bookingCount;

@Column(name = "is_available")
private boolean isAvailable; 

// Add Getters and Setters (or use Lombok @Data)
}

