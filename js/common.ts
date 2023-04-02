const nav: HTMLElement | null = document.getElementById("nav");
const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a[href^='#']");
const moveList: NodeListOf<HTMLElement> = document.querySelectorAll(".move");
export const PRIMARYCOLOR: string = "#0F8EFF";
export const BGCOLOR: string = "#19202c";
export const TYPOURL: string = "typo.co.kr";

export class Img {
  private _width: number;
  private _height: number;

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

export class TransEvent {
  private _startX: number;
  private _startY: number;
  private _moveX: number;
  private _moveY: number;
  private _scale: number;
  private _scaleMoveX: number;
  private _scaleMoveY: number;
  private _drag: boolean;

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

export class MoveText {
  private _isDrag: boolean;
  private _startX: number;
  private _startY: number;
  private _newX: number;
  private _newY: number;

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

export function isEmpty<T>(el: T | null | undefined): T {
  if (el) {
    return el;
  } else {
    throw new Error("Element is null");
  }
}

export function imageValueReset(container: HTMLElement, edit: Img, trans: TransEvent): void {
  edit.reset();
  trans.reset();
  edit.width = 500;
  if (container.getElementsByTagName("img").length > 0) {
    container.removeChild(container.getElementsByTagName("img")[0]);
    container.getElementsByTagName("span")[0].innerText = `X축: 0px, Y축: 0px`;
  } else {
    container.insertAdjacentHTML(
      "afterbegin",
      '<div class="grid"><i></i><i></i><i></i><i></i></div>'
    );
  }
  container.style.backgroundColor = "";
}

export function changeFileBtn(target: HTMLElement | null): void {
  const input = isEmpty<HTMLElement>(target);
  const prevEl = isEmpty<HTMLElement>(input.previousElementSibling as HTMLElement);
  prevEl.innerText = "Change";
  prevEl.style.position = "absolute";
  prevEl.style.left = "0";
  prevEl.style.bottom = "-60px";
  const parentEl = isEmpty<HTMLElement>(input.parentElement as HTMLElement);
  parentEl.style.zIndex = "0";
}

// 이미지 실시간 드래그로 위치 조정
export function handleMouseDragEvent(container: HTMLElement | null, trans: TransEvent, choose: string): void {
  const selected = isEmpty<HTMLElement>(container);
  const chooseImg = isEmpty<HTMLElement>(document.getElementById(choose));
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
    trans.startX = isMobile() ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    trans.startY = isMobile() ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    selected.style.cursor = "grabbing";
    const grid = isEmpty<HTMLElement>(selected.getElementsByClassName("grid")[0] as HTMLElement);
    grid.style.display = "block";
  });

  selected.addEventListener(mousemove, (e) => {
    e.preventDefault();
    clientX = isMobile() ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    clientY = isMobile() ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    if (trans.drag) {
      currentX = isMoveX ? 0 : clientX - trans.startX;
      currentY = clientY - trans.startY;
      trans.moveX += currentX;
      trans.moveY += currentY;
      trans.startX = clientX;
      trans.startY = clientY;
      chooseImg.style.scale = String(trans.scale);
      chooseImg.style.translate = `${trans.moveX + trans.scaleMoveX}px ${
        trans.moveY + trans.scaleMoveY
      }px`;
      selected.getElementsByTagName("span")[0].innerText = `X축: ${
        trans.moveX
      }px, Y축: ${trans.moveY}px, 비율: ${trans.scale * 100}%`;
      selected.getElementsByTagName("span")[0].style.display = "block";
      selected.getElementsByTagName("span")[1].style.display = "block";
    }
  });

