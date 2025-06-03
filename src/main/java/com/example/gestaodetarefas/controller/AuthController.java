package com.example.gestaodetarefas.controller;

import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.model.dto.AuthRequest;
import com.example.gestaodetarefas.model.dto.AuthResponse;
import com.example.gestaodetarefas.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/registrar")
    public ResponseEntity<Void> registrar(@RequestBody Usuario usuario) {
        authService.registrar(usuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        System.out.println("request: " + request);
        return ResponseEntity.ok(authService.login(request));
    }
}
