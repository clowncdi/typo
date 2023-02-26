const fileInput = document.getElementById("fileInput");
const url = document.getElementById("url");
const lowTemp = document.getElementById("lowTemp");
const highTemp = document.getElementById("highTemp");
const icon = document.getElementById("icon");
const dateInput = document.getElementById("dateInput");
const country = document.getElementById("country");
const city = document.getElementById("city");
const selectedImage = document.getElementById("selectedImage");
const selectedImagePosition = document.getElementById("selectedImagePosition");
const selectedImagePositionReset = document.getElementById("selectedImagePositionReset");
const submitBtn = document.getElementById("submitBtn");
const imageContainer = document.getElementById("imageContainer");
const download = document.getElementById("download");
const icons = document.querySelectorAll(".weather-icon");
const inputs = document.querySelectorAll("input");
const container = document.querySelector(".container");
const typo = "typo.co.kr";
const longImgDefaultY = -100;
let originImg = {
  width: 0,
  height: 0,
};
let editImg = {
  width: 500,
  height: 0,
};
let transEvent = {
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  scale: 1,
  drag: false,
};
let weatherUrl = "";

// 페이지 초기값 설정
document.addEventListener("DOMContentLoaded", async () => {
  dateInput.value = getToday();
  url.value = "Weaco.co.kr";
  weatherUrl = "/images/sun.svg";
  document.querySelector(".sun").style.fill = "chartreuse";
  city.value = "서울";
  country.value = "S.Korea, Seoul";
  addClearIcon();
});

// 이미지 파일 변경 시 초기화
function imageValueReset() {
  originImg = {
    width: 0,
    height: 0,
  };
  editImg = {
    width: 500,
    height: 0,
  };
  transEvent = {
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    scale: 1,
    drag: false,
  };
  selectedImage.style.backgroundColor = "";
}

fileInput.addEventListener("change", () => {
  // initialize
  imageValueReset();

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    fileInput.previousElementSibling.style.backgroundColor = "chartreuse";
    fileInput.previousElementSibling.style.color = "black";
    selectedImage.style.backgroundColor = "#19202c";

    img.onload = () => {
      originImg.width = img.width;
      originImg.height = img.height;
      editImg.height = (editImg.width * img.height) / img.width;
      transEvent.startY = img.width > img.height ? 0 : longImgDefaultY;

      img.style.left = `${transEvent.startX}px`;
      img.style.top = `${transEvent.startY}px`;
      img.id = "chooseImg";
      selectedImage.appendChild(img);

      fileInput.previousElementSibling.innerText = "↻ Change File";
      fileInput.previousElementSibling.style.position = "absolute";
      fileInput.previousElementSibling.style.bottom = "-67px";
      fileInput.parentElement.style.zIndex = "0";

      submitBtn.style.marginRight = 0;
    };
  };
});


function resetPosition() {
  transEvent.moveX = 0;
  transEvent.moveY = 0;
  transEvent.scale = 1;
  const chooseImg = document.getElementById("chooseImg");
  chooseImg.style.transform = `translate(${transEvent.moveX}px, ${transEvent.moveY}px) scale(${transEvent.scale})`;
  selectedImagePosition.innerText = `X축: ${transEvent.moveX}px, Y축: ${transEvent.moveY}px`;
}

// 이미지 실시간 드래그로 위치 조정
selectedImage.addEventListener("mousedown", (e) => {
  transEvent.drag = true;
  transEvent.startX = e.clientX;
  transEvent.startY = e.clientY;
  selectedImage.style.cursor = "grabbing";
});

selectedImage.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (transEvent.drag) {
    const chooseImg = document.getElementById("chooseImg");
    let currentX = e.clientX - transEvent.startX;
    let currentY = e.clientY - transEvent.startY;
    transEvent.moveX += currentX;
    transEvent.moveY += currentY;
    chooseImg.style.transform = `translate(${transEvent.moveX}px, ${transEvent.moveY}px) scale(${transEvent.scale})`;
    transEvent.startX = e.clientX;
    transEvent.startY = e.clientY;
    selectedImagePosition.innerText = `X축: ${transEvent.moveX}px, Y축: ${transEvent.moveY}px`;
    selectedImagePosition.style.display = "block";
    selectedImagePositionReset.style.display = "block";
  }
});

