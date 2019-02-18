class Modal {
    constructor (element, overlay = 'overlay') {
        this.product = element;
        this.overlay = overlay;       
        this._on()
    }
    _on(){
        let $overlay = $('<div/>', {
            class: this.overlay           
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
            this._off($(`.${this.overlay}`));
        });         
    }    
    _off(overlay){
        $(overlay).remove();
    }   
}