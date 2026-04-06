package com.online.booking.service;

import com.online.booking.entity.*;
import com.online.booking.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired; // Add this
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repository;
    
    @Autowired
    private ServiceRepository serviceRepository; // Inject this to update counts

    public BookingService(BookingRepository repository) {
        this.repository = repository;
    }

    public Booking saveBooking(Booking booking) {
        return repository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return repository.findAll();
    }

}