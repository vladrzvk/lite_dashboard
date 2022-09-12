package fr.epitech.dashboard.openWeatherMap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserWeatherPrefDao extends JpaRepository<UserWeatherPref, Integer> {
	
	@Modifying
	@Query(value = "DELETE FROM USER_WEATHER_PREF WHERE USER_ID = ?1", nativeQuery=true)
	public void deleteByUserId(Integer userId);
	
	@Query(value = "SELECT CITY_NAME FROM USER_WEATHER_PREF WHERE USER_ID = ?1", nativeQuery=true)
	public String findByUserId(Integer userId);

}
