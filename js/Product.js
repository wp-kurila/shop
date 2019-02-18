class Product {
    constructor (source, container = '#product'){
        this.source = source;        
        this.container = container;
        this.productItems = []; // Массив товаров
        this._init();
    }
    _init(){        
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data){
                    this.productItems.push(product);
                    this._renderProduct(product);
                }
            })
    }
    _renderProduct(product){
        let $container = $('<div/>', {
            class: 'product-item',
            id: product.id
        });
        let $img = $('<img/>', {
            src: product.src,
            alt: product.alt,
            'data-id': product.id
        });
        let $desc = $('<div/>', {
            class: 'desc'
        });
        let $name = $('<p/>', {
            class: 'product-name',
            text: product.name
        });
        let $descPrice = $('<div/>', {
            class: 'descPrice'
        });
        let $price = $('<p/>', {
            class: 'product-price',
            text: product.price+' Руб'
        });
        let $buyBtn = $('<button/>', {
            class: 'btn btn-buy',
            text: 'В корзину',
            'data-id': product.id,
            'data-title': product.name,
            'data-price': product.price
        });

        // Структура
        $name.appendTo($desc);
        $price.appendTo($descPrice);
        $buyBtn.appendTo($descPrice);
        $descPrice.appendTo($desc);
        $img.appendTo($container);
        $desc.appendTo($container);
        $(this.container).append($container);

        //Модальное окно
        $img.click(e => {
            //console.log($(e.target).data('id'))
            let modal = new Modal(e.target);
        });
    }
}