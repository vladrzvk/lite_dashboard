package fr.epitech.dashboard.user;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("userService")
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private IUserDao userDao;
	
	@Autowired
	private IRoleDao roleDao;
	
	@Override
	public User saveOrUpdateUser(User user) {
		if (user.getId() == null) {
			addUserRole(user);
		} else {
			updateUserRole(user);
		}
		user.setEnabled(true);
		return userDao.save(user);
	}
	
	@Override
	public void deleteUser(Integer id) {
		userDao.deleteById(id);
	}
	
	@Override
	public List<User> findAllUsers() {
		return userDao.findAll();
	}
	
	@Override
	public User findUserById(Integer id) {
		return userDao.getById(id);
	}
	
	@Override
	public User findUserByUsername(String username) {
		return userDao.findByUsernameIgnoreCase(username);
	}
	
	//Private methods used in service methods
	
	@SuppressWarnings("unchecked")
	@Override
	public void addUserRole(User user) {
		Set<Role> roles= (Set<Role>) user.getAuthorities();
		Role roleUser = new Role("ROLE_USER");
		roles.add(roleUser);

		Set<Role> rolesFromDB = extractRole(roles, roleDao.findAll());
		user.setAuthorities(rolesFromDB);
	}
	
	@SuppressWarnings("unchecked")
	private void updateUserRole(User user) {
		Set<Role> rolesFromDB = extractRole((Set<Role>) user.getAuthorities(), roleDao.findAll());
		user.setAuthorities(rolesFromDB);
	}
	
 	private Set<Role> extractRole(Set<Role> rolesSetFromUser, List<Role> rolesFromDB) {
 		Set<String> uiRoleNames = rolesSetFromUser.stream()
 		    .map(Role::getAuthority)
 		    .collect(Collectors.toCollection(HashSet::new));
		return rolesFromDB
			.stream()
			.filter(role -> uiRoleNames.contains(role.getAuthority()))
		    .collect(Collectors.toSet());
	}
 	
 	
 	
 // Methode pour la gestion & utilisation de token pour OAuth 2 
 	
 	// Obtenir des infos 
 	
 	
 	
 	// methode pour creer un user a partir des informations du token 
 	
 	// 
 	
 	
 	

}
