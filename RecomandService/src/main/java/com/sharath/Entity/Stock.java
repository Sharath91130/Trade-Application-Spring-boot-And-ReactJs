package com.sharath.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stocks")
public class Stock {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String symbol;

  private String companyName;
  // getters / setters
}
