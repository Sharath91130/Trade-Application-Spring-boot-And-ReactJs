package com.modus.stock.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderRequest {

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("product")
    private String product;

    @JsonProperty("validity")
    private String validity;

    @JsonProperty("price")
    private double price;

    @JsonProperty("tag")
    private String tag;

    @JsonProperty("instrument_token")
    private String instrumentToken;

    @JsonProperty("order_type")
    private String orderType;

    @JsonProperty("transaction_type")
    private String transactionType;

    @JsonProperty("disclosed_quantity")
    private int disclosedQuantity;

    @JsonProperty("trigger_price")
    private double triggerPrice;

    @JsonProperty("is_amo")
    private boolean isAmo;

    @JsonProperty("slice")
    private boolean slice;

}
