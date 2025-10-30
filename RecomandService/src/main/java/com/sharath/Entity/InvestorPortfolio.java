package com.sharath.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "investor_portfolio", uniqueConstraints = @UniqueConstraint(columnNames = {"investor_id","stock_id"}))
public class InvestorPortfolio {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  private Long investor;




  private Double buyPrice;
  private Integer quantity;

  // boolean - if investor granted permission for trader control
  private Boolean permissionGranted = false;


  private Long grantedTo; // which trader has control if granted

  private String status; // OPEN/CLOSED

  // getters / setters
}
