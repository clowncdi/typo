parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"l85W":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addWatermarkRightTop=exports.addWatermarkCenterBottom=exports.addWatermarkRightBottom=exports.setFormattingDate=exports.getLongImageStartPositionY=exports.isMobile=exports.checkValue=exports.inputNullCheck=exports.getToday=exports.addDownloadButton=exports.resetPosition=exports.makeDouble=exports.resizeImage=exports.handleChangeImage=exports.changeColor=exports.handleMoveText=exports.handleTargetMove=exports.handleMouseDragEvent=exports.changeFileBtn=exports.imageValueReset=exports.isEmpty=exports.clickEventGA=exports.MoveText=exports.TransEvent=exports.Img=exports.TYPOURL=exports.BGCOLOR=exports.PRIMARYCOLOR=void 0;var e=document.getElementById("year"),t=document.querySelectorAll("a[href^='#']"),n=document.querySelectorAll(".move"),o=document.querySelectorAll(".clearBtn"),r=document.querySelectorAll(".download");exports.PRIMARYCOLOR="#0F8EFF",exports.BGCOLOR="#19202c",exports.TYPOURL="typo.co.kr";var a=function(){function e(){this._width=0,this._height=0}return Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(e){this._width=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(e){this._height=e},enumerable:!1,configurable:!0}),e.prototype.getLongImageStartPositionX=function(){return(this._height-this._width)/2},e.prototype.getLongImageStartPositionY=function(){return(this._width-this._height)/2},e.prototype.reset=function(){this._width=0,this._height=0},e}();exports.Img=a;var i=function(){function e(){this._startX=0,this._startY=0,this._moveX=0,this._moveY=0,this._scale=1,this._scaleMoveX=0,this._scaleMoveY=0,this._drag=!1}return Object.defineProperty(e.prototype,"startX",{get:function(){return this._startX},set:function(e){this._startX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startY",{get:function(){return this._startY},set:function(e){this._startY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"moveX",{get:function(){return this._moveX},set:function(e){this._moveX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"moveY",{get:function(){return this._moveY},set:function(e){this._moveY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scale",{get:function(){return this._scale},set:function(e){this._scale=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scaleMoveX",{get:function(){return this._scaleMoveX},set:function(e){this._scaleMoveX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scaleMoveY",{get:function(){return this._scaleMoveY},set:function(e){this._scaleMoveY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"drag",{get:function(){return this._drag},set:function(e){this._drag=e},enumerable:!1,configurable:!0}),e.prototype.reset=function(){this._startX=0,this._startY=0,this._moveX=0,this._moveY=0,this._scale=1,this._scaleMoveX=0,this._scaleMoveY=0,this._drag=!1},e}();exports.TransEvent=i;var s=function(){function e(){this._isDrag=!1,this._startX=0,this._startY=0,this._newX=0,this._newY=0}return Object.defineProperty(e.prototype,"isDrag",{get:function(){return this._isDrag},set:function(e){this._isDrag=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startX",{get:function(){return this._startX},set:function(e){this._startX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startY",{get:function(){return this._startY},set:function(e){this._startY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"newX",{get:function(){return this._newX},set:function(e){this._newX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"newY",{get:function(){return this._newY},set:function(e){this._newY=e},enumerable:!1,configurable:!0}),e.prototype.reset=function(){this._isDrag=!1,this._startX=0,this._startY=0,this._newX=0,this._newY=0},e}();function c(e,t){gtag("event",e,{app_name:t,event_date:(new Date).toLocaleString()})}function l(e,t){gtag("event","".concat(e,"_download"),{app_name:t,event_date:(new Date).toLocaleString()})}function u(e){if(e)return e;throw new Error("Element is null")}function p(e,t,n){t.reset(),n.reset(),t.width=500,e.getElementsByTagName("img").length>0?(e.removeChild(e.getElementsByTagName("img")[0]),e.getElementsByTagName("span")[0].innerText="X축: 0px, Y축: 0px"):e.insertAdjacentHTML("afterbegin",'<div class="grid"><i></i><i></i><i></i><i></i></div>'),e.style.backgroundColor=""}function d(e){var t=u(e),n=u(t.previousElementSibling);n.innerText="Change",n.style.position="absolute",n.style.left="0",n.style.bottom="-60px",u(t.parentElement).style.zIndex="0"}function g(e,t,n){var o=u(e),r=u(document.getElementById(n)),a=0,i=0,s=L()?"touchstart":"mousedown",c=L()?"touchmove":"mousemove",l=L()?"touchend":"mouseup",p=0,d=0,g=!1;o.addEventListener(s,function(e){t.drag=!0,t.startX=L()?e.touches[0].clientX:e.clientX,t.startY=L()?e.touches[0].clientY:e.clientY,o.style.cursor="grabbing",u(o.getElementsByClassName("grid")[0]).style.display="block"}),o.addEventListener(c,function(e){e.preventDefault(),p=L()?e.touches[0].clientX:e.clientX,d=L()?e.touches[0].clientY:e.clientY,t.drag&&(a=g?0:p-t.startX,i=d-t.startY,t.moveX+=a,t.moveY+=i,t.startX=p,t.startY=d,r.style.scale=String(t.scale),r.style.translate="".concat(t.moveX+t.scaleMoveX,"px ").concat(t.moveY+t.scaleMoveY,"px"),o.getElementsByTagName("span")[0].innerText="X축: ".concat(t.moveX,"px, Y축: ").concat(t.moveY,"px, 비율: ").concat((100*t.scale).toFixed(0),"%"),o.getElementsByTagName("span")[0].style.display="block",o.getElementsByTagName("span")[1].style.display="block")}),o.addEventListener(l,function(){t.drag=!1,o.style.cursor="grab",u(o.getElementsByClassName("grid")[0]).style.display="none"}),document.addEventListener("keydown",function(e){"Shift"!==e.key&&!0!==e.repeat||(g=!0)}),document.addEventListener("keyup",function(e){"Shift"===e.key&&(g=!1)})}function h(e){e.forEach(function(e){var t=0,n=0,o=0,r=0;function a(a){o+=a.clientX-t,r+=a.clientY-n,t=a.clientX,n=a.clientY,e.style.transform="translate(".concat(o,"px, ").concat(r,"px)"),e.style.zIndex="100"}function i(){document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",i)}e.addEventListener("mousedown",function(e){t=e.clientX,n=e.clientY,document.addEventListener("mousemove",a),document.addEventListener("mouseup",i)})})}function f(e,t){var n=!1;e.addEventListener("mousedown",function(e){t.isDrag=!0,t.startX=e.clientX,t.startY=e.clientY}),e.addEventListener("mousemove",function(o){if(o.preventDefault(),t.isDrag){var r=n?0:o.clientX-t.startX,a=o.clientY-t.startY;t.newX+=r,t.newY+=a,t.startX=o.clientX,t.startY=o.clientY,e.style.translate="".concat(t.newX,"px ").concat(t.newY,"px"),e.style.zIndex="10"}}),e.addEventListener("mouseup",function(){t.isDrag=!1}),document.addEventListener("keydown",function(e){"Shift"!==e.key&&!0!==e.repeat||(n=!0)}),document.addEventListener("keyup",function(e){"Shift"===e.key&&(n=!1)})}function m(e,t){var n=u(e),o=u(t);n.addEventListener("change",function(){o.style.color=n.value})}function v(e,t,n,o,r,a){u(e).addEventListener("change",function(e){var i=u(t),s=u(a);p(i,n,o);var c=u(e.target),l=null!=c.files&&c.files[0];if(l){var h=new FileReader;h.readAsDataURL(l),h.onload=function(){var t=new Image;t.src=h.result,i.style.backgroundColor=exports.BGCOLOR,t.onload=function(){n.height=n.width*t.height/t.width,o.startY=t.width>=t.height?0:n.getLongImageStartPositionY(),t.style.left="".concat(o.startX,"px"),t.style.top="".concat(o.startY,"px"),t.id=r,i.appendChild(t),g(i,o,r),y(i,n,o),d(e.target),s.style.marginRight="0"}}}})}function y(e,t,n){e.addEventListener("wheel",function(o){o.preventDefault();var r=o.deltaY>0?.1:-.1;(n.scale+=r,n.scale=Math.max(.1,Math.min(n.scale,3)),n.scale<=.1||n.scale>=3)||(n.scaleMoveX+=t.width*r/2,n.scaleMoveY+=t.height*r/2,n.moveX=0,n.moveY=0,u(e.getElementsByTagName("img")[0]).style.scale=String(n.scale),e.getElementsByTagName("img")[0].style.translate="".concat(n.scaleMoveX,"px ").concat(n.scaleMoveY,"px"),e.getElementsByTagName("span")[0].innerText="X축: ".concat(n.moveX,"px, Y축: ").concat(n.moveY,"px, 비율: ").concat((100*n.scale).toFixed(0),"%"),e.getElementsByTagName("span")[0].style.display="block",e.getElementsByTagName("span")[1].style.display="block")})}function x(e,t){return 0===e?t:t+2*e}function b(e,t,n){t.reset();var o=u(document.getElementById(n));o.style.scale=String(t.scale);var r=o.height>o.width?(o.height-o.width)/-2:0;o.style.translate="0px ".concat(r,"px"),o.style.left="0",o.style.top="0",t.scaleMoveX=0,t.scaleMoveY=r,u(e.previousElementSibling).innerText="X축: ".concat(t.moveX,"px, Y축: ").concat(t.moveY,"px, 비율: ").concat(100*t.scale,"%")}function Y(e,t){var n=document.createElement("a");n.href=e.toDataURL("image/jpeg"),n.download="".concat(_(),"_").concat(exports.TYPOURL,".jpg"),n.innerHTML="<p><span>File Name</span>".concat(_(),"_").concat(exports.TYPOURL,".jpg</p>");var o=document.createElement("button");o.innerText="Download",o.className="btn btn-dark",n.appendChild(o),t.appendChild(n)}function _(){var e=new Date,t=e.getFullYear(),n=e.getMonth()<9?"0"+(e.getMonth()+1):e.getMonth()+1,o=e.getDate()<10?"0"+e.getDate():e.getDate();return"".concat(t,"-").concat(n,"-").concat(o)}function E(e){u(e.previousElementSibling).value=""}function X(e,t){var n;0===(null===(n=t.files)||void 0===n?void 0:n.length)&&(t.previousElementSibling.style.backgroundColor="#ff3333",t.previousElementSibling.style.color="white"),e.forEach(function(e){return w(e)})}function w(e){""==e.value?(e.focus(),e.style.borderColor="red"):e.style.borderColor=exports.PRIMARYCOLOR}function L(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)}exports.MoveText=s,gtag("js",new Date),gtag("config","G-0T4BVMKTXC"),exports.clickEventGA=c,r.forEach(function(e){e.addEventListener("click",function(){l(e.dataset.app,e.dataset.name)})}),exports.isEmpty=u,exports.imageValueReset=p,exports.changeFileBtn=d,exports.handleMouseDragEvent=g,exports.handleTargetMove=h,exports.handleMoveText=f,exports.changeColor=m,exports.handleChangeImage=v,exports.resizeImage=y,exports.makeDouble=x,exports.resetPosition=b,exports.addDownloadButton=Y,exports.getToday=_,exports.inputNullCheck=X,exports.checkValue=w,exports.isMobile=L;var T=document.querySelectorAll(".item-wrap");function M(e){return(e.width-e.height)/2}function O(e){var t=e.split("-");return t[1]=t[1].replace(/^0+/,""),t[2]=t[2].replace(/^0+/,""),"".concat(t[0],".").concat(t[1],".").concat(t[2])}function k(e,t){e.restore(),e.font="24px S-CoreDream-6Bold",e.letterSpacing="0px",e.textAlign="right",e.fillStyle=t,e.filter="opacity(0.5)",e.fillText("".concat(exports.TYPOURL),980,980)}function B(e,t){e.restore(),e.font="24px S-CoreDream-6Bold",e.letterSpacing="0px",e.textAlign="center",e.fillStyle=t,e.filter="opacity(0.5)",e.fillText("".concat(exports.TYPOURL),500,980)}function D(e,t){e.restore(),e.font="24px S-CoreDream-6Bold",e.letterSpacing="0px",e.textAlign="right",e.fillStyle=t,e.filter="opacity(0.5)",e.fillText("".concat(exports.TYPOURL),980,40)}document.addEventListener("DOMContentLoaded",function(){T.forEach(function(e){e.classList.add("loaded")}),h(n),e.innerText=(new Date).getFullYear().toString()}),o.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),E(e)})}),exports.getLongImageStartPositionY=M,exports.setFormattingDate=O,t.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault();var n=u(document.querySelector(e.hash)).getBoundingClientRect().top;window.scrollBy({top:n-150,left:0,behavior:"smooth"})})}),exports.addWatermarkRightBottom=k,exports.addWatermarkCenterBottom=B,exports.addWatermarkRightTop=D;
},{}],"UkND":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,l){function i(e){try{c(r.next(e))}catch(t){l(t)}}function o(e){try{c(r.throw(e))}catch(t){l(t)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,o)}c((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,a,l,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(c){o=[6,c],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./common"),r=new n.Img,a=new n.TransEvent,l=document.getElementById("nav"),i=document.getElementById("fileInput"),o=document.getElementById("url"),c=document.getElementById("lowTemp"),s=document.getElementById("highTemp"),u=document.getElementById("dateInput"),d=document.getElementById("country"),m=document.getElementById("city"),f=document.getElementById("selectedImage"),h=document.getElementById("submitBtn"),g=document.getElementById("imageContainer"),v=document.querySelectorAll(".weather-icon"),p=document.querySelectorAll("#app1 input"),y=document.querySelector("#app1 .selected-image-position-reset"),w="",x="chooseImg";function E(){return e(this,void 0,Promise,function(){var e,l,f,h,v,y,x,E,b;return t(this,function(t){switch(t.label){case 0:return(0,n.clickEventGA)("app1_create_weather","Today Weather"),g.innerHTML="",(0,n.isEmpty)(g.nextElementSibling).innerHTML="",(0,n.inputNullCheck)(p,i),(e=(0,n.isEmpty)(i.files)[0])&&(g.parentElement.parentElement.style.display="block"),l=c.value,f=s.value,h=u.value.replaceAll("-",""),v=new FileReader,y=new FileReader,x=document.createElement("canvas"),E=x.getContext("2d"),[4,fetch(w).then(function(e){return e.blob()})];case 1:return b=t.sent(),v.readAsDataURL(e),y.readAsDataURL(b),v.onload=function(){var e=new Image;e.src=v.result;var t=new Image;t.src=y.result,e.onload=function(){x.width=1e3,x.height=1e3,E.fillStyle=n.BGCOLOR,E.fillRect(0,0,1e3,1e3);var i=1e3*a.scale,c=i*e.height/e.width,s=2*a.moveX,u=2*a.moveY+2*r.getLongImageStartPositionY();E.drawImage(e,s,u,i,c),E.font="50px S-CoreDream-6Bold",E.fillStyle="white",E.shadowColor="rgba(0, 0, 0, 0.5)",E.shadowBlur=16,E.shadowOffsetX=0,E.shadowOffsetY=0,E.textAlign="right",o&&E.fillText(o.value,950,90),E.filter="opacity(1)",E.drawImage(t,50,160),E.font="50px S-CoreDream-3Light",E.textAlign="left",h&&E.fillText(h.substring(0,4),60,850),E.textAlign="right",d&&E.fillText(d.value,950,840),E.font="90px S-CoreDream-3Light",E.textAlign="left";var v=90+Math.round(E.measureText(l).width);l&&f&&E.fillText("/",v,127),E.font="100px S-CoreDream-6Bold",E.textAlign="left",l&&E.fillText(l+"°",44,132),f&&E.fillText(f+"°",40+E.measureText(l+"°/").width,132),E.letterSpacing="-1px",h&&E.fillText(h.substring(4),55,953),E.textAlign="right",m&&E.fillText(m.value,950,943),(0,n.addWatermarkCenterBottom)(E,"white"),g.appendChild(x),(0,n.addDownloadButton)(x,g.nextElementSibling)}},[2]}})})}(0,n.handleChangeImage)(i,f,r,a,x,h),y.addEventListener("click",function(e){return(0,n.resetPosition)((0,n.isEmpty)(e.target),a,x)}),document.addEventListener("DOMContentLoaded",function(){u.value=(0,n.getToday)(),o.value="Weaco.co.kr",m.value="서울",d.value="S.Korea, Seoul";var e=v.item(0).children[0];e.classList.add("active"),w=e.src.slice(e.src.lastIndexOf("/"))}),v.forEach(function(e){e.addEventListener("click",function(e){var t=(0,n.isEmpty)(e.target);if(t.classList.contains("active"))return t.classList.remove("active"),void(w="");"IMG"!=t.tagName&&"svg"!=t.tagName||(v.forEach(function(e){e.children[0].classList.remove("active")}),t.classList.add("active"),w=t.src.slice(t.src.lastIndexOf("/")))})}),(0,n.isMobile)()&&h.addEventListener("touchstart",E),!(0,n.isMobile)()&&h.addEventListener("click",E),document.addEventListener("scroll",function(){window.scrollY>150?l.classList.add("show"):l.classList.remove("show")});
},{"./common":"l85W"}]},{},["UkND"], null)