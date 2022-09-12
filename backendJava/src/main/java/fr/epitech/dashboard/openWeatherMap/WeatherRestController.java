package fr.epitech.dashboard.openWeatherMap;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.epitech.dashboard.user.IUserService;
import net.aksingh.owmjapis.api.APIException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/owm")
public class WeatherRestController {
	
	@Autowired
	IWeatherService weatherService;
	
	@Autowired
	IUserService userService;
	
	@Autowired
	ILiveWeatherService liveWeatherService;
	
	@RolesAllowed({"USER","ADMIN"})
	@PostMapping("/findandadd")
	public ResponseEntity<WeatherResponse> findAndAddCity(@RequestParam("user_id") Integer id, 
			@RequestParam("city_name") String cityName) {
		
			UserWeatherPref userWeatherPref = new UserWeatherPref(userService.findUserById(id), cityName);
			weatherService.saveOrUpdateUser(userWeatherPref);
			WeatherResponse weatherResponse = null;
			try {
				weatherResponse = new WeatherResponse(
						liveWeatherService.getWeatherByCityName(cityName));
				
			} catch (APIException e) {
				e.printStackTrace();
			}
		return new ResponseEntity<WeatherResponse>(weatherResponse, HttpStatus.OK);
	}
	
	@GetMapping("/default")
	public ResponseEntity<WeatherResponse> findDefaultCities() {
		WeatherResponse weatherResponse = null;
		try {
			weatherResponse = new WeatherResponse(
					liveWeatherService.getWeatherByCityName("Paris"));	
		} catch (APIException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<WeatherResponse>(weatherResponse,HttpStatus.OK);
	}
	
	@RolesAllowed({"USER","ADMIN"})
	@GetMapping("/pref/{id}")
	public ResponseEntity<WeatherResponse> findUserPrefWeather(@PathVariable(value = "id") Integer id) {
		WeatherResponse userPref = null;
		try {
			if (weatherService.findUserPrefWeather(userService.findUserById(id)) == null) {
				return new ResponseEntity<WeatherResponse>(HttpStatus.NOT_FOUND);
			}
			userPref = new WeatherResponse(
					weatherService.findUserPrefWeather(userService.findUserById(id))
					);
		} catch (APIException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<WeatherResponse>(userPref,HttpStatus.OK);
	}
	
	@RolesAllowed({"USER","ADMIN"})
	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteUserPref(@RequestParam("user_id") Integer id) {
		weatherService.deleteUserPref(userService.findUserById(id));
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
