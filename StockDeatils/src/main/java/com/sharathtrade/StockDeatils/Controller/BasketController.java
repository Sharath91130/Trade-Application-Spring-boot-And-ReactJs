package com.sharathtrade.StockDeatils.Controller;

import com.sharathtrade.StockDeatils.Service.BasketOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    private BasketOrderService basketOrderService;

    @PostMapping("/execute")
    public ResponseEntity<String> executeBasket() {
        try {
            basketOrderService.placeBasket();
            return ResponseEntity.ok("✅ Basket Executed Successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("❌ Error: " + e.getMessage());
        }
    }
}
