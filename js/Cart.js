class Cart {
    constructor (source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее количество товаров
        this.amount = 0; // Общая стоимость товаров
        this.cartItems = []; // Массив товаров
        this._render();
    }
    _render(){
        let $cartItemsBlock = $('<div/>' , {
            class: 'cart-items-block'
        });
        let $totalCount = $('<div/>' , {
            class: 'cart-summary sum-count'            
        });
        let $totalPrice = $('<div/>' , {
            class: 'cart-summary sum-price'
        });
        $cartItemsBlock.appendTo($(this.container));
        $totalCount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
        this._renderSum();
        this._init();
        
    }
    _init(){
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for(let product of data.contents){
                    this.cartItems.push(product);
                    this._renderProduct(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;                
                this._renderSum();
            })
    }
    _renderProduct(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.product_id
        });
        let $img = $('<img/>', {
            class: 'product-img',
            src: product.product_src,
            alt: product.product_alt
        })
        $container.append($img);
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.product_quantity} шт</p>`));
        $container.append($(`<p class="product-price">${product.product_price} рублей</p>`));
        let $delBtn = $('<button class="btn btn-close">&times;</button>');
        $delBtn.click(() => {
            this._removeItem(product.product_id);
        });
        $container.append($delBtn);
        $container.appendTo($('.cart-items-block'));
    }
    _renderSum(){
        $('.sum-count').text(`Всего товаров в корзине: ${this.countGoods} шт`);
        $('.sum-price').text(`Всего товаров в корзине: ${this.amount} руб`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.product_id === productId);
        if(find){
            find.product_quantity++;
            this.countGoods++;
            this.amount += find.product_price;
            this._updateCart(find);
        } else {
            let product = {
                product_id: productId,
                product_src: $(element).data('src'),
                product_alt: $(element).data('alt'),
                product_name: $(element).data('title'),
                product_price: +$(element).data('price'),
                product_quantity: 1
            };
            this.cartItems.push(product);
            this.countGoods += product.product_quantity;
            this.amount += product.product_price;
            this._renderProduct(product);
        };
        this._renderSum();
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.product_id}"`);
        $container.find('.product-quantity').text(product.product_quantity + ' шт');
        $container.find('.product-price').text(product.product_price * product.product_quantity + ' рублей');
    }
    _removeItem(productId){
        let find = this.cartItems.find(product => product.product_id === productId);
        if(find.product_quantity > 1){
            find.product_quantity--;
            this._updateCart(find);
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $(`div[data-product='${productId}']`).remove();
        }
        this.countGoods--;
        this.amount -= find.product_price;
        this._renderSum();
    }
}