parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"l85W":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addWatermarkRightTop=exports.addWatermarkCenterBottom=exports.addWatermarkRightBottom=exports.setFormattingDate=exports.getLongImageStartPositionY=exports.isMobile=exports.checkValue=exports.inputNullCheck=exports.getToday=exports.addDownloadButton=exports.resetPosition=exports.makeDouble=exports.resizeImage=exports.handleChangeImage=exports.changeColor=exports.handleMoveText=exports.handleTargetMove=exports.handleMouseDragEvent=exports.changeFileBtn=exports.imageValueReset=exports.isEmpty=exports.MoveText=exports.TransEvent=exports.Img=exports.TYPOURL=exports.BGCOLOR=exports.PRIMARYCOLOR=void 0;var e=document.getElementById("year"),t=document.querySelectorAll("a[href^='#']"),n=document.querySelectorAll(".move"),o=document.querySelectorAll(".clearBtn");exports.PRIMARYCOLOR="#0F8EFF",exports.BGCOLOR="#19202c",exports.TYPOURL="typo.co.kr";var r=function(){function e(){this._width=0,this._height=0}return Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(e){this._width=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(e){this._height=e},enumerable:!1,configurable:!0}),e.prototype.getLongImageStartPositionX=function(){return(this._height-this._width)/2},e.prototype.getLongImageStartPositionY=function(){return(this._width-this._height)/2},e.prototype.reset=function(){this._width=0,this._height=0},e}();exports.Img=r;var i=function(){function e(){this._startX=0,this._startY=0,this._moveX=0,this._moveY=0,this._scale=1,this._scaleMoveX=0,this._scaleMoveY=0,this._drag=!1}return Object.defineProperty(e.prototype,"startX",{get:function(){return this._startX},set:function(e){this._startX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startY",{get:function(){return this._startY},set:function(e){this._startY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"moveX",{get:function(){return this._moveX},set:function(e){this._moveX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"moveY",{get:function(){return this._moveY},set:function(e){this._moveY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scale",{get:function(){return this._scale},set:function(e){this._scale=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scaleMoveX",{get:function(){return this._scaleMoveX},set:function(e){this._scaleMoveX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scaleMoveY",{get:function(){return this._scaleMoveY},set:function(e){this._scaleMoveY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"drag",{get:function(){return this._drag},set:function(e){this._drag=e},enumerable:!1,configurable:!0}),e.prototype.reset=function(){this._startX=0,this._startY=0,this._moveX=0,this._moveY=0,this._scale=1,this._scaleMoveX=0,this._scaleMoveY=0,this._drag=!1},e}();exports.TransEvent=i;var a=function(){function e(){this._isDrag=!1,this._startX=0,this._startY=0,this._newX=0,this._newY=0}return Object.defineProperty(e.prototype,"isDrag",{get:function(){return this._isDrag},set:function(e){this._isDrag=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startX",{get:function(){return this._startX},set:function(e){this._startX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"startY",{get:function(){return this._startY},set:function(e){this._startY=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"newX",{get:function(){return this._newX},set:function(e){this._newX=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"newY",{get:function(){return this._newY},set:function(e){this._newY=e},enumerable:!1,configurable:!0}),e.prototype.reset=function(){this._isDrag=!1,this._startX=0,this._startY=0,this._newX=0,this._newY=0},e}();function s(e){if(e)return e;throw new Error("Element is null")}function c(e,t,n){t.reset(),n.reset(),t.width=500,e.getElementsByTagName("img").length>0?(e.removeChild(e.getElementsByTagName("img")[0]),e.getElementsByTagName("span")[0].innerText="X축: 0px, Y축: 0px"):e.insertAdjacentHTML("afterbegin",'<div class="grid"><i></i><i></i><i></i><i></i></div>'),e.style.backgroundColor=""}function l(e){var t=s(e),n=s(t.previousElementSibling);n.innerText="Change",n.style.position="absolute",n.style.left="0",n.style.bottom="-60px",s(t.parentElement).style.zIndex="0"}function u(e,t,n){var o=s(e),r=s(document.getElementById(n)),i=0,a=0,c=E()?"touchstart":"mousedown",l=E()?"touchmove":"mousemove",u=E()?"touchend":"mouseup",p=0,d=0,g=!1;o.addEventListener(c,function(e){t.drag=!0,t.startX=E()?e.touches[0].clientX:e.clientX,t.startY=E()?e.touches[0].clientY:e.clientY,o.style.cursor="grabbing",s(o.getElementsByClassName("grid")[0]).style.display="block"}),o.addEventListener(l,function(e){e.preventDefault(),p=E()?e.touches[0].clientX:e.clientX,d=E()?e.touches[0].clientY:e.clientY,t.drag&&(i=g?0:p-t.startX,a=d-t.startY,t.moveX+=i,t.moveY+=a,t.startX=p,t.startY=d,r.style.scale=String(t.scale),r.style.translate="".concat(t.moveX+t.scaleMoveX,"px ").concat(t.moveY+t.scaleMoveY,"px"),o.getElementsByTagName("span")[0].innerText="X축: ".concat(t.moveX,"px, Y축: ").concat(t.moveY,"px, 비율: ").concat((100*t.scale).toFixed(0),"%"),o.getElementsByTagName("span")[0].style.display="block",o.getElementsByTagName("span")[1].style.display="block")}),o.addEventListener(u,function(){t.drag=!1,o.style.cursor="grab",s(o.getElementsByClassName("grid")[0]).style.display="none"}),document.addEventListener("keydown",function(e){"Shift"!==e.key&&!0!==e.repeat||(g=!0)}),document.addEventListener("keyup",function(e){"Shift"===e.key&&(g=!1)})}function p(e){e.forEach(function(e){var t=0,n=0,o=0,r=0;function i(i){o+=i.clientX-t,r+=i.clientY-n,t=i.clientX,n=i.clientY,e.style.transform="translate(".concat(o,"px, ").concat(r,"px)"),e.style.zIndex="100"}function a(){document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",a)}e.addEventListener("mousedown",function(e){t=e.clientX,n=e.clientY,document.addEventListener("mousemove",i),document.addEventListener("mouseup",a)})})}function d(e,t){var n=!1;e.addEventListener("mousedown",function(e){t.isDrag=!0,t.startX=e.clientX,t.startY=e.clientY}),e.addEventListener("mousemove",function(o){if(o.preventDefault(),t.isDrag){var r=n?0:o.clientX-t.startX,i=o.clientY-t.startY;t.newX+=r,t.newY+=i,t.startX=o.clientX,t.startY=o.clientY,e.style.translate="".concat(t.newX,"px ").concat(t.newY,"px"),e.style.zIndex="10"}}),e.addEventListener("mouseup",function(){t.isDrag=!1}),document.addEventListener("keydown",function(e){"Shift"!==e.key&&!0!==e.repeat||(n=!0)}),document.addEventListener("keyup",function(e){"Shift"===e.key&&(n=!1)})}function g(e,t){var n=s(e),o=s(t);n.addEventListener("change",function(){o.style.color=n.value})}function h(e,t,n,o,r,i){s(e).addEventListener("change",function(e){var a=s(t),p=s(i);c(a,n,o);var d=s(e.target),g=null!=d.files&&d.files[0];if(g){var h=new FileReader;h.readAsDataURL(g),h.onload=function(){var t=new Image;t.src=h.result,a.style.backgroundColor=exports.BGCOLOR,t.onload=function(){n.height=n.width*t.height/t.width,o.startY=t.width>=t.height?0:n.getLongImageStartPositionY(),t.style.left="".concat(o.startX,"px"),t.style.top="".concat(o.startY,"px"),t.id=r,a.appendChild(t),u(a,o,r),f(a,n,o),l(e.target),p.style.marginRight="0"}}}})}function f(e,t,n){e.addEventListener("wheel",function(o){o.preventDefault();var r=o.deltaY>0?.1:-.1;(n.scale+=r,n.scale=Math.max(.1,Math.min(n.scale,3)),n.scale<=.1||n.scale>=3)||(n.scaleMoveX+=t.width*r/2,n.scaleMoveY+=t.height*r/2,n.moveX=0,n.moveY=0,s(e.getElementsByTagName("img")[0]).style.scale=String(n.scale),e.getElementsByTagName("img")[0].style.translate="".concat(n.scaleMoveX,"px ").concat(n.scaleMoveY,"px"),e.getElementsByTagName("span")[0].innerText="X축: ".concat(n.moveX,"px, Y축: ").concat(n.moveY,"px, 비율: ").concat((100*n.scale).toFixed(0),"%"),e.getElementsByTagName("span")[0].style.display="block",e.getElementsByTagName("span")[1].style.display="block")})}function m(e,t){return 0===e?t:t+2*e}function v(e,t,n){t.reset();var o=s(document.getElementById(n));o.style.scale=String(t.scale);var r=o.height>o.width?(o.height-o.width)/-2:0;o.style.translate="0px ".concat(r,"px"),o.style.left="0",o.style.top="0",t.scaleMoveX=0,t.scaleMoveY=r,s(e.previousElementSibling).innerText="X축: ".concat(t.moveX,"px, Y축: ").concat(t.moveY,"px, 비율: ").concat(100*t.scale,"%")}function y(e,t){var n=document.createElement("a");n.href=e.toDataURL("image/jpeg"),n.download="".concat(x(),"_").concat(exports.TYPOURL,".jpg"),n.innerHTML="<p><span>File Name</span>".concat(x(),"_").concat(exports.TYPOURL,".jpg</p>");var o=document.createElement("button");o.innerText="Download",o.className="btn btn-dark",n.appendChild(o),t.appendChild(n)}function x(){var e=new Date,t=e.getFullYear(),n=e.getMonth()<9?"0"+(e.getMonth()+1):e.getMonth()+1,o=e.getDate()<10?"0"+e.getDate():e.getDate();return"".concat(t,"-").concat(n,"-").concat(o)}function b(e){s(e.previousElementSibling).value=""}function Y(e,t){var n;0===(null===(n=t.files)||void 0===n?void 0:n.length)&&(t.previousElementSibling.style.backgroundColor="#ff3333",t.previousElementSibling.style.color="white"),e.forEach(function(e){return _(e)})}function _(e){""==e.value?(e.focus(),e.style.borderColor="red"):e.style.borderColor=exports.PRIMARYCOLOR}function E(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)}exports.MoveText=a,exports.isEmpty=s,exports.imageValueReset=c,exports.changeFileBtn=l,exports.handleMouseDragEvent=u,exports.handleTargetMove=p,exports.handleMoveText=d,exports.changeColor=g,exports.handleChangeImage=h,exports.resizeImage=f,exports.makeDouble=m,exports.resetPosition=v,exports.addDownloadButton=y,exports.getToday=x,exports.inputNullCheck=Y,exports.checkValue=_,exports.isMobile=E;var X=document.querySelectorAll(".item-wrap");function w(e){return(e.width-e.height)/2}function L(e){var t=e.split("-");return t[1]=t[1].replace(/^0+/,""),t[2]=t[2].replace(/^0+/,""),"".concat(t[0],".").concat(t[1],".").concat(t[2])}function M(e,t){e.restore(),e.font="24px S-CoreDream-6Bold",e.letterSpacing="0px",e.textAlign="right",e.fillStyle=t,e.filter="opacity(0.5)",e.fillText("".concat(exports.TYPOURL),980,980)}function T(e,t){e.restore(),e.font="24px S-CoreDream-6Bold",e.letterSpacing="0px",e.textAlign="center",e.fillStyle=t,e.filter="opacity(0.5)",e.fillText("".concat(exports.TYPOURL),500,980)}function O(e,t){e.restore(),e.font="24px S-CoreDream-6Bold",e.letterSpacing="0px",e.textAlign="right",e.fillStyle=t,e.filter="opacity(0.5)",e.fillText("".concat(exports.TYPOURL),980,40)}document.addEventListener("DOMContentLoaded",function(){X.forEach(function(e){e.classList.add("loaded")}),p(n),e.innerText=(new Date).getFullYear().toString()}),o.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),b(e)})}),exports.getLongImageStartPositionY=w,exports.setFormattingDate=L,t.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault();var n=s(document.querySelector(e.hash)).getBoundingClientRect().top;window.scrollBy({top:n-150,left:0,behavior:"smooth"})})}),exports.addWatermarkRightBottom=M,exports.addWatermarkCenterBottom=T,exports.addWatermarkRightTop=O;
},{}],"g5HD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./common"),t=document.querySelectorAll(".btn-lang"),o=document.querySelector(".about-sub-text1"),a=document.querySelector(".about-sub-text2"),n=document.querySelector(".about-sub-text3"),i=document.querySelector(".about-wrap"),r=document.getElementById("textFront"),c={kor:{text:"'Plus Typo'는 단순한 더하기가 아니라, 글자와 이미지의 조화로운 결합을 의미합니다. 글자와 사진을 쉽게 합성하여 인스그램이나 블로그 등 썸네일 이미지를 만들 수 있도록 도와줍니다. 'Plus Typo'로 다양한 가능성과 창의력을 보여주세요.",sub1:'<b>PlusTypo</b> 는 디자이너이자 개발자인 <a href="https://github.com/clowncdi" target="_blank">최대일</a>의 개인 프로젝트입니다.',sub2:"PlusTypo가 더 나아질 수 있도록 여러분이 만든 작품과 피드백을 보내주세요.",sub3:'<a href="mailto:clowncdi85@gmail.com">clowncdi85@gmail.com</a>'},eng:{text:"You can easily combine photos and text to create images for Instagram. Not only that, but you can also create cover images for your blog or create your own thumbnail images. Play around with it, it's that easy!",sub1:'<b>PlusTypo</b> is the work of designer and developer <a href="https://github.com/clowncdi" target="_blank">Daeil Choi</a>.',sub2:"Help me make PlusTypo better.",sub3:'Send your feedback and creations to <a href="mailto:clowncdi85@gmail.com">clowncdi85@gmail.com</a>.'}};function s(e){t.forEach(function(e){return e.classList.remove("active")}),e.classList.add("active"),i.classList.toggle("kor","kor"===e.id),r.classList.add(e.id),r.value=c[e.id].text,o.innerHTML=c[e.id].sub1,a.innerHTML=c[e.id].sub2,n.innerHTML=c[e.id].sub3,"eng"===e.id&&r.classList.remove("kor")}document.addEventListener("DOMContentLoaded",function(){(0,e.isEmpty)(r.parentElement).classList.add("loaded"),r.value=c.eng.text}),t.forEach(function(t){(0,e.isMobile)()&&t.addEventListener("touchstart",function(){return s(t)}),!(0,e.isMobile)()&&t.addEventListener("click",function(){return s(t)})});
},{"./common":"l85W"}]},{},["g5HD"], null)