package br.com.tce.login.model;

public class Usuario {

	private String nome;
	private String email;
	private String senha;
	private String uf;
	
	
	public Usuario(String nome, String email, String senha) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
	}
	public Usuario(String nome, String email, String senha, String uf) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.uf = uf;
	}
	public Usuario() {}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}
	
	
	
}