selectedImage.addEventListener("mouseup", (e) => {
  transEvent.drag = false;
  selectedImage.style.cursor = "grab";
});

// 날씨 아이콘을 선택하면, 선택된 아이콘의 색을 chartreuse로 변경한다.
icons.forEach((icon) =>
  icon.addEventListener("click", (e) => {
    if (e.target.style.fill == "chartreuse") {
      e.target.style.fill = "white";
      weatherUrl = "";
      return;
    }
    if (e.target.tagName == "IMG" || e.target.tagName == "svg") {
      icons.forEach((icon) => {
        icon.children[0].style.fill = "white";
      });
      e.target.style.fill = "chartreuse";
      weatherUrl = "/images/" + e.target.className.baseVal + ".svg";
    }
  })
);

submitBtn.addEventListener("click", async () => {
  // initialize canvas.
  imageContainer.innerHTML = "";
  download.innerHTML = "";
  inputNullCheck();

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
      let longImg = img.width <= img.height;
      let x = 0;
      let y = 0;
      if (longImg) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent.moveX * ratio * -1;
        let originY = transEvent.moveY * ratio * -1;
        
        x = transEvent.moveX;
        y = transEvent.moveY + (longImgDefaultY*2);
        console.log('img: ', img.width, img.height, ' canvasImg: ', canvasWidth,canvasHeight)
        // console.log('ratio: ', ratio, ' editY: ', editY, ' originY: ', originY, ' canvasY: ', canvasY, ' canvasWidth: ', canvasWidth, ' canvasHeight: ', canvasHeight)
        console.log('transEvent: ', transEvent);
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
        console.log('originX: ', originX, 'x: ', x, ' originY: ', originY, 'y: ', y)
        console.log('-------------------------------')
      } else {
        // original width : original height = width resize : height resize
        // height resize = (width resize * original height) / original width
        let canvasHeight = (1000 * img.height) / img.width;
        console.log('img: ', img.width, img.height, ' canvasImg: ', 1000, canvasHeight)
        console.log('transEvent: ', transEvent);
        let startY = (1000 - canvasHeight) / 2
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
      ctx.font = "24px S-CoreDream-6Bold";
      ctx.textAlign = "center";
      ctx.fillText(`${typo}`, 500, 980);

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

      imageContainer.appendChild(canvas);
      addDownloadButton(canvas);
    };
  };
});

function addDownloadButton(canvas) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  a.download = `${dateInput.value}_${typo}.jpg`;
  a.innerHTML = `<p><span>File Name</span>${dateInput.value}_${typo}.jpg</p>`;
  const button = document.createElement("button");
  button.innerText = "Download";
  button.className = "btn btn-dark";
  a.appendChild(button);
  download.appendChild(a);
}

// 오늘 날짜를 yyyy-mm-dd 형식으로 반환하는 함수
function getToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const dd = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  return `${yyyy}-${mm}-${dd}`;
}

// input 요소에 clear 버튼을 추가한다.
function addClearIcon() {
  inputs.forEach((input) => {
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✖";
    deleteButton.className = "clearBtn";
    if (input.id == "fileInput" || input.id == "dateInput") return; // fileInput은 삭제버튼을 추가하지 않는다.
    input.insertAdjacentElement("afterend", deleteButton); // input element에 deleteButton을 추가한다.
    deleteButton.addEventListener("click", () => {
      input.value = "";
    });
  });
}

// input null check
function inputNullCheck() {
  if (!fileInput.files[0]) {
    fileInput.previousElementSibling.style.backgroundColor = "red";
    fileInput.previousElementSibling.style.color = "white";
  }
  inputs.forEach((input) => checkValue(input));
}

function checkValue(input) {
  if (input.value == "") {
    input.focus();
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = "chartreuse";
  }
}

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