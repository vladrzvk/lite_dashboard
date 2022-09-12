package fr.epitech.dashboard.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserDao extends JpaRepository<User, Integer> {
	@Autowired
	public User findByUsernameIgnoreCase(String username);

}
