const nav = document.getElementById("nav");
const links = document.querySelectorAll("a[href^='#']");
const moveList = document.querySelectorAll(".move");
const PRIMARYCOLOR = "#0F8EFF";
const BGCOLOR = "#19202c";
const TYPOURL = "typo.co.kr";

class Img {
  _width;
  _height;

  constructor() {
    this._width = 0;
    this._height = 0;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set width(width) {
    this._width = width;
  }

  set height(height) {
    this._height = height;
  }

  getLongImageStartPositionX() {
    return (this._height - this._width) / 2;
  }

  getLongImageStartPositionY() {
    return (this._width - this._height) / 2;
  }

  reset() {
    this._width = 0;
    this._height = 0;
  }
}

class TransEvent {
  _startX;
  _startY;
  _moveX;
  _moveY;
  _scale;
  _scaleMoveX;
  _scaleMoveY;
  _drag;

  constructor() {
    this._startX = 0;
    this._startY = 0;
    this._moveX = 0;
    this._moveY = 0;
    this._scale = 1;
    this._scaleMoveX = 0;
    this._scaleMoveY = 0;
    this._drag = false;
  }

  get startX() {
    return this._startX;
  }

  get startY() {
    return this._startY;
  }

  get moveX() {
    return this._moveX;
  }

  get moveY() {
    return this._moveY;
  }

  get scale() {
    return this._scale;
  }

  get scaleMoveX() {
    return this._scaleMoveX;
  }

  get scaleMoveY() {
    return this._scaleMoveY;
  }

  get drag() {
    return this._drag;
  }

  set startX(startX) {
    this._startX = startX;
  }

  set startY(startY) {
    this._startY = startY;
  }

  set moveX(moveX) {
    this._moveX = moveX;
  }

  set moveY(moveY) {
    this._moveY = moveY;
  }

  set scale(scale) {
    this._scale = scale;
  }

  set scaleMoveX(scaleMoveX) {
    this._scaleMoveX = scaleMoveX;
  }

  set scaleMoveY(scaleMoveY) {
    this._scaleMoveY = scaleMoveY;
  }

  set drag(drag) {
    this._drag = drag;
  }

  reset() {
    this._startX = 0;
    this._startY = 0;
    this._moveX = 0;
    this._moveY = 0;
    this._scale = 1;
    this._scaleMoveX = 0;
    this._scaleMoveY = 0;
    this._drag = false;
  }
}

class MoveText {
  _isDrag;
  _startX;
  _startY;
  _newX;
  _newY;

  constructor() {
    this._isDrag = false;
    this._startX = 0;
    this._startY = 0;
    this._newX = 0;
    this._newY = 0;
  }

  get isDrag() {
    return this._isDrag;
  }

  get startX() {
    return this._startX;
  }

  get startY() {
    return this._startY;
  }

  get newX() {
    return this._newX;
  }

  get newY() {
    return this._newY;
  }

  set isDrag(isDrag) {
    this._isDrag = isDrag;
  }

  set startX(startX) {
    this._startX = startX;
  }

  set startY(startY) {
    this._startY = startY;
  }

  set newX(newX) {
    this._newX = newX;
  }

  set newY(newY) {
    this._newY = newY;
  }

