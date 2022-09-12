package fr.epitech.dashboard.yahoofinance;

import java.util.Map;

import yahoofinance.Stock;

public interface IFinanceService {
	
	public Stock findStockBySymbolFor1Month(String symbol);
	
	public Stock findStockBySymbolFor1Year(String symbol);
	
	public Map<String,Stock> findBulkStocksBySymbol();

}
