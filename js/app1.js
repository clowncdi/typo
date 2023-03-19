const editImg = new Img();
const transEvent = new TransEvent();
const fileInput = document.getElementById("fileInput");
const url = document.getElementById("url");
const lowTemp = document.getElementById("lowTemp");
const highTemp = document.getElementById("highTemp");
const icon = document.getElementById("icon");
const dateInput = document.getElementById("dateInput");
const country = document.getElementById("country");
const city = document.getElementById("city");
const selectedImage = document.getElementById("selectedImage");
const submitBtn = document.getElementById("submitBtn");
const imageContainer = document.getElementById("imageContainer");
const download = document.getElementById("download");
const icons = document.querySelectorAll(".weather-icon");
const inputs = document.querySelectorAll("#app1 input");
let weatherUrl = "";
const chooseImg = "chooseImg";

handleChangeImage(fileInput, selectedImage, editImg, transEvent, chooseImg, submitBtn);

// 페이지 초기값 설정
document.addEventListener("DOMContentLoaded", async () => {
  dateInput.value = getToday();
  url.value = "Weaco.co.kr";
  weatherUrl = "/images/sun.svg";
  icons.item(0).firstElementChild.style.fill = PRIMARYCOLOR;
  city.value = "서울";
  country.value = "S.Korea, Seoul";
});

// 날씨 아이콘을 선택하면, 선택된 아이콘의 색을 chartreuse로 변경한다.
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (
      e.target.style.fill === PRIMARYCOLOR ||
      e.target.style.fill === "rgb(15, 142, 255)"
    ) {
      e.target.style.fill = "white";
      weatherUrl = "";
      return;
    }
    if (e.target.tagName == "IMG" || e.target.tagName == "svg") {
      icons.forEach((icon) => {
        icon.children[0].style.fill = "white";
      });
      e.target.style.fill = PRIMARYCOLOR;
      weatherUrl = "/images/" + e.target.className.baseVal + ".svg";
    }
  });
});

isMobile() && submitBtn.addEventListener("touchstart", makeImageApp1);
!isMobile() && submitBtn.addEventListener("click", makeImageApp1);

async function makeImageApp1() {
  gtag('event', 'app1_create', {
    'app_name': 'Today Weather',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainer.innerHTML = "";
  imageContainer.nextElementSibling.innerHTML = "";
  inputNullCheck(inputs, fileInput);

  const file = fileInput.files[0];
  if (file) {
    imageContainer.parentElement.parentElement.style.display = "block";
  }
  const low = lowTemp.value;
  const high = highTemp.value;
  const date = dateInput.value.replaceAll("-", "");

  const reader = new FileReader();
  const reader2 = new FileReader();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const weatherIcon = await fetch(weatherUrl).then((response) =>
    response.blob()
  );

  reader.readAsDataURL(file);
  reader2.readAsDataURL(weatherIcon);

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    const iconImg = new Image();
    iconImg.src = reader2.result;

    img.onload = async () => {
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

      // 날씨 아이콘을 추가한다.
      weatherUrl !== "" && ctx.drawImage(iconImg, 50, 160);

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

      addWatermarkCenterBottom(ctx, 'white');
      imageContainer.appendChild(canvas);
      addDownloadButton(canvas, imageContainer.nextElementSibling);
    };
  };
}