const fileInput = document.getElementById("fileInput");
const url = document.getElementById("url");
const lowTemp = document.getElementById("lowTemp");
const highTemp = document.getElementById("highTemp");
const icon = document.getElementById("icon");
const dateInput = document.getElementById("dateInput");
const country = document.getElementById("country");
const city = document.getElementById("city");
const submitButton = document.getElementById("submitButton");
const imageContainer = document.getElementById("imageContainer");
const download = document.getElementById("download");
let weatherUrl = '';

// 오늘 날짜를 yyyy-mm-dd 형식으로 반환한다.
function getToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() < 9 ? "0"+(today.getMonth()+1) : today.getMonth()+1;
  const dd = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
  return `${yyyy}-${mm}-${dd}`;
}


// document onload event. dateinput value is set to today's date.
document.addEventListener("DOMContentLoaded", async () => {
  dateInput.value = getToday();
  url.value = "Weaco.co.kr";
  weatherUrl = "/images/sun.svg";
  document.querySelector(".sun").style.fill = "chartreuse";
  city.value = "서울";
  country.value = 'S.Korea, Seoul';
  addClearIcon();
});

// 날씨 아이콘을 선택하면, 선택된 아이콘의 색을 chartreuse로 변경한다.
const icons = document.querySelectorAll(".weather-icon");
icons.forEach(icon => icon.addEventListener("click", (e) => {
  if (e.target.style.fill == "chartreuse") {
    e.target.style.fill = "white";
    weatherUrl = "";
    return;
  }
  if (e.target.tagName == "IMG" || e.target.tagName == "svg") {
    icons.forEach(icon => {
      icon.children[0].style.fill = "white";
    });
    e.target.style.fill = "chartreuse";
    weatherUrl = "/images/"+e.target.className.baseVal+".svg";
  }
}));

// input element에 clear 버튼을 추가한다.
const inputs = document.querySelectorAll("input");
function addClearIcon() {
  inputs.forEach(input => {
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✖";
    deleteButton.className = "clearBtn";
    if (input.id == "fileInput" || input.id == "dateInput") return; // fileInput은 삭제버튼을 추가하지 않는다.
    input.insertAdjacentElement('afterend', deleteButton); // input element에 deleteButton을 추가한다.
    deleteButton.addEventListener("click", () => {
      input.value = "";
    });
  });
}

function checkValue(input) {
  if(input.value == "") {
    input.focus();
    input.style.borderColor = "red"; 
  } else {
    input.style.borderColor = "chartreuse";
  }
}

const container = document.querySelector(".container");
fileInput.addEventListener("change", () => {
  container.style.backgroundImage = "";
  const file = fileInput.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    fileInput.previousElementSibling.style.backgroundColor="chartreuse";
    fileInput.previousElementSibling.style.color="black";
    container.style.backgroundImage = `url(${reader.result})`;
    container.style.backgroundSize = img.height > img.width ? "cover" : "contain";
    fileInput.previousElementSibling.innerText="Change File";
  }
});

submitButton.addEventListener("click", async () => {
  // initialize canvas.
  imageContainer.innerHTML = "";
  download.innerHTML = "";
  // check if fileInput is empty.
  if (!fileInput.files[0]) {
    fileInput.previousElementSibling.style.backgroundColor="red";
    fileInput.previousElementSibling.style.color="white";
  }
  // check if input values are empty.
  inputs.forEach(input => checkValue(input));

  const low = lowTemp.value;
  const high = highTemp.value;
  const file = fileInput.files[0];
  const reader = new FileReader();
  const reader2 = new FileReader();
  const date = dateInput.value.replaceAll('-', '');
  const weatherIcon = await fetch(weatherUrl).then(response => response.blob());
  reader.readAsDataURL(file);
  reader2.readAsDataURL(weatherIcon);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
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
        y = img.height == img.width ? 0 : img.height - ((img.height / 4)*3);
        ctx.drawImage(img, x, y, img.width, img.height-y, 0, 0, 1000, 1000);
      } else {
        // height resize = (width resize * original height size) / original width size
        let canvasHeight = 1000 * img.height / img.width;
        let startY = (1000 - canvasHeight)  / 2;
        ctx.drawImage(img, x, y, img.width, img.height, 0, startY, 1000, canvasHeight);
      }
      
      ctx.font = "50px S-CoreDream-6Bold";
      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "right";
      url && ctx.fillText(url.value, 950, 42+height50);

      // 날씨 아이콘을 추가한다.
      iconImg && ctx.drawImage(iconImg, 50, 160);
      
      ctx.font = "50px S-CoreDream-3Light";
      ctx.textAlign = "left";
      date && ctx.fillText(date.substring(0, 4), 60, 802+height50);
      ctx.textAlign = "right";
      country && ctx.fillText(country.value, 950, 792+height50);
      
      ctx.font = "90px S-CoreDream-3Light";
      ctx.textAlign = "left";
      let delim = 90+Math.round(ctx.measureText(low).width);
      low && high && ctx.fillText('/', delim, 30+height100);
      
      ctx.font = "100px S-CoreDream-6Bold";
      ctx.textAlign = "left";
      low && ctx.fillText(low+'°', 44, 35+height100);
      high && ctx.fillText(high+'°', 40+ctx.measureText(low+"°/").width, 35+height100);
      ctx.letterSpacing = '-1px';
      date && ctx.fillText(date.substring(4), 55, 856+height100);
      ctx.textAlign = "right";
      city && ctx.fillText(city.value, 950, 846+height100);
      
      imageContainer.appendChild(canvas);
      addDownloadButton(canvas);
    };
  };
});

function addDownloadButton(canvas) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  a.download = `${dateInput.value}.jpg`;
  a.innerHTML = `<p><span>File Name</span>${dateInput.value}.jpg</p>`;
  const button = document.createElement("button");
  button.innerText = "다운로드";
  button.className = "btn btn-dark";
  a.appendChild(button);
  download.appendChild(a);
}