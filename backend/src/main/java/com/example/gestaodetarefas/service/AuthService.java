package com.example.gestaodetarefas.service;

import com.example.gestaodetarefas.model.Role;
import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.model.dto.AuthRequest;
import com.example.gestaodetarefas.model.dto.AuthResponse;
import com.example.gestaodetarefas.repository.UsuarioRepository;
import com.example.gestaodetarefas.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired private AuthenticationManager authManager;
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder encoder;

    public AuthResponse login(AuthRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = usuarioRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        return new AuthResponse(jwtService.generateToken(user));
    }

    public void registrar(Usuario usuario) {
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        usuario.setRole(Role.USER);
        usuarioRepo.save(usuario);
    }
}
