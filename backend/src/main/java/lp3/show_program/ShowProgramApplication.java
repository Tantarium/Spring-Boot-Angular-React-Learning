package lp3.show_program;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class ShowProgramApplication {

	@Value("api")
	private String restApiBasePath;

	public static void main(String[] args) {
		SpringApplication.run(ShowProgramApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("*").allowedOrigins("http://localhost:4200");
			}
		};
	}

	@EnableWebSecurity
	public static class SecurityConfig extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.authorizeRequests()
					.antMatchers("/action/**")
					.access("isFullyAuthenticated()")
					.and()
					.formLogin()
					.and()
					.csrf().disable();
		}

		@Bean
		@Override
		public UserDetailsService userDetailsService() {
			UserDetails user = User.withDefaultPasswordEncoder()
					.username("user")
					.password("password")
					.roles("USER")
					.build();

			return new InMemoryUserDetailsManager(user);
		}
	}

}
