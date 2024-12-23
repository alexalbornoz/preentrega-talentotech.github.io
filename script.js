// Variables para el carrito y contador
const cart = [];
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const cartIcon = document.querySelector(".cart-icon");

// Función para añadir al carrito
function addToCart(name, price) {
    const product = { name, price };
    cart.push(product);
    updateCart();
    updateCartCount();
}

// Función para actualizar el carrito
function updateCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Eliminar";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCart();
            updateCartCount();
        };
        li.appendChild(removeBtn);
        cartItems.appendChild(li);

        totalPrice += parseInt(product.price);
    });

    totalPriceElement.textContent = totalPrice.toLocaleString();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const count = cart.length;
    cartCount.textContent = count;

    if (count > 0) {
        cartIcon.classList.add("active"); // Muestra el contador
    } else {
        cartIcon.classList.remove("active"); // Oculta el contador si no hay productos
    }
}

// Escuchar clic en los botones de "Añadir al carrito"
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");
        addToCart(name, price);
    });
});

// Finalizar compra
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert("Gracias por tu compra!");
    cart.length = 0;
    updateCart();
    updateCartCount();
});
