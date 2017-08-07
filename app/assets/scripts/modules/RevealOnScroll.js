import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
    constructor(els, offset){
        this.itemsToReveal = els;
        this.offsetPercentage = offset;
        
        //init functions when class created
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints(){
        var thisClass = this;
        this.itemsToReveal.each(function(){
            //將目前這個元素存到變數
            var currentItem = this;
            new Waypoint({
                //要作用的元素
                element: currentItem,
                //碰到後要執行的事
                handler: function(){
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                //觸發起始點設定 0%為最上 100%為最下
                offset: thisClass.offsetPercentage
            });
        });
    }
}

export default RevealOnScroll;