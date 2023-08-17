let products = [];
document.addEventListener("DOMContentLoaded", () => {
    (
        async () => {
            try {
                const response = await fetch('/products/products.json');
                const productsData = await response.json();
                console.log(productsData);
                products = productsData.products;
                displayProducts();
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        }
    )();

    const productsContainer = document.querySelector(".products__container");
    displayProducts = () => {
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.className = "product";

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.className = "product__img";

            const productName = document.createElement("p");
            productName.textContent = product.name;
            productName.className = "product__name";

            const productPrice = document.createElement("p");
            productPrice.textContent = "$" + product.price.toFixed(2);
            productPrice.className = "product__price";

            productElement.appendChild(productImage);
            productElement.appendChild(productName);
            productElement.appendChild(productPrice);

            productsContainer.appendChild(productElement);
        });
    }

    const form = document.querySelector(".product-order-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = sanitizeInput(document.getElementById('name').value);
        const email = sanitizeInput(document.getElementById('email').value);
        const address = sanitizeInput(document.getElementById('address').value);
        const productName = sanitizeInput(document.getElementById('productName').value);
        const quantity = sanitizeInput(document.getElementById('quantity').value);
        const instagram = sanitizeInput(document.getElementById('instagram').value);


        if (!isValidEmail(email)) {
            handleValidationFailure("Ingresa un mail valido.");
            return;
        }

        if (!isValidAddress(address)) {
            handleValidationFailure("Ingresa una dirección valida.");
            return;
        }

        if (!isValidProductName(productName)) {
            handleValidationFailure("Ingresa un nombre de producto valido.");
            return;
        }

        if (!isValidQuantity(quantity)) {
            handleValidationFailure("Ingresa una cantidad valida.");
            return;
        }

        document.getElementById("nameInvisible").value = name;
        document.getElementById("emailInvisible").value = email;
        
        const orderString = `\n
        Una persona a solicitado un producto!
        \n \n
        Detalles de orden: \n
        - Email: ${email} \n
        - Dirección: ${address} \n
        - Nombre del producto: ${productName} \n
        - Cantidad: ${quantity} \n
        - Cuanta de Instagram: ${instagram}
        `;
        console.log(document.getElementById("nameInvisible").value);
        document.getElementById("messageInvisible").value = orderString;
        document.getElementById("formInvisible").submit();
    });
});



function sanitizeInput(input) {
    // Implement input sanitization to prevent XSS and SQL injection
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "''");
}

function handleValidationFailure(message) {
    alert(message);
    console.log(message);
}

// Validation functions...
function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidAddress(address) {
    return /^[0-9A-Za-z\s.,-]+$/.test(address);
}

function isValidProductName(productName) {
    return products.some(product => product.name === productName);
}

function isValidQuantity(quantity) {
    return /^[1-9][0-9]*$/.test(quantity);
}
