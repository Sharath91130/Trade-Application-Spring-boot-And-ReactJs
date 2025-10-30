package com.sharath.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long traderId;
    private Long investorId;
    private String message;
    private boolean read = false;

    private LocalDateTime createdAt = LocalDateTime.now();


    // Getters, setters
}
