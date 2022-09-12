package fr.epitech.dashboard.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("roleService")
@Transactional
public class RoleServiceImpl implements IRoleService {
	
	@Autowired
	private IRoleDao roleDao;

	@Override
	public List<Role> findAllRoles() {
		return roleDao.findAll();
	}

	@Override
	public Role findRoleById(Integer id) {
		return roleDao.getById(id);
	}

	@Override
	public Role findRoleByRoleName(String roleName) {
		return roleDao.findByRoleName(roleName);
	}

}
