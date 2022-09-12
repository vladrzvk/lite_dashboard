package fr.epitech.dashboard.user;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class OAuth2User extends User {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3842928915310840931L;

	/**
	 * 
	 */
	@Column(name ="Provider", nullable=true)
	@Enumerated(EnumType.STRING)
    private Provider provider;
 
    public Provider getProvider() {
        return provider;
    }
 
    public void setProvider(Provider provider) {
        this.provider = provider;
    }
	

}
