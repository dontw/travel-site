# travel-site 旅遊網站首頁
* 響應式設計
* 圖片支援Retina螢幕

## 使用工具
* gulp
    * scripts - 由gulp驅動webpack將ES6轉為ES5
    * sprites - 使用gulp-svg-sprite將多個svg轉為一張png，並提供各圖示設定之CSS
    * styles - 將PostCss轉為一般CSS
    * watch - 建立開發用server，並偵測CSS、JS的變動，自動進行編譯及reload

* postcss
    * gulp-postcss - gulp轉postcss主要包
    * autoprefixer - 自動新增瀏覽器前綴
    * postcss-simple-vars - CSS變數功能
    * postcss-nested - CSS巢狀結構功能
    * postcss-imported - CSS引用其他CSS功能
    * postcss-hexrgba - 能在rgba()中以hex為參數