const PRIMARYCOLOR = "#0F8EFF";
const BGCOLOR = "#19202c";
const TYPOURL = "typo.co.kr";
class Img {
  width;
  height;

  constructor() {
    this.width = 0;
    this.height = 0;
  }

  get width() {
    return this.width;
  }

  get height() {
    return this.height;
  }

  set width(width) {
    this.width = width;
  }

  set height(height) {
    this.height = height;
  }

  getLongImageStartPositionY() {
    return (this.width - this.height) / 2;
  }
}

class TransEvent {
  startX;
  startY;
  moveX;
  moveY;
  scale;
  drag;

  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.scale = 1;
    this.drag = false;
  }

  get startX() {
    return this.startX;
  }

  get startY() {
    return this.startY;
  }

  get moveX() {
    return this.moveX;
  }

  get moveY() {
    return this.moveY;
  }

  get scale() {
    return this.scale;
  }

  get drag() {
    return this.drag;
  }

  set startX(startX) {
    this.startX = startX;
  }

  set startY(startY) {
    this.startY = startY;
  }

  set moveX(moveX) {
    this.moveX = moveX;
  }

  set moveY(moveY) {
    this.moveY = moveY;
  }

  set scale(scale) {
    this.scale = scale;
  }

  set drag(drag) {
    this.drag = drag;
  }

  reset() {
    this.startX = 0;
    this.startY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.scale = 1;
    this.drag = false;
  }
}

let mobile = false;

function imageValueReset(selected, edit) {
  edit.width = 500;
  if (selected.childNodes.length > 3) {
    selected.removeChild(selected.childNodes[3]);
  }
  selected.style.backgroundColor = "";
}

function changeFileBtn(input) {
  input.previousElementSibling.innerText = "↻ Change File";
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
  let mousedown = mobile ? "touchstart" : "mousedown";
  let mousemove = mobile ? "touchmove" : "mousemove";
  let mouseup = mobile ? "touchend" : "mouseup";
  let clientX = 0;
  let clientY = 0;

  selected.addEventListener(mousedown, (e) => {
    trans.drag = true;
    trans.startX = mobile ? e.touches[0].clientX : e.clientX;
    trans.startY = mobile ? e.touches[0].clientY : e.clientY;
    selected.style.cursor = "grabbing";
  });

  selected.addEventListener(mousemove, (e) => {
    e.preventDefault();
    clientX = mobile ? e.touches[0].clientX : e.clientX;
    clientY = mobile ? e.touches[0].clientY : e.clientY;
    if (trans.drag) {
      currentX = clientX - trans.startX;
      currentY = clientY - trans.startY;
      trans.moveX += currentX;
      trans.moveY += currentY;
      chooseImg.style.transform = `translate(${trans.moveX}px, ${trans.moveY}px) scale(${trans.scale})`;
      trans.startX = clientX;
      trans.startY = clientY;
      selected.firstElementChild.firstElementChild.innerText = `X축: ${trans.moveX}px, Y축: ${trans.moveY}px`;
      selected.firstElementChild.firstElementChild.style.display = "block";
      selected.firstElementChild.children[1].style.display = "block";
    }
  });

  selected.addEventListener(mouseup, (e) => {
    trans.drag = false;
    selected.style.cursor = "grab";
  });
}

function resetPosition(resetBtn, trans, choose) {
  trans.reset();
  const chooseImg = document.getElementById(choose);
  chooseImg.style.transform = `translate(${trans.moveX}px, ${trans.moveY}px) scale(${trans.scale})`;
  resetBtn.previousElementSibling.innerText = `X축: ${trans.moveX}px, Y축: ${trans.moveY}px`;
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
  mobile = isMobile();
  items.forEach((item) => {
    item.classList.add("loaded");
  });
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