  reset() {
    this._isDrag = false;
    this._startX = 0;
    this._startY = 0;
    this._newX = 0;
    this._newY = 0;
  }
}

function imageValueReset(selected, edit, trans) {
  edit.reset();
  trans.reset();
  edit.width = 500;
  if (selected.getElementsByTagName("img").length > 0) {
    selected.removeChild(selected.getElementsByTagName("img")[0]);
    selected.getElementsByTagName("span")[0].innerText = `X축: 0px, Y축: 0px`;
  } else {
    selected.insertAdjacentHTML(
      "afterBegin",
      '<div class="grid"><i></i><i></i><i></i><i></i></div>'
    );
  }
  selected.style.backgroundColor = "";
}

function changeFileBtn(input) {
  input.previousElementSibling.innerText = "Change";
  input.previousElementSibling.style.position = "absolute";
  input.previousElementSibling.style.left = "0";
  input.previousElementSibling.style.bottom = "-60px";
  input.parentElement.style.zIndex = "0";
}

// 이미지 실시간 드래그로 위치 조정
function handleMouseDragEvent(selected, trans, choose) {
  const chooseImg = document.getElementById(choose);
  let currentX = 0;
  let currentY = 0;
  let mousedown = isMobile() ? "touchstart" : "mousedown";
  let mousemove = isMobile() ? "touchmove" : "mousemove";
  let mouseup = isMobile() ? "touchend" : "mouseup";
  let clientX = 0;
  let clientY = 0;
  let isMoveX = false;

  selected.addEventListener(mousedown, (e) => {
    trans.drag = true;
    trans.startX = isMobile() ? e.touches[0].clientX : e.clientX;
    trans.startY = isMobile() ? e.touches[0].clientY : e.clientY;
    selected.style.cursor = "grabbing";
    selected.getElementsByClassName("grid")[0].style.display = "block";
  });

  selected.addEventListener(mousemove, (e) => {
    e.preventDefault();
    clientX = isMobile() ? e.touches[0].clientX : e.clientX;
    clientY = isMobile() ? e.touches[0].clientY : e.clientY;
    if (trans.drag) {
      currentX = isMoveX ? 0 : clientX - trans.startX;
      currentY = clientY - trans.startY;
      trans.moveX += currentX;
      trans.moveY += currentY;
      trans.startX = clientX;
      trans.startY = clientY;
      chooseImg.style.scale = trans.scale;
      chooseImg.style.translate = `${trans.moveX + trans.scaleMoveX}px ${
        trans.moveY + trans.scaleMoveY
      }px`;
      selected.getElementsByTagName("span")[0].innerText = `X축: ${
        trans.moveX
      }px, Y축: ${trans.moveY}px, 비율: ${parseInt(trans.scale * 100)}%`;
      selected.getElementsByTagName("span")[0].style.display = "block";
      selected.getElementsByTagName("span")[1].style.display = "block";
    }
  });

  selected.addEventListener(mouseup, (e) => {
    trans.drag = false;
    selected.style.cursor = "grab";
    selected.getElementsByClassName("grid")[0].style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Shift" || e.repeat === true) {
      isMoveX = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      isMoveX = false;
    }
  });
}

function handleTargetMove(moveList) {
  moveList.forEach((move) => {
    let x = 0;
    let y = 0;
    let moveX = 0;
    let moveY = 0;
    function onDrag(e) {
      console.log("onDrag", e.clientX - x, e.clientY - y);
      moveX += e.clientX - x;
      moveY += e.clientY - y;
      x = e.clientX;
      y = e.clientY;
      move.style.transform = `translate(${moveX}px, ${moveY}px)`;
      move.style.zIndex = "100";
    }

    function onLetGo(e) {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onLetGo);
    }

    function onGrab(e) {
      x = e.clientX;
      y = e.clientY;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onLetGo);
    }

    move.addEventListener("mousedown", onGrab);
  });
}

function handleMoveText(app, moveText) {
  let isMoveX = false;

  app.addEventListener("mousedown", (e) => {
    moveText.isDrag = true;
    moveText.startX = e.clientX; // 시작 위치
    moveText.startY = e.clientY;
  });

  app.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (moveText.isDrag) {
      let moveX = isMoveX ? 0 : e.clientX - moveText.startX;
      let moveY = e.clientY - moveText.startY;
      moveText.newX += moveX; // 이동 거리 누적
      moveText.newY += moveY;
      moveText.startX = e.clientX; // 시작 위치 갱신
      moveText.startY = e.clientY;
      app.style.translate = `${moveText.newX}px ${moveText.newY}px`;
      app.style.zIndex = "10";
    }
  });

  app.addEventListener("mouseup", (e) => {
    moveText.isDrag = false;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Shift" || e.repeat === true) {
      isMoveX = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      isMoveX = false;
    }
  });
}

function changeColor(color, target) {
  color.addEventListener("change", () => {
    target.style.color = color.value;
  });
}

function handleChangeImage(
  choose,
  selected,
  edit,
  trans,
  chooseImg,
  submitBtn
) {
  choose.addEventListener("change", (e) => {
    // initialize
    imageValueReset(selected, edit, trans);

    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      selected.style.backgroundColor = BGCOLOR;

      img.onload = () => {
        edit.height = (edit.width * img.height) / img.width; // 이미지 비율 유지
        trans.startY =
          img.width >= img.height ? 0 : edit.getLongImageStartPositionY(); // 이미지 세로일 경우 센터 정렬
        img.style.left = `${trans.startX}px`;
        img.style.top = `${trans.startY}px`;
        img.id = chooseImg;
        selected.appendChild(img);

        handleMouseDragEvent(selected, trans, chooseImg); // 이미지 실시간 드래그로 위치 조정
        resizeImage(selected, edit, trans); // 이미지 리사이즈

        changeFileBtn(e.target); // 파일버튼 위치 변경
        submitBtn.style.marginRight = 0;
      };
    };
  });
}

