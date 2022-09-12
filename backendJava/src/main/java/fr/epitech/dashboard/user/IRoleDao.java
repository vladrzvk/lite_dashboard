package fr.epitech.dashboard.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleDao extends JpaRepository<Role, Integer>{
	
	public Role findByRoleName(String roleName);

}
