package fr.epitech.dashboard.openWeatherMap;

import java.io.Serializable;

import net.aksingh.owmjapis.model.CurrentWeather;

public class WeatherResponse implements Serializable {
	
	private static final long serialVersionUID = 4257332254992406946L;

	private String cityName;
	private String idIcon;
	private double temp;
	private double tempMin;
	private double tempMax;
	private double windSpeed;
	private double pressure;
	private double humidity;
	
	public WeatherResponse(CurrentWeather currentWeather) {
		
		this.cityName = currentWeather.getCityName();
		this.idIcon = currentWeather.getWeatherList().get(0).getIconCode();
		this.temp = currentWeather.getMainData().getTemp();
		this.tempMin = currentWeather.getMainData().getTempMin();
		this.tempMax = currentWeather.getMainData().getTempMax();
		this.windSpeed = currentWeather.getWindData().getSpeed();
		this.pressure = currentWeather.getMainData().getPressure();
		this.humidity = currentWeather.getMainData().getHumidity();
	}

	public String getCityName() {
		return cityName;
	}

	public String getIdIcon() {
		return idIcon;
	}

	public double getTemp() {
		return temp;
	}

	public double getTempMin() {
		return tempMin;
	}

	public double getTempMax() {
		return tempMax;
	}

	public double getWindSpeed() {
		return windSpeed;
	}

	public double getPressure() {
		return pressure;
	}

	public double getHumidity() {
		return humidity;
	}
	
	

}
