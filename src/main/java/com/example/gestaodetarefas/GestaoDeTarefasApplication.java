package com.example.gestaodetarefas;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GestaoDeTarefasApplication {

    public static void main(String[] args) {
        // Carrega as variáveis do arquivo .env
        Dotenv dotenv = Dotenv.configure().load();
        
        // Define as variáveis de ambiente do sistema
        dotenv.entries().forEach(entry -> {
            String key = entry.getKey();
            String value = entry.getValue();
            if (System.getProperty(key) == null) {
                System.setProperty(key, value);
            }
        });

        SpringApplication.run(GestaoDeTarefasApplication.class, args);
    }
}
