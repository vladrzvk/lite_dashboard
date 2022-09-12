package fr.epitech.dashboard.yahoofinance;

import java.io.IOException;
import java.util.List;

import yahoofinance.Stock;
import yahoofinance.histquotes.HistoricalQuote;

public class FinanceResponseWithHistory extends FinanceResponse {

	private static final long serialVersionUID = -8262658656661761240L;
	
	private List<HistoricalQuote> lastMonthHistory;
	private List<HistoricalQuote> lastYearHistory;
	
	public FinanceResponseWithHistory(Stock monthStock, Stock yearStock) throws IOException {
		super(yearStock);
		lastMonthHistory = monthStock.getHistory();
		lastYearHistory = yearStock.getHistory();
		
	}
	
	public List<HistoricalQuote> getLastMonthHistory() {
		return lastMonthHistory;
	}
	
	public List<HistoricalQuote> getLastYearHistory() {
		return lastYearHistory;
	}

}
