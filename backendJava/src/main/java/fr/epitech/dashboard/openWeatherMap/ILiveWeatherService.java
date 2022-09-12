package fr.epitech.dashboard.openWeatherMap;

import net.aksingh.owmjapis.api.APIException;
import net.aksingh.owmjapis.model.CurrentWeather;

public interface ILiveWeatherService {
	
	public CurrentWeather getWeatherByCityName(String cityName) throws APIException;

}
