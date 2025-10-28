package com.sharathtrade.StockDeatils.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stock_info")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trading_symbol", nullable = false, unique = true)
    private String tradingSymbol;

    @Column(name = "instrument_key", nullable = false)
    private String instrumentKey;

    @Column(name = "isin", nullable = false, unique = true)
    private String isin;

    @Column(name = "website")
    private String website;

    public Stock() {
    }

    public Stock(String tradingSymbol, String instrumentKey, String isin, String website) {
        this.tradingSymbol = tradingSymbol;
        this.instrumentKey = instrumentKey;
        this.isin = isin;
        this.website = website;
    }

    public Long getId() {
        return id;
    }

    public String getTradingSymbol() {
        return tradingSymbol;
    }

    public void setTradingSymbol(String tradingSymbol) {
        this.tradingSymbol = tradingSymbol;
    }

    public String getInstrumentKey() {
        return instrumentKey;
    }

    public void setInstrumentKey(String instrumentKey) {
        this.instrumentKey = instrumentKey;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