function resizeImage(imgApp, edit, trans) {
  imgApp.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.1 : -0.1;
    trans.scale += delta;
    trans.scale = Math.max(0.1, Math.min(trans.scale, 3));
    if (trans.scale <= 0.1 || trans.scale >= 3) return;
    trans.scaleMoveX += (edit.width * delta) / 2;
    trans.scaleMoveY += (edit.height * delta) / 2;
    trans.moveX = 0;
    trans.moveY = 0;
    imgApp.getElementsByTagName("img")[0].style.scale = trans.scale;
    imgApp.getElementsByTagName(
      "img"
    )[0].style.translate = `${trans.scaleMoveX}px ${trans.scaleMoveY}px`;
    imgApp.getElementsByTagName("span")[0].innerText = `X축: ${
      trans.moveX
    }px, Y축: ${trans.moveY}px, 비율: ${parseInt(trans.scale * 100)}%`;
    imgApp.getElementsByTagName("span")[0].style.display = "block";
    imgApp.getElementsByTagName("span")[1].style.display = "block";
  });
}

function makeDouble(value, origin) {
  return value === 0 ? origin : origin + value * 2;
}

function resetPosition(resetBtn, trans, choose) {
  trans.reset();
  const chooseImg = document.getElementById(choose);
  chooseImg.style.scale = trans.scale;
  const y =
    chooseImg.height > chooseImg.width
      ? (chooseImg.height - chooseImg.width) / -2
      : 0;
  chooseImg.style.translate = `0px ${y}px`;
  chooseImg.style.left = 0;
  chooseImg.style.top = 0;
  trans.scaleMoveX = 0;
  trans.scaleMoveY = y;
  resetBtn.previousElementSibling.innerText = `X축: ${trans.moveX}px, Y축: ${
    trans.moveY
  }px, 비율: ${parseInt(trans.scale * 100)}%`;
}

function addDownloadButton(canvas, download) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  a.download = `${getToday()}_${TYPOURL}.jpg`;
  a.innerHTML = `<p><span>File Name</span>${getToday()}_${TYPOURL}.jpg</p>`;
  const button = document.createElement("button");
  button.innerText = "Download";
  button.className = "btn btn-dark";
  a.appendChild(button);
  download.appendChild(a);
}

function downloadCountGA(app, name) {
  gtag("event", `${app}_download`, {
    app_name: name,
    event_date: new Date().toLocaleString(),
  });
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

function clearInput(btn) {
  btn.previousElementSibling.value = "";
}

// input null check
function inputNullCheck(inputList, inputFile) {
  if (!inputFile.files[0]) {
    inputFile.previousElementSibling.style.backgroundColor = "red";
    inputFile.previousElementSibling.style.color = "white";
  }
  inputList.forEach((input) => checkValue(input));
}

function checkValue(input) {
  if (input.value == "") {
    input.focus();
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = PRIMARYCOLOR;
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
}

const items = document.querySelectorAll(".item-wrap");
document.addEventListener("DOMContentLoaded", () => {
  items.forEach((item) => {
    item.classList.add("loaded");
  });
  handleTargetMove(moveList);
});

function getLongImageStartPositionY(edit) {
  return (edit.width - edit.height) / 2;
}

function setFormattingDate(value) {
  let date = value.split("-");
  date[1] = date[1].replace(/^0+/, "");
  date[2] = date[2].replace(/^0+/, "");
  return `${date[0]}.${date[1]}.${date[2]}`;
}

// nav bar scroll event
document.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    nav.classList.add("show");
  } else {
    nav.classList.remove("show");
  }
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let target = document.querySelector(link.hash);
    let targetPosition = target.getBoundingClientRect().top;

    window.scrollBy({
      top: targetPosition - 150,
      left: 0,
      behavior: "smooth",
    });
  });
});

// watermark
function addWatermarkRightBottom(ctx, color) {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "right";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(`${TYPOURL}`, 980, 980);
}

function addWatermarkCenterBottom(ctx, color) {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(`${TYPOURL}`, 500, 980);
}

function addWatermarkRightTop(ctx, color) {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "right";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(`${TYPOURL}`, 980, 40);
}
