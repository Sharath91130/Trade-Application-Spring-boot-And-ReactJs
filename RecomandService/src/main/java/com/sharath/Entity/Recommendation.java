package com.sharath.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
@Data
@Entity
@Table(name = "recommendations")
public class Recommendation {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;



  private Long traderId;


//  @ManyToOne
//  @JoinColumn(name = "stock_id")
//  private Stock stock;

  @Enumerated(EnumType.STRING)
  private Action action; // BUY, SELL, HOLD
    private String  StockSymbol;
  private Double targetPrice;
  private Double stopLoss;
  private String message;
  private Instant createdAt = Instant.now();



    // getters / setters
}
