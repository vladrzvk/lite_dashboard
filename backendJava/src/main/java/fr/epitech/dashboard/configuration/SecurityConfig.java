package fr.epitech.dashboard.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import fr.epitech.dashboard.authentication.JwtAuthenticationEntryPoint;
import fr.epitech.dashboard.authentication.JwtRequestFilter;
import fr.epitech.dashboard.user.OAuth2UserCustom;
import fr.epitech.dashboard.user.OAuth2UserService;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsService jwtUserDetailsService;
	
	@Bean
	public JwtRequestFilter authenticationJwtRequestFilter() {
		return new JwtRequestFilter();
	}
	
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.cors().and().csrf().disable()
				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
	/* 
				.authorizeRequests().antMatchers("/").permitAll()
				.antMatchers("/auth/login").permitAll()
				.antMatchers("/user/signup").permitAll()
				.antMatchers("/user/users").permitAll()
				.anyRequest().authenticated().and().oauth2Login()
	            .loginPage("/login")
	            .userInfoEndpoint()
	                .userService(oauthUserService).and()
		    .successHandler(new AuthenticationSuccessHandler() {
		 
		        @Override
		        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		                Authentication authentication) throws IOException, ServletException {
		 
		            OAuth2UserCustom oauthUser = (OAuth2UserCustom) authentication.getPrincipal();
		            
		 
		            oauthUserService.processOAuthPostLogin(oauthUser.getLastName());
		 
		            response.sendRedirect("/dashboard");
		        }
		    });
			
		*/
		
        
				.authorizeRequests().antMatchers(
						"/",
						"/about.json",
						"/auth/login",
						"/auth/oauth2/google",
						"/user/signup",
						"/owm/default",
						"/yfinance/**"
						).permitAll()
				.anyRequest().authenticated();


		httpSecurity.addFilterBefore(authenticationJwtRequestFilter(), UsernamePasswordAuthenticationFilter.class);
	}
	@Autowired
    private OAuth2UserService oauthUserService;
}
