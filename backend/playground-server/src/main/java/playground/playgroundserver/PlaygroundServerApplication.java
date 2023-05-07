package playground.playgroundserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class PlaygroundServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlaygroundServerApplication.class, args);
	}

}
