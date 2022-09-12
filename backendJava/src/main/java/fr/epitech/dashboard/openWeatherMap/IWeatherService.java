package fr.epitech.dashboard.openWeatherMap;

import fr.epitech.dashboard.user.User;
import net.aksingh.owmjapis.api.APIException;
import net.aksingh.owmjapis.model.CurrentWeather;

public interface IWeatherService {
	
	public UserWeatherPref saveOrUpdateUser(UserWeatherPref userWeatherPref);
	
	public void deleteUserPref(User user);
	
	public CurrentWeather findUserPrefWeather(User user) throws APIException;

}
