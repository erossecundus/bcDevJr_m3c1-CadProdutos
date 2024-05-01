package com.abutua.productbackend.models;

public class Product {
  
  // atributos
  private int id;
  private String name;
  private String description;
  private double price;
  private int idCategory;
  private boolean promotion;
  private boolean newProduct;

  // metodos construtores
  

  public Product(int id, String name, String description, double price, int idCategory, boolean promotion, boolean newProduct){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.idCategory = idCategory;
    this.promotion = promotion;
    this.newProduct = newProduct;
  }

  public Product(int id, String name, double price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public Product(){ //metodo vazio pode ser útil..
  }

  // metodos
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public int getIdCategory() {
    return idCategory;
  }

  public void setIdCategory(int idCategory) {
    this.idCategory = idCategory;
  }

  public boolean isPromotion() {
    return promotion;
  }

  public void setPromotion(boolean promotion) {
    this.promotion = promotion;
  }

  public boolean isNewProduct() {
    return newProduct;
  }

  public void setNewProduct(boolean newProduct) {
    this.newProduct = newProduct;
  }
}
