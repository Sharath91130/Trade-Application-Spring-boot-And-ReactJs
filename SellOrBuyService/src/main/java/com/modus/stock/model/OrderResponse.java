package com.modus.stock.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class OrderResponse {
    private String status;
    private DataField data;
    private Metadata metadata;

    @Data
    public static class DataField {
        @JsonProperty("order_ids")
        private List<String> orderIds;

    }

    @Data
    public static class Metadata {
        private int latency;

    }

}
