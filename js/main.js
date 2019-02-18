$(document).ready(() => {

    // Товары
    let products = new Product('json/products.json');

    // Корзина
    let cart = new Cart('json/cart.json');

    // Отобразить корзину
    let $cartBtn = $('#cart-link');
    let $cart = $('#cart');
    $cartBtn.on('click', () => {       
        $cart.addClass('cart-active');
    });

    // Скрыть корзину
    let $btnClose = $('.btn-close');
    $btnClose.on('click', () => {
        $cart.removeClass('cart-active');
    });
    
    // Добавление товара в корзину
    $('#product').on('click', '.btn-buy', e => {
        cart.addProduct(e.target);
    });    
});