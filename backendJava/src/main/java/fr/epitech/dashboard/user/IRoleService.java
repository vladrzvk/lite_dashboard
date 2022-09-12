package fr.epitech.dashboard.user;

import java.util.List;

public interface IRoleService {
	
	public List<Role> findAllRoles();

	public Role findRoleById(Integer id);
	
	public Role findRoleByRoleName(String roleName);
	
}
