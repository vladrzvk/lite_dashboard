package fr.epitech.dashboard.yahoofinance;

import java.io.Serializable;
import java.math.BigDecimal;

import yahoofinance.Stock;

public class FinanceResponse implements Serializable {

	private static final long serialVersionUID = 5464324703609174179L;
	
	private String symbol;
	private String name;
	private BigDecimal currentPrice;
	private BigDecimal changePrice;

	
	
	public FinanceResponse(Stock stock) {
		this.symbol = stock.getSymbol();
		this.name = stock.getName();
		this.currentPrice = stock.getQuote().getPrice();
		this.changePrice = stock.getQuote().getChange();
	}
	
	public String getSymbol() {
		return symbol;
	}
	
	public String getName() {
		return name;
	}
	
	public BigDecimal getCurrentPrice() {
		return currentPrice;
	}
	
	public BigDecimal getChangePrice() {
		return changePrice;
	}
	

}
