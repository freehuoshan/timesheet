package net.timesheet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackageClasses={BasePackageInfo.class})
@SpringBootApplication
public class TimeSheetApplication extends SpringBootServletInitializer {
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TimeSheetApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(TimeSheetApplication.class, args);
	}
	
	
}
