$(document).ready(() => {

    // Товары
    let products = new Product('json/products.json');

    // Отобразить корзину
    let $cartBtn = $('#cart-link');
    let $cart = $('#cart');
    $cartBtn.on('click', () => {
       
        $cart.addClass('cart-active');
    })

    // Скрыть корзину
    let $btnClose = $('.btn-close');
    $btnClose.on('click', () => {

        $cart.removeClass('cart-active');
    })

    
});