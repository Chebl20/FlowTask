package com.example.gestaodetarefas.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "tarefa")
public class Tarefa {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
   @Column(name = "titulo", nullable = false)
    private String titulo;
   @Column(name = "descricao", nullable = false)
    private String descricao;
   @Column(name = "status", nullable = false)
   @JsonProperty("status")
    private String statusTarefa;
   
   @ManyToOne
   @JoinColumn(name = "usuario_id")
   private Usuario usuario;

    public Tarefa(Long id, String titulo, String descricao, String statusTarefa) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.statusTarefa = statusTarefa;
    }

    public Tarefa(String titulo, String descricao, String statusTarefa) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.statusTarefa = statusTarefa;
    }

    public Tarefa() {
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getStatusTarefa() {
        return statusTarefa;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setStatusTarefa(String statusTarefa) {
        this.statusTarefa = statusTarefa;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
