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

// 페이지 초기값 설정
document.addEventListener("DOMContentLoaded", async () => {
  dateInput.value = getToday();
  url.value = "Weaco.co.kr";
  weatherUrl = "/images/sun.svg";
  icons.item(0).firstElementChild.style.fill = PRIMARYCOLOR;
  city.value = "서울";
  country.value = "S.Korea, Seoul";
});

// 이미지 파일 변경 시 초기화


fileInput.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImage, originImg, editImg, transEvent);

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImage.style.backgroundColor = "#19202c";

    img.onload = () => {
      originImg.width = img.width;
      originImg.height = img.height;
      editImg.height = (editImg.width * img.height) / img.width;
      transEvent.startY = img.width >= img.height ? 0 : LONGIMGDEFAULTY;

      img.style.left = `${transEvent.startX}px`;
      img.style.top = `${transEvent.startY}px`;
      img.id = "chooseImg";
      selectedImage.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImage, transEvent, "chooseImg");
      changeFileBtn(e.target);

      submitBtn.style.marginRight = 0;
    };
  };
});

// 날씨 아이콘을 선택하면, 선택된 아이콘의 색을 chartreuse로 변경한다.
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.style.fill === PRIMARYCOLOR || e.target.style.fill === "rgb(15, 142, 255)") {
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

submitBtn.addEventListener("click", async () => {
  // initialize canvas.
  imageContainer.innerHTML = "";
  imageContainer.nextElementSibling.innerHTML = "";
  inputNullCheck(inputs, fileInput);

  const low = lowTemp.value;
  const high = highTemp.value;
  const file = fileInput.files[0];
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
      ctx.fillStyle = "#19202C";
      ctx.fillRect(0, 0, 1000, 1000);
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent.moveX * ratio * -1;
        let originY = transEvent.moveY * ratio * -1;
        
        x = transEvent.moveX;
        y = transEvent.moveY + (LONGIMGDEFAULTY*2);
        ctx.drawImage(
          img, 
          originX,
          originY, 
          img.width, 
          img.height, 
          x, 
          y, 
          canvasWidth, 
          canvasHeight
        );
      } else {
        // original width : original height = width resize : height resize
        // height resize = (width resize * original height) / original width
        let canvasHeight = (1000 * img.height) / img.width;
        let startY = img.width === img.height ? 0 : (1000 - canvasHeight) / 2;
        ctx.drawImage(
          img,
          x,
          y,
          img.width,
          img.height,
          transEvent.moveX * 2,
          transEvent.moveY * 2 + startY,
          1000 * transEvent.scale,
          canvasHeight * transEvent.scale
        );
      }

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

      ctx.font = "24px S-CoreDream-6Bold";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      // ctx.globalCompositeOperation = "overlay";
      ctx.fillText(`${TYPOURL}`, 500, 980);

      imageContainer.appendChild(canvas);
      addDownloadButton(canvas, imageContainer.nextElementSibling);
    };
  };
});


// let scaleMoveX = 0;
// let scaleMoveY = 0;
// selectedImage.addEventListener("wheel", (e) => {
//   const delta = e.deltaY > 0 ? 0.1 : -0.1;
//   console.log('delta: ', delta)
//   transEvent.scale += delta;
//   scaleMoveX += (editImg.width * delta) / 2;
//   scaleMoveY += (editImg.height * delta) / 2;
//   console.log('transEvent.scale: ', transEvent.scale)
//   console.log('scaleMoveX: ', scaleMoveX, ' scaleMoveY: ',scaleMoveY)
//   transEvent.scale = Math.max(0.1, Math.min(transEvent.scale, 3));
//   console.log('transEvent: ', transEvent);
//   selectedImage.firstChild.style.top = scaleMoveY;
//   selectedImage.firstChild.style.left = scaleMoveX;
//   selectedImage.firstChild.style.transform = `scale(${transEvent.scale})`;
//   console.log('left: ',selectedImage.firstChild.getBoundingClientRect().left, 'top: ', selectedImage.firstChild.getBoundingClientRect().top);
// });