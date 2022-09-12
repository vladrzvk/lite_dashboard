package fr.epitech.dashboard.user;

import java.util.List;

public interface IUserService {

	public User saveOrUpdateUser(User user);
	
	public void deleteUser(Integer id);
	
	public List<User> findAllUsers();
	
	public User findUserById(Integer id);
	
	public User findUserByUsername(String username);

	public void addUserRole(User user);
	
}
