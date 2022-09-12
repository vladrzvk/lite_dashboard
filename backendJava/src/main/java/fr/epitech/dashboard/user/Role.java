package fr.epitech.dashboard.user;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "ROLE")
public class Role implements Serializable, GrantedAuthority {

	private static final long serialVersionUID = 2284252532274015507L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ROLE_ID", updatable = false, nullable = false)
	private int id;
	
	@Column(name="ROLE_NAME", updatable = true, nullable = false)
	private String roleName;
	
	public Role() {
		super();
	}
	
	public Role(String roleName){
		super();
		this.roleName = roleName;
	}
	
	public int getId() {
		return id;
	}
	
	@Override
	public String getAuthority() {
		return roleName;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Role other = (Role) obj;
		if (roleName == null) {
			if (other.roleName != null)
				return false;
		} else if (!roleName.equals(other.roleName))
			return false;
		return true;
	}
}
