package com.modus.stock.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sell_orders")
public class SellOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private String instrumentToken;
    private String transactionType; // Always "SELL"
    private String orderType;
    private double price;
    private int quantity;
    private String tag;
    private boolean amo;
    private String status;
    private String product;
    private String validity;
    private int disclosedQuantity;
    private double triggerPrice;
    private boolean slice;

    @Column(updatable = false)
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();
}
