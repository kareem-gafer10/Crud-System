let productName = document.getElementById("productName"),
  productCategory = document.getElementById("productCategory"),
  productPrice = document.getElementById("productPrice"),
  productDescription = document.getElementById("productDescription"),
  addBtn = document.getElementById("addBtn"),
  inputs = document.getElementsByClassName("form-control"),
  tBody = document.getElementById("tBody"),
  currentIndex = 0,
  nameAlert = document.getElementById("nameAlert"),
  categoryAlert = document.getElementById("categoryAlert"),
  priceAlert = document.getElementById("priceAlert");
descAlert = document.getElementById("descAlert");

let productContainer;

if (localStorage.getItem("allProduct") !== null) {
  productContainer = JSON.parse(localStorage.getItem("allProduct"));
  displayProduct();
} else {
  productContainer = [];
}

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add Product") {
    createProduct();
  } else {
    updateProduct();
  }

  displayProduct();
  clearProduct();
};

function createProduct() {
  let allProducts = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    description: productDescription.value,
  };

  productContainer.push(allProducts);
  localStorage.setItem("allProduct", JSON.stringify(productContainer));
}

function displayProduct() {
  newProduct = ``;
  for (let i = 0; i < productContainer.length; i++) {
    newProduct += `<tr>
    <td>${i + 1}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].description}</td>
    <td><button onclick="editProduct (${i})" class="btn btn-success btn-sm"><i class="fa-solid fa-pen-to-square"></i></button></td>
    <td><button onclick="deleteProduct (${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button></td>
    `;
  }

  tBody.innerHTML = newProduct;
}

function clearProduct() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  displayProduct();
  localStorage.setItem("allProduct", JSON.stringify(productContainer));
}

function searchProduct(searchText) {
  newProduct = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      newProduct += `<tr>
      <td>${i + 1}</td>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].description}</td>
      <td><button class="btn btn-success btn-sm"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button onclick="deleteProduct (${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button></td>
      `;
    }
  }
  tBody.innerHTML = newProduct;
}

function editProduct(index) {
  currentIndex = index;

  let currentProduct = productContainer[index];
  productName.value = currentProduct.name;
  productCategory.value = currentProduct.category;
  productPrice.value = currentProduct.price;
  productDescription.value = currentProduct.description;

  addBtn.innerHTML = "Update Product";
}

function updateProduct() {
  let allProducts = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    description: productDescription.value,
  };
  productContainer[currentIndex] = allProducts;
  localStorage.setItem("allProduct", JSON.stringify(productContainer));
  addBtn.innerHTML = "Add Product";
}

function validateProductName() {
  let nameRegex = /^[A-Z][a-z]{2,8}$/;
  if (nameRegex.test(productName.value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    nameAlert.classList.remove("d-block");
    addBtn.disabled = "false";
    return ture;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    nameAlert.classList.add("d-block");
    nameAlert.classList.remove("d-none");
    addBtn.disabled = true;
    return false;
  }
}

productName.addEventListener("keyup", validateProductName);

function validateProductCategory() {
  let nameRegex = /^[a-z A-Z 0-9]{5,}$/;
  if (nameRegex.test(productCategory.value)) {
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    categoryAlert.classList.add("d-none");
    categoryAlert.classList.remove("d-block");
    addBtn.disabled = "false";
    return ture;
  } else {
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    categoryAlert.classList.add("d-block");
    categoryAlert.classList.remove("d-none");
    addBtn.disabled = true;
    return false;
  }
}

productCategory.addEventListener("keyup", validateProductCategory);

function validateProductPrice() {
  let nameRegex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9]|10000)$/;
  if (nameRegex.test(productPrice.value)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
    priceAlert.classList.remove("d-block");
    addBtn.disabled = "false";
    return ture;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceAlert.classList.add("d-block");
    priceAlert.classList.remove("d-none");
    addBtn.disabled = true;
    return false;
  }
}

productPrice.addEventListener("keyup", validateProductPrice);

function validateProductDesc() {
  let nameRegex = /^[a-z A-Z 0-9]{3,}$/;
  if (nameRegex.test(productDescription.value)) {
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid");
    descAlert.classList.add("d-none");
    descAlert.classList.remove("d-block");
    addBtn.disabled = false;
    return ture;
  } else {
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");
    descAlert.classList.add("d-block");
    descAlert.classList.remove("d-none");
    addBtn.disabled = true;
    return false;
  }
}

productDescription.addEventListener("keyup", validateProductDesc);
