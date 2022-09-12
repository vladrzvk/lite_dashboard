package fr.epitech.dashboard.yahoofinance;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import yahoofinance.Stock;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/yfinance")
public class FinanceRestController {
	
	@Autowired
	IFinanceService financeService;
	

	@RolesAllowed({"USER","ADMIN"})
	@GetMapping("/details/{stock}")
	public ResponseEntity<FinanceResponseWithHistory> findStock(@PathVariable(value = "stock") String stock) {
		
		FinanceResponseWithHistory response = null;
		Stock monthStock = financeService.findStockBySymbolFor1Month(stock);
		Stock yearStock = financeService.findStockBySymbolFor1Year(stock);
		
		try {
			response = new FinanceResponseWithHistory(monthStock,yearStock);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<FinanceResponseWithHistory>(response,HttpStatus.OK);
	}
	
	@RolesAllowed({"USER","ADMIN"})
	@GetMapping("/all")
	public ResponseEntity<Map<String,FinanceResponse>> findAllStocks() {
		Map<String,FinanceResponse> mapResponse = new HashMap<>();
		for (Map.Entry<String, Stock> entry : financeService.findBulkStocksBySymbol().entrySet()) {
			mapResponse.put(
					entry.getKey(),
					new FinanceResponse(entry.getValue())
					);
		}
		
		return new ResponseEntity<Map<String,FinanceResponse>>(mapResponse, HttpStatus.OK);
	}
	
}
