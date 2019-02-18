class Modal {
    constructor (element) {
        this.product = element;       
        this._on()
    }
    _on(){
        let $overlay = $('<div/>', {
            class: 'overlay'           
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
        // let $btnClose = $('<div/>', {
        //     class: 'btn btn-close',
        //     text: '&times;'            
        // })

        $btnClose.appendTo($block);
        $img.appendTo($block);   
        $block.appendTo($overlay);     
        $('body').append($overlay);
                

        $btnClose.click(e => {
            this._off(e.target)
        }); 
        
        // $btnClose.click(e => {
        //     this._off($(e.target).data('id'));
        // });
    }
    _off(button){
        $(button).parent().parent().remove();        
        // $($(overlay).data('id')).remove();
        
    }
}