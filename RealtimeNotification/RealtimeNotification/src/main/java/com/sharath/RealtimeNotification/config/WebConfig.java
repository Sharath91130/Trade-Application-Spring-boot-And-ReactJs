package com.sharath.RealtimeNotification.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/notifications")
                        .allowedOrigins("http://localhost:5173") // Vite React app origin
                        .allowedMethods("GET")
                        .allowCredentials(true);
            }
        };
    }
}
