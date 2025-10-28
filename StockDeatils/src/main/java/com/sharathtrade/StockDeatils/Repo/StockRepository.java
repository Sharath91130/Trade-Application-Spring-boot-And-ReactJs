package com.sharathtrade.StockDeatils.Repo;


import com.sharathtrade.StockDeatils.Entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    Stock findByTradingSymbol(String tradingSymbol);
}
