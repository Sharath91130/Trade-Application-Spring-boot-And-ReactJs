package com.sharathtrade.StockDeatils.Controller;


import com.sharathtrade.StockDeatils.Entity.Stock;
import com.sharathtrade.StockDeatils.Repo.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    // ✅ Save multiple stocks (from JSON)
    @PostMapping("/bulk")
    public List<Stock> saveAllStocks(@RequestBody List<Stock> stocks) {
        return stockRepository.saveAll(stocks);
    }

    // ✅ Get all stocks
    @GetMapping
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    // ✅ Get stock by symbol
    @GetMapping("/{symbol}")
    public Stock getStockBySymbol(@PathVariable String symbol) {
        return stockRepository.findByTradingSymbol(symbol.toUpperCase());
    }

    // ✅ Add single stock
    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return stockRepository.save(stock);
    }

    // ✅ Delete stock
    @DeleteMapping("/{id}")
    public String deleteStock(@PathVariable Long id) {
        stockRepository.deleteById(id);
        return "Stock with ID " + id + " deleted successfully.";
    }
}
