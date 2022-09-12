package fr.epitech.dashboard.openWeatherMap;

import org.springframework.stereotype.Service;

import net.aksingh.owmjapis.api.APIException;
import net.aksingh.owmjapis.core.OWM;
import net.aksingh.owmjapis.model.CurrentWeather;

@Service("liveWeatherService")
public class LiveWeatherServiceImpl implements ILiveWeatherService {
	
    private String apiKey = "4d388364a7bb75b92d4c65ee1c454f67";

	private OWM owm = new OWM(apiKey);
	
	public CurrentWeather getWeatherByCityName(String cityName) throws APIException {
		owm.setUnit(OWM.Unit.METRIC);
		return owm.currentWeatherByCityName(cityName);
	}
	
}
