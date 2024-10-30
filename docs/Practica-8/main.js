const API_URL = 'https://fakestoreapi.com/products';

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiamos la lista de productos

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p><strong>Precio:</strong> $${product.price}</p>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count} reviews)</p>
        `;
        productList.appendChild(productDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadProducts);
