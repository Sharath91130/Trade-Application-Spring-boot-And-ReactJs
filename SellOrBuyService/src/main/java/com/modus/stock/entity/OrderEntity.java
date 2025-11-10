package com.modus.stock.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Entity
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private int quantity;
    private String product;
    private String validity;
    private double price;
    private String tag;
    private String instrumentToken;
    private String orderType;
    private String transactionType;
    private int disclosedQuantity;
    private double triggerPrice;
    private boolean isAmo;
    private boolean slice;
    private String status;

}
