//引用node module的東西不用路徑名
import $ from 'jquery';

class MobileMenu {
  constructor() {
    this.siteHeader= $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    //要先建構這個function 要不然點擊時會沒有function可以叫 除非另外再叫一個出來
    this.events();
  }

  events(){
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu(){
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
    this.siteHeader.toggleClass('site-header--is-expanded');
    this.menuIcon.toggleClass('site-header__menu-icon--close-x');
  }
}

export default MobileMenu;
