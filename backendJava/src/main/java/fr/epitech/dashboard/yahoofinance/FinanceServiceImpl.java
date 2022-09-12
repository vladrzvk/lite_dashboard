package fr.epitech.dashboard.yahoofinance;

import java.util.Calendar;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.Interval;

@Service("financeService")
@Transactional
public class FinanceServiceImpl implements IFinanceService {
	
	private final String[] symbols = new String[] {
			"GOOG","AAPL","FB","AMZN","MSFT",
			"ORCL","IBM","TSLA","DOW","NDAQ",
			"BTC-USD","ETH-USD","UBI.PA","ATVI",
			"^FCHI","^SBF120","CA.PA","MC.PA","EN.PA",
			"ORA.PA"
	}; 

	@Override
	public Stock findStockBySymbolFor1Month(String symbol) {
		try {
			Calendar from = Calendar.getInstance();
			from.add(Calendar.MONTH, -1);
			Stock stock = YahooFinance.get(symbol,from,Interval.DAILY);
			return stock;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public Stock findStockBySymbolFor1Year(String symbol) {
		try {
			Calendar from = Calendar.getInstance();
			from.add(Calendar.YEAR, -1);
			Stock stock = YahooFinance.get(symbol,from,Interval.WEEKLY);
			return stock;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Map<String, Stock> findBulkStocksBySymbol() {
		try {
			return YahooFinance.get(symbols,false);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
