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

// document onload event. dateinput value is set to today's date.
document.addEventListener("DOMContentLoaded", async () => {
  const today = new Date();
  dateInput.value = today.toISOString().substring(0, 10);
  // icon.value = '약간 흐림';
  city.value = "서울";
  country.value = 'S.Korea, Seoul';
  lowTemp.value = -1;
  highTemp.value = 8;
  addClearIcon();

  // location is set to the current location.
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     const lat = position.coords.latitude;
  //     const lon = position.coords.longitude;
  //     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=df7f31de88c66695af838929a775e0b8&units=metric&lang=kr`;
  //     fetch(url)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data)
  //         city.value = data.name == "Seoul" || "Kwangmyŏng" ? "서울" : data.name;
  //         country.value = data.sys.country == 'KR' ? 'S.Korea, Seoul' : data.sys.country;
  //         lowTemp.value = data.main.temp_min;
  //         highTemp.value = data.main.temp_max;
  //       });
  //   });
  // }
});

const icons = document.querySelectorAll(".weather-icon");
icons.forEach(icon => icon.addEventListener("click", (e) => {
  if (e.target.tagName == "IMG" || e.target.tagName == "svg") {
    icons.forEach(icon => {
      icon.children[0].style.fill = "white";
    });
    e.target.style.fill = "chartreuse";
    weatherUrl = "/images/"+e.target.className.baseVal+".svg";
  }
}));

// input focus event. when input is focused, the value is set to empty. function is called when input is focused.
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
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    container.style.backgroundImage = `url(${reader.result})`;
  }
});

submitButton.addEventListener("click", async () => {
  // initialize canvas.
  imageContainer.innerHTML = "";
  download.innerHTML = "";
  
  if (!fileInput.files[0]) return alert("이미지를 선택해주세요.");
  if (!weatherUrl) return alert("날씨 아이콘을 선택해주세요.");
  inputs.forEach(input => checkValue(input));

  const low = lowTemp.value;
  const high = highTemp.value;
  const file = fileInput.files[0];
  const reader = new FileReader();
  const reader2 = new FileReader();
  const date = dateInput.value.replaceAll('-', '');
  const weatherIcon = await fetch(weatherUrl).then(response => response.blob())
  reader.readAsDataURL(file);
  reader2.readAsDataURL(weatherIcon);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    const iconImg = new Image();
    iconImg.src = reader2.result;

    img.onload = () => {
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
      ctx.fillText(url.value, 950, 42+height50);

      ctx.drawImage(iconImg, 50, 160);
      
      ctx.font = "50px S-CoreDream-3Light";
      ctx.textAlign = "left";
      ctx.fillText(date.substring(0, 4), 60, 802+height50);
      ctx.textAlign = "right";
      ctx.fillText(country.value, 950, 792+height50);
      
      ctx.font = "90px S-CoreDream-3Light";
      ctx.textAlign = "left";
      let delim = 95+Math.round(ctx.measureText(low).width);
      ctx.fillText('/', delim, 30+height100);
      
      ctx.font = "100px S-CoreDream-6Bold";
      ctx.textAlign = "left";
      ctx.fillText(low+'°', 44, 35+height100);
      ctx.fillText(high+'°', 40+ctx.measureText(low+"°/").width, 35+height100);
      ctx.letterSpacing = '-1px';
      ctx.fillText(date.substring(4), 55, 856+height100);
      ctx.textAlign = "right";
      ctx.fillText(city.value, 950, 846+height100);
      imageContainer.appendChild(canvas);

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${dateInput.value}.png`
      a.innerText = `${dateInput.value}.png`;
      const button = document.createElement("button");
      button.innerText = "다운로드";
      button.className = "btn";
      a.appendChild(button);
      download.appendChild(a);
    };

  };
});


// function imageSize() {
//   // Get the image element
//   const image = document.querySelector('#imgDiv canvas');

//   let startX, startY, startWidth, startHeight;
//   image.addEventListener('mousedown', startDrag);
//   image.addEventListener('touchstart', startDrag);

//   function startDrag(e) {
//     startX = e.clientX || e.touches[0].clientX;
//     startY = e.clientY || e.touches[0].clientY;
//     startWidth = parseInt(document.defaultView.getComputedStyle(image).width, 10);
//     startHeight = parseInt(document.defaultView.getComputedStyle(image).height, 10);
//     window.addEventListener('mousemove', doDrag, false);
//     window.addEventListener('touchmove', doDrag, false);
//     window.addEventListener('mouseup', stopDrag, false);
//     window.addEventListener('touchend', stopDrag, false);
//   }
  
//   function doDrag(e) {
//     image.style.width = (startWidth + ((e.clientX || e.touches[0].clientX) - startX)) + 'px';
//     image.style.height = (startHeight + ((e.clientY || e.touches[0].clientY) - startY)) + 'px';
//   }
  
//   function stopDrag() {
//     window.removeEventListener('mousemove', doDrag, false);
//     window.removeEventListener('touchmove', doDrag, false);
//     window.removeEventListener('mouseup', stopDrag, false);
//     window.removeEventListener('touchend', stopDrag, false);
//   }
// }