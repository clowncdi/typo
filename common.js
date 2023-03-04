const PRIMARYCOLOR = "#0F8EFF";
const TYPOURL = "typo.co.kr";
const LONGIMGDEFAULTY = -100;
const originImg = {
  width: 0,
  height: 0,
};
const editImg = {
  width: 500,
  height: 0,
};
const transEvent = {
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  scale: 1,
  drag: false,
};

function imageValueReset(selected) {
  originImg.width = 0;
  originImg.height = 0;
  editImg.width = 500;
  editImg.height = 0;
  transEvent.startX = 0;
  transEvent.startY = 0;
  transEvent.moveX = 0;
  transEvent.moveY = 0;
  transEvent.scale = 1;
  transEvent.drag = false;
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

  selected.addEventListener("mousedown", (e) => {
    trans.drag = true;
    trans.startX = e.clientX;
    trans.startY = e.clientY;
    selected.style.cursor = "grabbing";
  });

  selected.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (trans.drag) {
      currentX = e.clientX - trans.startX;
      currentY = e.clientY - trans.startY;
      trans.moveX += currentX;
      trans.moveY += currentY;
      chooseImg.style.transform = `translate(${trans.moveX}px, ${trans.moveY}px) scale(${trans.scale})`;
      trans.startX = e.clientX;
      trans.startY = e.clientY;
      selected.firstElementChild.firstElementChild.innerText = `X축: ${trans.moveX}px, Y축: ${trans.moveY}px`;
      selected.firstElementChild.firstElementChild.style.display = "block";
      selected.firstElementChild.children[1].style.display = "block";
    }
  });
  
  selected.addEventListener("mouseup", (e) => {
    trans.drag = false;
    selected.style.cursor = "grab";
  });
}

function resetPosition(resetBtn, trans, choose) {
  trans.moveX = 0;
  trans.moveY = 0;
  trans.scale = 1;
  const chooseImg = document.getElementById(choose);
  chooseImg.style.transform = `translate(${transEvent.moveX}px, ${transEvent.moveY}px) scale(${transEvent.scale})`;
  resetBtn.previousElementSibling.innerText = `X축: ${transEvent.moveX}px, Y축: ${transEvent.moveY}px`;
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