package com.sharath.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "investor_portfolio", uniqueConstraints = @UniqueConstraint(columnNames = {"investor_id","stock_id"}))
public class InvestorPortfolio {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne @JoinColumn(name = "investor_id")
  private Long investor;

  @ManyToOne @JoinColumn(name = "stock_id")
  private Stock stock;

  private Double buyPrice;
  private Integer quantity;

  // boolean - if investor granted permission for trader control
  private Boolean permissionGranted = false;

  @ManyToOne @JoinColumn(name = "granted_to_trader_id")
  private Long grantedTo; // which trader has control if granted

  private String status; // OPEN/CLOSED

  // getters / setters
}
