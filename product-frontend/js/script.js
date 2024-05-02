$("#inputPrice").mask("#.##0,00", { reverse: true });

function convertToNumber(priceFormat) {
  return priceFormat.replace(/\./g, '').replace(',', '.');
}

var products = [];
var categories = [];

//onLoad
loadCategories();
loadProducts();

//load all categories
function loadCategories() {
  $.ajax({
          url: "http://localhost:8080/categories", 
          type: "GET",
          async: false, //usa o ajax para sincronizar a requisição
          success : (response) => {
            categories = response;
            // for (var cat of categories) { // > forma alternativa do prof ao selectCategories()
            //   document.getElementById("selectCategory").innerHTML += `<option value=${cat.id}>${cat.name}</option>`;
            // }
          } 
  });
  selectCategories();
}

//load all products
function loadProducts() {

  $.getJSON("http://localhost:8080/products", (response) => {
    products = response;
    for (let prod of products) {
      addNewRow(prod);
    } 
  });
}

function selectCategories() { // > prof. fez diferente com .innerHtml diretamente no loadCategories()
  var select = document.getElementById("selectCategory");
  
  for (let cat of categories) {
    var option = document.createElement("option");
    option.value = cat.id;
    option.text = cat.name;
    select.add(option);
  } 
   
}

//save a product
function save() {

  var prod = {
    id:           products.length + 1,
    name:         document.getElementById("inputName").value,
    description:  document.getElementById("inputDescription").value,
    price:        convertToNumber(document.getElementById("inputPrice").value),
    idCategory:   document.getElementById("selectCategory").value,
    promotion:    document.getElementById("checkBoxPromotion").checked,
    newProduct:   document.getElementById("checkBoxNewProduct").checked,
  };
  $.ajax({
    url: "http://localhost:8080/products", 
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(prod), //converte o produto em JSON para enviar no corpo da requisição
    //async: true, //nesse caso pode ser assincrono (default)
    success : (product) => {
      addNewRow(product);
      products.push(product);
      document.getElementById("formProduct").reset();
    } 
  });
}

//add new row
function addNewRow(prod) {
  var table = document.getElementById("productsTable");

  var newRow = table.insertRow();

  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //insert product id
  var idNode = document.createTextNode(prod.id);
  newRow.insertCell().appendChild(idNode);

  //insert product name
  var nameNode = document.createTextNode(prod.name);
  newRow.insertCell().appendChild(nameNode);

  //insert product description
  var descriptionNode = document.createTextNode(prod.description);
  var cell = newRow.insertCell();
  cell.className ="d-none d-md-table-cell";
  cell.appendChild(descriptionNode);

  //insert product price
  var priceNode = document.createTextNode(formatter.format(prod.price));
  newRow.insertCell().appendChild(priceNode);

  //insert product category
  var categoryNode = document.createTextNode(categories[prod.idCategory - 1].name);
  newRow.insertCell().appendChild(categoryNode);

  //insert product option
  var options = "";
  if (prod.promotion) {
    options += "<span class='badge text-bg-success me-1'>P</span>";
  }
  if (prod.newProduct) {
    options += "<span class='badge text-bg-primary'>L</span>";
  }
  var cell = newRow.insertCell();
  cell.className = "d-none d-md-table-cell"
  cell.innerHTML = options;
}