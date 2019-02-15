class Modal {
    constructor (element) {
        this.product = element;
        this.src = null;
        this.alt = null;
        this._on()
    }
    _on(){
        let $overlay = $('<div/>', {
            class: 'overlay',
            id: 'overlay'
        });
        let $block = $('<div/>', {
            class: 'popup'
        });
        let $img = $('<img/>', {
            src: this.product.src,
            alt: this.product.alt,
            class: 'popup-img'
        });
        let $btnClose = $(`<button class="btn btn-close">&times;</button>`);

        $btnClose.appendTo($block);
        $img.appendTo($block);   
        $block.appendTo($overlay);     
        $('body').append($overlay);
                

        $btnClose.click(e => {
            this._off(e.target)
        })       
    }
    _off(element){
        $(element).parent().parent().remove();
        
        
        
    }
}