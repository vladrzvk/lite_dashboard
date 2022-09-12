package fr.epitech.dashboard.openWeatherMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.epitech.dashboard.user.User;
import net.aksingh.owmjapis.api.APIException;
import net.aksingh.owmjapis.model.CurrentWeather;

@Service("weatherService")
@Transactional
public class WeatherServiceImpl implements IWeatherService {
	
	@Autowired
	IUserWeatherPrefDao userWeatherPrefDao;
	
	@Autowired
	ILiveWeatherService liveWeatherService;

	@Override
	public UserWeatherPref saveOrUpdateUser(UserWeatherPref userWeatherPref) {
		if (userWeatherPrefDao.findByUserId(userWeatherPref.getUser().getId()) != null) {
			userWeatherPrefDao.deleteByUserId(userWeatherPref.getUser().getId());
		}
		return userWeatherPrefDao.save(userWeatherPref);
	}

	@Override
	public void deleteUserPref(User user) {
		userWeatherPrefDao.deleteByUserId(user.getId());
	}

	@Override
	public CurrentWeather findUserPrefWeather(User user) throws APIException {
		String cityName = userWeatherPrefDao.findByUserId(user.getId());
		if (cityName == null) return null;
		return liveWeatherService.getWeatherByCityName(cityName);
	}

}
