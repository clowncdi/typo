// 클래스
import { Img } from './classes/Img';
import { TransEvent } from './classes/TransEvent';
// 상수
import { BGCOLOR, PRIMARYCOLOR } from './core/constants';
// 유틸리티
import { getToday, isEmpty, isMobile, addDownloadButton, addWatermarkCenterBottom } from './core/utils';
// 핸들러
import { handleChangeImage, resetPosition, inputNullCheck } from './handlers/imageHandler';

const editImg: Img = new Img();
const transEvent: TransEvent = new TransEvent();
const nav = document.getElementById("nav") as HTMLElement;
const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const url = document.getElementById("url") as HTMLInputElement;
const lowTemp = document.getElementById("lowTemp") as HTMLInputElement;
const highTemp = document.getElementById("highTemp") as HTMLInputElement;
const dateInput = document.getElementById("dateInput") as HTMLInputElement;
const country = document.getElementById("country") as HTMLInputElement;
const city = document.getElementById("city") as HTMLInputElement;
const selectedImage = document.getElementById("selectedImage") as HTMLImageElement;
const submitBtn = document.getElementById("submitBtn") as HTMLElement;
const imageContainer = document.getElementById("imageContainer") as HTMLElement;
const icons = document.querySelectorAll(".weather-icon") as NodeListOf<HTMLElement>;
const inputs = document.querySelectorAll("#app1 input") as NodeListOf<HTMLInputElement>;
const reset = document.querySelector('#app1 .selected-image-position-reset') as HTMLElement;
let weatherUrl: string = "";
const chooseImg: string = "chooseImg";

handleChangeImage(
  fileInput,
  selectedImage,
  editImg,
  transEvent,
  chooseImg,
  submitBtn
);

reset.addEventListener('click', (e) =>
    resetPosition(isEmpty(e.target as HTMLElement), transEvent, chooseImg));

// 페이지 초기값 설정
document.addEventListener("DOMContentLoaded", () => {
  dateInput.value = getToday();
  url.value = "Weaco.co.kr";
  city.value = "서울";
  country.value = "S.Korea, Seoul";
  const icon = icons.item(0).children[0] as HTMLImageElement;
  icon.classList.add('active');
  weatherUrl = icon.src.slice(icon.src.lastIndexOf('/'));
});

// 날씨 아이콘을 선택하면, 선택된 아이콘의 색을 chartreuse로 변경한다.
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    const target = isEmpty(e.target as HTMLImageElement);
    if (target.classList.contains('active')) {
      target.classList.remove('active');
      weatherUrl = "";
      return;
    }
    if (target.tagName === "IMG" || target.tagName === "svg") {
      icons.forEach((icon) => {
        icon.children[0].classList.remove('active');
      });
      target.classList.add('active');
      weatherUrl = target.src.slice(target.src.lastIndexOf('/'));
    }
  });
});

isMobile() && submitBtn.addEventListener("touchstart", makeImageApp1);
!isMobile() && submitBtn.addEventListener("click", makeImageApp1);

async function makeImageApp1(evt?: Event): Promise<void> {
  evt?.stopPropagation();
  // initialize canvas.
  imageContainer.innerHTML = "";
  isEmpty(imageContainer.nextElementSibling).innerHTML = "";
  inputNullCheck(inputs, fileInput);

  const files = fileInput.files;
  if (!files || files.length === 0) {
    return;
  }
  const file = files[0];

  const parentEl = imageContainer.parentElement?.parentElement;
  if (parentEl) {
    parentEl.style.display = "block";
  }

  const low = lowTemp.value;
  const high = highTemp.value;
  const date = dateInput.value.replaceAll("-", "");

  const reader = new FileReader();
  const reader2 = new FileReader();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Canvas 2D 컨텍스트를 가져올 수 없습니다.");
    return;
  }

  let weatherIcon: Blob;
  try {
    const response = await fetch(weatherUrl);
    weatherIcon = await response.blob();
  } catch (error) {
    console.error("날씨 아이콘을 가져올 수 없습니다:", error);
    return;
  }

  reader.onerror = () => {
    console.error("파일 읽기 실패:", reader.error);
    alert("파일을 읽을 수 없습니다.");
  };

  reader2.onerror = () => {
    console.error("아이콘 파일 읽기 실패:", reader2.error);
  };

  reader.readAsDataURL(file);
  reader2.readAsDataURL(weatherIcon);

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result as string;
    const iconImg = new Image();
    iconImg.src = reader2.result as string;

    img.onerror = () => {
      console.error("이미지 로드 실패");
      alert("이미지를 불러올 수 없습니다.");
    };

    img.onload = () => {
      const height50 = 48;
      const height100 = 97;
      canvas.width = 1000;
      canvas.height = 1000;
      ctx.fillStyle = BGCOLOR;
      ctx.fillRect(0, 0, 1000, 1000);
      let canvasWidth = 1000 * transEvent.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent.moveX * 2;
      let y = transEvent.moveY * 2 + editImg.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.font = "50px S-CoreDream-6Bold";
      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "right";
      url && ctx.fillText(url.value, 950, 42 + height50);

      // insert weather icon
      ctx.filter = "opacity(1)";
      ctx.drawImage(iconImg, 50, 160);

      ctx.font = "50px S-CoreDream-3Light";
      ctx.textAlign = "left";
      date && ctx.fillText(date.substring(0, 4), 60, 802 + height50);
      ctx.textAlign = "right";
      country && ctx.fillText(country.value, 950, 792 + height50);

      ctx.font = "90px S-CoreDream-3Light";
      ctx.textAlign = "left";
      let delim = 90 + Math.round(ctx.measureText(low).width);
      low && high && ctx.fillText("/", delim, 30 + height100);

      ctx.font = "100px S-CoreDream-6Bold";
      ctx.textAlign = "left";
      low && ctx.fillText(low + "°", 44, 35 + height100);
      high &&
        ctx.fillText(
          high + "°",
          40 + ctx.measureText(low + "°/").width,
          35 + height100
        );
      ctx.letterSpacing = "-1px";
      date && ctx.fillText(date.substring(4), 55, 856 + height100);
      ctx.textAlign = "right";
      city && ctx.fillText(city.value, 950, 846 + height100);

      addWatermarkCenterBottom(ctx, "white");
      imageContainer.appendChild(canvas);
      addDownloadButton(canvas, imageContainer.nextElementSibling as HTMLElement);
    };
  };
}

// nav bar scroll event
document.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    nav.classList.add("show");
  } else {
    nav.classList.remove("show");
  }
});