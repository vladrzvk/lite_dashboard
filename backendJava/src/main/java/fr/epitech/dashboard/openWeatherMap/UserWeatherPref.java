package fr.epitech.dashboard.openWeatherMap;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fr.epitech.dashboard.user.User;

@Entity
@Table(name="USER_WEATHER_PREF")
public class UserWeatherPref implements Serializable {

	private static final long serialVersionUID = 3939445201393163146L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PREF_ID")
	private Integer id;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "USER_ID")
	private User user;
	
	@Column(name = "CITY_NAME", nullable = false)
	private String cityName;
	
	public UserWeatherPref() {
		super();
	}
	
	public UserWeatherPref(User user, String cityName) {
		this.user = user;
		this.cityName = cityName;
	}

	public Integer getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public String getCityName() {
		return cityName;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

}
