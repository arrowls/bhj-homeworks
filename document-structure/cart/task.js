const products = document.querySelectorAll('.product');
const cart = document.querySelector('.cart__products');
const cartContainer = cart.parentElement;

products.forEach((product) => {
    const quantity = product.querySelector('.product__quantity-value');
    product
        .querySelector('.product__quantity-control_dec')
        .addEventListener('click', () => {
            quantity.textContent > 0 && quantity.textContent--;
        });
    product
        .querySelector('.product__quantity-control_inc')
        .addEventListener('click', () => {
            quantity.textContent++;
        });
    product.querySelector('.product__add').addEventListener('click', () => {
        addToCart(product);
    });
});

function addToCart(product) {
    if (!cartContainer.classList.contains('cart-active')) {
        cartContainer.classList.add('cart-active');
    }
    const productImgSrc = product.querySelector('.product__image').src;
    const productQuantity = product.querySelector(
        '.product__quantity-value'
    ).textContent;

    if (isInCart(product)) {
        const productInCart = cart
            .querySelector(`[data-id="${product.dataset.id}"]`)
            .querySelector('.cart__product-count');
        productInCart.textContent =
            +productInCart.textContent + +productQuantity;
        return;
    }

    cart.insertAdjacentHTML(
        'beforeend',
        `<div class="cart__product" data-id="${product.dataset.id}">
        <img class="cart__product-image" src="${productImgSrc}">
        <div class="cart__product-count">${productQuantity}</div>
        <div class="cart__product-delete">&times;</div>
    </div>`
    );

    cart.lastElementChild
        .querySelector('.cart__product-delete')
        .addEventListener('click', (evt) => {
            evt.target.closest('.cart__product').remove();
            !cart.children.length &&
                cartContainer.classList.remove('cart-active');
        });
    animate(product.querySelector('.product__image'), cart.lastElementChild);
}
function isInCart(product) {
    const productsInCart = cart.querySelectorAll('.cart__product');
    return [...productsInCart].some(
        (cartProduct) => cartProduct.dataset.id == product.dataset.id
    );
}
function animate(from, to) {
    const fromCoords = from.getBoundingClientRect();
    const toCoords = to.getBoundingClientRect();
    to.animate(
        [
            {transform: `translate(
                ${fromCoords.left - toCoords.left}px, 
                ${fromCoords.top - toCoords.top}px)`,
            },
            { transform: 'none' },
        ],
        100
    );
}
