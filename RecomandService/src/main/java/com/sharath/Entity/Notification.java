package com.sharath.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
@Table(name = "notifications")
public class Notification {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne @JoinColumn(name = "investor_id")
  private Long investor;

  @ManyToOne @JoinColumn(name = "recommendation_id")
  private Recommendation recommendation;

  private boolean isRead = false;
  private Instant createdAt = Instant.now();
  // getters / setters
}
