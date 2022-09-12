package fr.epitech.dashboard.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import fr.epitech.dashboard.user.IUserDao;
import fr.epitech.dashboard.user.IUserService;
import fr.epitech.dashboard.user.User;

@Service("authService")
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private IUserDao userDao;
	
	@Autowired
	private IUserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDao.findByUsernameIgnoreCase(username);
	}
	
	public UserDetails saveOrUpdate(Payload payload) {
		User googleUser = new User();
		
		String email = (String) payload.get("email");
		String familyName = (String) payload.get("family_name");
		String givenName = (String) payload.get("given_name");
		String googleID = (String) payload.get("sub");
		
		  googleUser.setUsername(email);
		  googleUser.setFirstName(givenName);
		  googleUser.setGoogleID(googleID);
		  googleUser.setLastName(familyName);

		  userService.addUserRole(googleUser);
		  
		User userFromDb = userDao.findByUsernameIgnoreCase(googleUser.getUsername());
		
		if (userFromDb == null) {
			return userDao.save(googleUser);
		} 
		else {
			if (userFromDb.getGoogleID() != googleUser.getGoogleID()) {
				userFromDb.setGoogleID(googleUser.getGoogleID());
				return userDao.save(userFromDb);
			}
		}
		return userFromDb;
	}
	

}
