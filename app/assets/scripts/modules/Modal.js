import $ from 'jquery';

class Modal{
    constructor(){
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalButton = $('.modal__close');
        this.events();
    }

    events(){
        // clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        // clicking the x close button
        this.closeModalButton.click(this.closeModal.bind(this));

        // type any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    openModal(){
        this.modal.addClass('modal--is-visible');
        // link element without this will got to the href
        return false;
    }

    closeModal(){
        this.modal.removeClass('modal--is-visible');
        return false;
    }

    keyPressHandler(e){
        if(e.keyCode == 27){
            this.closeModal();
        }
    }
}

export default Modal;