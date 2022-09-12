package fr.epitech.dashboard;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.google.common.net.HttpHeaders;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest
@AutoConfigureMockMvc
public class HttpRequestTest {

	@Autowired
	private MockMvc mockMvc;
	
	/**
	 * Check if the server is accessible
	 * @throws Exception
	 */
	@Test
	public void defaultControllerReturnOk() throws Exception {
		this.mockMvc.perform(
				get("/")).andDo(print())
		.andExpect(status().isOk())
		.andExpect(content().string(containsString("Server answer: OK")));
	}
	
	/**
	 * Check if the security is working
	 * @throws Exception
	 */
	@Test
	public void userControllerBlockUnauthorized() throws Exception {
		this.mockMvc.perform(
				get("/user/users").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().is(401));
	}
	
	/**
	 * Check if the login is working
	 * @throws Exception
	 */
	@Test
	public void userControllerLogin() throws Exception {
		
		String testUser = "{"
						+ "\"username\":\"user\","
						+ "\"password\":\"user\""
						+ "}";
		
		this.mockMvc.perform(
				post("/auth/login").content(testUser)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
		.andDo(print())
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.user.id", is(100001)))
		.andExpect(jsonPath("$.token", is(notNullValue())));
				
	}
	
	/**
	 * Check if the service owm is working
	 * @throws Exception
	 */
	@Test
	public void owmControllerReturnWeatherInfo() throws Exception {
		this.mockMvc.perform(
				get("/owm/default").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$.cityName", is("Paris")));
	}
	
	/**
	 * Check if the service yahoofinance is working
	 * @throws Exception
	 */
	@Test
	public void yfinanceControllerReturnStocks() throws Exception {
		this.mockMvc.perform(
				get("/yfinance/all").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$.GOOG.symbol", is("GOOG")))
		.andExpect(jsonPath("$.GOOG.name", is("Alphabet Inc.")));
	}
	
}
