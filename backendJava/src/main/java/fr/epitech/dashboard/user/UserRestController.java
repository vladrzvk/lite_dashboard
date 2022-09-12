package fr.epitech.dashboard.user;

import java.util.List;
import javax.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserRestController {
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@RolesAllowed("ADMIN")
	@GetMapping("/users")
	public ResponseEntity<List<User>> findAllUsers() {
		List<User> users = userService.findAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
	@RolesAllowed({"USER","ADMIN"})
	@GetMapping("/{id}")
	public ResponseEntity<User> findUserById(@PathVariable(value = "id") Integer id) {
		User userFound = userService.findUserById(id);
		System.out.println(userFound);
		return new ResponseEntity<User>(userFound, HttpStatus.OK);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User userCreated = userService.saveOrUpdateUser(user);
		return new ResponseEntity<User>(userCreated, HttpStatus.CREATED);
	}
	
	@RolesAllowed({"USER","ADMIN"})
	@PutMapping("/")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		User userFromDB = userService.findUserById(user.getId());
		if(!passwordEncoder.matches(user.getPassword(), userFromDB.getPassword())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		} else {
			user.setPassword(userFromDB.getPassword());
		}
		User userUpdated = userService.saveOrUpdateUser(user);
		return new ResponseEntity<User>(userUpdated, HttpStatus.OK);
	}
	
	@RolesAllowed("ADMIN")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable(value = "id") Integer id) {
		userService.deleteUser(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
 
}
