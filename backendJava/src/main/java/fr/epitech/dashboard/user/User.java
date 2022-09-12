package fr.epitech.dashboard.user;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "USER")
public class User implements Serializable, UserDetails {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "USER_ID")
	private Integer id;
	
	@Column(name = "USERNAME", nullable = false, unique = true)
	private String username;
	
	@Column(name = "PASSWORD", nullable = true)
	private String password;
	
	@Column(name = "FIRSTNAME", nullable = true)
	private String firstName;
	
	@Column(name = "LASTNAME", nullable = true)
	private String lastName;
	
	@Column(name = "ENABLED", nullable = false)
	private boolean enabled;
	
	@Column(name="GoogleID",nullable=true, unique=true)
	private String googleID;

	
	//@ManyToMany(cascade = CascadeType.DETACH)
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)

	@JoinTable(name = "USER_ROLES", 
	joinColumns = {
			@JoinColumn(name = "USER_ID",
					referencedColumnName = "USER_ID")
	},
	inverseJoinColumns= {
			@JoinColumn(name = "ROLE_ID",
					referencedColumnName="ROLE_ID")
	})
	private Set<Role> authorities = new HashSet<>();

	public User() {
		super();
	}
	
	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
		this.enabled = true;
	}
	
	public User(String username, String password, String googleID) {
		super();
		this.username = username;
		this.password = password;
		this.googleID = googleID;
		this.enabled = true;
	}
	
	public User(String username, String password, String firstName, String lastName) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.enabled = true;
	}
	// contructor pour la creation d'user, les premières auth avec token
	
	public User(String username, String password, String firstName, String lastName, String googleID) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.googleID = googleID;
		this.enabled = true;
	}
	
	public Integer getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}
	
	public String getGoogleID() {
		return googleID;
	}
	
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return enabled;
	}

	@Override
	public boolean isAccountNonLocked() {
		return enabled;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return enabled;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public void setAuthorities(Set<Role> authorities) {
		this.authorities = authorities;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public void setGoogleID(String googleID) {
		this.googleID=googleID;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		return true;
	}
	
}
