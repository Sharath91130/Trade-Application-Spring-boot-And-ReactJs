package com.modus.stock.controller;

import com.modus.stock.model.OrderRequest;
import com.modus.stock.model.OrderResponse;
import com.modus.stock.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;

@RestController
@RequestMapping("/api/upstox")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place-order")
    public OrderResponse placeOrder(@RequestBody OrderRequest request) {

        return orderService.placeOrder(request);
    }

    @PostMapping("/sell")
    public OrderResponse sellOrder(@RequestBody OrderRequest request) {
        return orderService.sellOrder(request);
    }
}

