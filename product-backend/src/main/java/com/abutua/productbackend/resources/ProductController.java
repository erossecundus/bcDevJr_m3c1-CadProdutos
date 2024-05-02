package com.abutua.productbackend.resources;

import java.net.URI;
import java.util.ArrayList;
//import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.abutua.productbackend.models.Product;

//import jakarta.annotation.PostConstruct;

@RestController
@CrossOrigin
public class ProductController {

  private List<Product> products = new ArrayList<>(); // Usado com o init(antes) //retomou esse método para a lista guardar novos produtos

  //criando a lista pelo atributo
  // private List<Product> products = Arrays.asList( //nesse metodo o Arrays.asList() não permite aumentar o conteudo guardado
  //   new Product(1, "product01", "description 1", 100.5, 1, true, true),
  //   new Product(2, "product02", "description 2", 200.5, 2, true, false),
  //   new Product(3, "product03", "description 3", 300.5, 3, false, true),
  //   new Product(4, "product04", "description 4", 400.5, 4, true, false)
  // );

  //criando metodo de salvar o produto
  @PostMapping("products")
  public ResponseEntity<Product> save(@RequestBody Product product){
    product.setId(products.size()+1);
    products.add(product);

    //gerando o URI para o location - criando o produto
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(product.getId())
      .toUri();

    return ResponseEntity.created(location).body(product);
  }

  // @PostConstruct // > Usado pra criar os produtos e adicionar na lista usando o init (descartado)
  // public void init() {
  //   Product p1 = ;
  //   Product p2 = ;
  //   Product p3 = ;
  //   products.add(p1);
  //   products.add(p2);
  //   products.add(p3);
  // }

  @GetMapping("products/{id}")
  public ResponseEntity<Product> getProduct(@PathVariable int id) {

    // if( id <= products.size()) { // > forma tradicional de verificar a validade..
    // return ResponseEntity.ok(products.get(id-1));
    // }
    // else {
    // throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found");
    // }

    // mesma coisa q o código anterior, de forma mais atualizada..
    Product prod = products.stream()          // cria um stream, um tipo de lista, acha o primeiro e filtra - ou trata o erro
                            .findFirst()
                            .filter(p -> p.getId() == id) 
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    return ResponseEntity.ok(prod);
  }

  @GetMapping("products")
  public List<Product> getProducts() {
    return products;
  }
}
