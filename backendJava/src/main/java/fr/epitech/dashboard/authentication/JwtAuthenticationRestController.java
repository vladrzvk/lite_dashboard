package fr.epitech.dashboard.authentication;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import fr.epitech.dashboard.user.User;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/auth")
public class JwtAuthenticationRestController {
	
	private final String CLIENT_ID = "302989144123-c8vmja36mr2vfq1k8k57qt6ojvki0pcg.apps.googleusercontent.com";
	private ObjectMapper objectMapper = new ObjectMapper();
	 
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody User user) throws Exception {

		authenticate(user.getUsername(), user.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(user.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return new ResponseEntity<JwtResponse>(new JwtResponse(token, (User) userDetails), HttpStatus.OK);
	}
	
	
		
	
	@SuppressWarnings("unchecked")
	@PostMapping("/oauth2/google")
	public ResponseEntity<JwtResponse> VerificationTokenGoogle(@RequestBody String requestBody)  throws Exception{
		Map<String, String> map = objectMapper.readValue(requestBody, Map.class);
		

		String googleIdToken = map.get("googleIdToken");
		
		UserDetails userDetails = null;
		
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
			    // Specify the CLIENT_ID of the app that accesses the backend:
			    .setAudience(Collections.singletonList(CLIENT_ID))
			    // Or, if multiple clients access the backend:
			    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
			    .build();

			// (Receive idTokenString by HTTPS POST)

		
			GoogleIdToken idToken = verifier.verify(googleIdToken);
			
			if (idToken != null) {
			  Payload payload = idToken.getPayload();
				
			 userDetails = userDetailsService
						.saveOrUpdate(payload);
			 final String token = jwtTokenUtil.generateToken(userDetails);
			 return new ResponseEntity<JwtResponse>(new JwtResponse(token, (User) userDetails), HttpStatus.OK);

			} 
			else {
			  System.out.println("Invalid ID token.");
			  return new ResponseEntity<JwtResponse>(new JwtResponse("erreur", null), HttpStatus.NOT_FOUND);
			}
	}

		  



	
	// endpoint : https://accounts.google.com/o/oauth2/v2/auth
	// client id : <idclient>
	// redirect_uri : localhost:8080/oauth2/google
	// response_type : Détermine si le point de terminaison Google OAuth 2.0 renvoie un code d'autorisation.
	// scope :id
	
	
	// https://accounts.google.com/o/oauth2/v2/auth?
	//	 scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
	//	 access_type=offline&
	//	 include_granted_scopes=true&
	//	 response_type=code&
	//	 state=state_parameter_passthrough_value&
	//	 redirect_uri=https%3A//oauth2.example.com/code&
	//	 client_id=client_id
	
	
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

}
