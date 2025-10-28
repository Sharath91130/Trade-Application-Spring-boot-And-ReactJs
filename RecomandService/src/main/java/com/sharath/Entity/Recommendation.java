package com.sharath.Entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "recommendations")
public class Recommendation {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;



  @ManyToOne
  @JoinColumn(name = "stock_id")
  private Stock stock;

  @Enumerated(EnumType.STRING)
  private Action action; // BUY, SELL, HOLD

  private Double targetPrice;
  private Double stopLoss;
  private String message;
  private Instant createdAt = Instant.now();

  public static enum Action { BUY, SELL, HOLD }
  // getters / setters
}
