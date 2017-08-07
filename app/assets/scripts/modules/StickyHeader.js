import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader{
    constructor(){
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();

        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints();

        this.addSmoothScrolling();
    }

    addSmoothScrolling(){
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint(){
        var thisClass = this;
        new Waypoint({
            //assign it to the first jquery object, make it a DOM object
            element: thisClass.headerTriggerElement[0],
            handler: function(direction){
                if(direction == "down"){
                    thisClass.siteHeader.addClass("site-header--dark");
                }else{
                    thisClass.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }

    createPageSectionWaypoints(){
        var thisClass = this;
        this.pageSections.each(function(){
            var CurrentPageSection = this;
            new Waypoint({
                element: CurrentPageSection,
                handler: function(direction){
                    if(direction == "down"){
                         var matchingHeaderLink = CurrentPageSection.getAttribute("data-matching-link");
                        thisClass.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                   
                },
                offset: "18%"
            });

             new Waypoint({
                element: CurrentPageSection,
                handler: function(direction){
                    if(direction == "up"){
                         var matchingHeaderLink = CurrentPageSection.getAttribute("data-matching-link");
                        thisClass.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                   
                },
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;