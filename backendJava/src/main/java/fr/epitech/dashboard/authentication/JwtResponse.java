package fr.epitech.dashboard.authentication;

import java.io.Serializable;

import fr.epitech.dashboard.user.User;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = 7698165159277518574L;

	private final String jwttoken;
	private final User user;

	public JwtResponse(String jwttoken, User user) {
		this.jwttoken = jwttoken;
		this.user = user;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public User getUser() {
		return this.user;
	}

}
