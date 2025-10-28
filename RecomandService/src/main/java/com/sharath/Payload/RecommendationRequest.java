package com.sharath.Payload;

import lombok.Data;

@Data
public class RecommendationRequest {
  private Long traderId;
  private String stockSymbol;
  private String companyName;
  private String action; // BUY / SELL / HOLD
  private Double targetPrice;
  private Double stopLoss;
  private String message;
  // getters/setters
}
