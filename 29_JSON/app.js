const productsData = [
    { "name": "Laptop", "category": "electronics", "price": 1200 },
    { "name": "Smartphone", "category": "electronics", "price": 800 },
    { "name": "T-Shirt", "category": "clothing", "price": 20 },
    { "name": "Jeans", "category": "clothing", "price": 40 }
];

function displayProducts(category) {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";
    const filteredProducts = category === "all" ? productsData : productsData.filter(p => p.category === category);
    
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `<h3>${product.name}</h3><p>Category: ${product.category}</p><p>Price: $${product.price}</p>`;
        productContainer.appendChild(productDiv);
    });
}

document.getElementById("category").addEventListener("change", (event) => {
    displayProducts(event.target.value);
});

displayProducts("all");