  selected.addEventListener(mouseup, () => {
    trans.drag = false;
    selected.style.cursor = "grab";
    const grid = isEmpty(selected.getElementsByClassName("grid")[0] as HTMLElement);
    grid.style.display = "none";
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

export function handleTargetMove(moveList: NodeListOf<HTMLElement>): void {
  moveList.forEach((move) => {
    let x = 0;
    let y = 0;
    let moveX = 0;
    let moveY = 0;
    function onDrag(e: MouseEvent) {
      moveX += e.clientX - x;
      moveY += e.clientY - y;
      x = e.clientX;
      y = e.clientY;
      move.style.transform = `translate(${moveX}px, ${moveY}px)`;
      move.style.zIndex = "100";
    }

    function onLetGo() {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onLetGo);
    }

    function onGrab(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onLetGo);
    }

    move.addEventListener("mousedown", onGrab);
  });
}

export function handleMoveText(app: HTMLElement, moveText: MoveText): void {
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

  app.addEventListener("mouseup", () => {
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

export function changeColor(colorInput: HTMLInputElement | null, target: HTMLInputElement | null): void {
  const color = isEmpty<HTMLInputElement>(colorInput);
  const text = isEmpty<HTMLInputElement>(target);
  color.addEventListener("change", () => {
    text.style.color = color.value;
  });
}

export function handleChangeImage(
  choose: HTMLElement | null,
  selected: HTMLElement | null,
  edit: Img,
  trans: TransEvent,
  chooseImg: string,
  submitBtn: HTMLElement | null
): void {
  
  isEmpty<HTMLElement>(choose).addEventListener("change", (e) => {
    // initialize
    const container = isEmpty<HTMLElement>(selected);
    const submit = isEmpty<HTMLElement>(submitBtn);
    imageValueReset(container, edit, trans);

    const target = isEmpty<HTMLInputElement>(e.target as HTMLInputElement);
    const file = target.files != null && target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      container.style.backgroundColor = BGCOLOR;

      img.onload = () => {
        edit.height = (edit.width * img.height) / img.width; // 이미지 비율 유지
        trans.startY =
          img.width >= img.height ? 0 : edit.getLongImageStartPositionY(); // 이미지 세로일 경우 센터 정렬
        img.style.left = `${trans.startX}px`;
        img.style.top = `${trans.startY}px`;
        img.id = chooseImg;
        container.appendChild(img);

        handleMouseDragEvent(container, trans, chooseImg); // 이미지 실시간 드래그로 위치 조정
        resizeImage(container, edit, trans); // 이미지 리사이즈

        changeFileBtn(e.target as HTMLElement); // 파일버튼 위치 변경
        submit.style.marginRight = '0';
      };
    };
  });
}

export function resizeImage(imgApp: HTMLElement, edit: Img, trans: TransEvent): void {
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
    const firstImage = isEmpty<HTMLElement>(imgApp.getElementsByTagName("img")[0]);
    firstImage.style.scale = String(trans.scale);
    imgApp.getElementsByTagName(
      "img"
    )[0].style.translate = `${trans.scaleMoveX}px ${trans.scaleMoveY}px`;
    imgApp.getElementsByTagName("span")[0].innerText = `X축: ${
      trans.moveX
    }px, Y축: ${trans.moveY}px, 비율: ${trans.scale * 100}%`;
    imgApp.getElementsByTagName("span")[0].style.display = "block";
    imgApp.getElementsByTagName("span")[1].style.display = "block";
  });
}

export function makeDouble(value: number, origin: number): number {
  return value === 0 ? origin : origin + value * 2;
}

export function resetPosition(resetBtn: HTMLElement, trans: TransEvent, choose: string): void {
  trans.reset();
  const chooseImg = isEmpty<HTMLImageElement>(document.getElementById(choose) as HTMLImageElement);
  chooseImg.style.scale = String(trans.scale);
  const y =
    chooseImg.height > chooseImg.width
      ? (chooseImg.height - chooseImg.width) / -2
      : 0;
  chooseImg.style.translate = `0px ${y}px`;
  chooseImg.style.left = '0';
  chooseImg.style.top = '0';
  trans.scaleMoveX = 0;
  trans.scaleMoveY = y;
  const prevEl = isEmpty<HTMLElement>(resetBtn.previousElementSibling as HTMLElement);
  prevEl.innerText = `X축: ${trans.moveX}px, Y축: ${
    trans.moveY
  }px, 비율: ${trans.scale * 100}%`;
}

export function addDownloadButton(canvas: HTMLCanvasElement, download: HTMLElement): void {
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

export function downloadCountGA(app: string, name: string): void {
  gtag("event", `${app}_download`, {
    app_name: name,
    event_date: new Date().toLocaleString(),
  });
}

// 오늘 날짜를 yyyy-mm-dd 형식으로 반환하는 함수
export function getToday(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const dd = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  return `${yyyy}-${mm}-${dd}`;
}

export function clearInput(btn: HTMLElement): void {
  isEmpty<HTMLInputElement>(btn.previousElementSibling as HTMLInputElement).value = "";
}

// input null check
export function inputNullCheck(inputList: NodeListOf<HTMLInputElement>, inputFile: HTMLInputElement): void {
  if (!inputFile.files) {
    isEmpty<HTMLElement>(inputFile.previousElementSibling as HTMLElement).style.backgroundColor = "red";
    isEmpty<HTMLElement>(inputFile.previousElementSibling as HTMLElement).style.color = "white";
  }
  inputList.forEach((input) => checkValue(input));
}

export function checkValue(input: HTMLInputElement): void {
  if (input.value == "") {
    input.focus();
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = PRIMARYCOLOR;
  }
}

export function isMobile(): boolean {
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

export function getLongImageStartPositionY(edit: Img): number {
  return (edit.width - edit.height) / 2;
}

export function setFormattingDate(value: string): string {
  let date = value.split("-");
  date[1] = date[1].replace(/^0+/, "");
  date[2] = date[2].replace(/^0+/, "");
  return `${date[0]}.${date[1]}.${date[2]}`;
}

// nav bar scroll event
document.addEventListener("scroll", () => {
  const navEl = isEmpty<HTMLElement>(nav);
  if (window.scrollY > 150) {
    navEl.classList.add("show");
  } else {
    navEl.classList.remove("show");
  }
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let target = isEmpty(document.querySelector(link.hash));
    let targetPosition = target.getBoundingClientRect().top;

    window.scrollBy({
      top: targetPosition - 150,
      left: 0,
      behavior: "smooth",
    });
  });
});

// watermark
export function addWatermarkRightBottom(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "right";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(`${TYPOURL}`, 980, 980);
}

export function addWatermarkCenterBottom(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(`${TYPOURL}`, 500, 980);
}

export function addWatermarkRightTop(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "right";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(`${TYPOURL}`, 980, 40);
}
