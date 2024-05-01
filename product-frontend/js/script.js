$("#inputPrice").mask("#.##0,00", { reverse: true });

function convertToNumber(priceFormat) {
  return priceFormat.replace(/\./g, '').replace(',', '.');
}

var products = [
  {
    id: 1,
    name: "Computador M1-TX",
    description: "Intel I7, 16GB, SSD 256, HD 1T",
    price: 4900,
    category: 1,
    promotion: true,
    new: true
  },
  {
    id: 2,
    name: "Computador M2-TX",
    description: "Intel I7, 32GB, SSD 512, HD 1T",
    price: 5600,
    category: 2,
    promotion: false,
    new: true
  },
  {
    id: 3,
    name: "Computador M1-T",
    description: "Intel I5, 16GB, HD 1T",
    price: 2900,
    category: 3,
    promotion: false,
    new: false
  },
];

var categories = [
  { id: 1, name: "Produção Própria" },
  { id: 2, name: "Nacional" },
  { id: 3, name: "Importado" }
];

//onLoad
loadProducts();

//load all products
function loadProducts() {
  for (let prod of products) {
    addNewRow(prod);
  }
}

//save a product
function save() {

  var prod = {
    id: products.length + 1,
    name: document.getElementById("inputName").value,
    description: document.getElementById("inputDescription").value,
    price: convertToNumber(document.getElementById("inputPrice").value),
    category: document.getElementById("selectCategory").value,
    promotion: document.getElementById("checkBoxPromotion").checked,
    new: document.getElementById("checkBoxNewProduct").checked,
  };

  addNewRow(prod);
  products.push(prod);

  document.getElementById("formProduct").reset();
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
  var categoryNode = document.createTextNode(categories[prod.category - 1].name);
  newRow.insertCell().appendChild(categoryNode);

  //insert product option
  var options = "";
  if (prod.promotion) {
    options += "<span class='badge text-bg-success me-1'>P</span>";
  }
  if (prod.new) {
    options += "<span class='badge text-bg-primary'>L</span>";
  }
  var cell = newRow.insertCell();
  cell.className = "d-none d-md-table-cell"
  cell.innerHTML = options;
}