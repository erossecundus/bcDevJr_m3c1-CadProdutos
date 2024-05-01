package com.abutua.productbackend.models;

public class Category {

  //atributos
  private int id;
  private String name;

  //metodos construtores
  public Category(int id, String name){
    this.id = id;
    this.name = name;
  }

  public Category(){

  }
  
  //metodos
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  
  
  
}
