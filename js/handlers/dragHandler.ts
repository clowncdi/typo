// 드래그 이벤트 핸들러

import { TransEvent } from '../classes/TransEvent';
import { Img } from '../classes/Img';
import { MoveText } from '../classes/MoveText';
import { isEmpty, isMobile } from '../core/utils';
import { BGCOLOR, PRIMARYCOLOR } from '../core/constants';

// 이미지 드래그 위치 조정
export function handleMouseDragEvent(
  container: HTMLElement | null,
  trans: TransEvent,
  chooseImgId: string
): void {
  const selected = isEmpty(container);
  const chooseImg = isEmpty(document.getElementById(chooseImgId));

  let currentX = 0;
  let currentY = 0;
  const mousedown = isMobile() ? "touchstart" : "mousedown";
  const mousemove = isMobile() ? "touchmove" : "mousemove";
  const mouseup = isMobile() ? "touchend" : "mouseup";
  let clientX = 0;
  let clientY = 0;
  let isMoveX = false;

  selected.addEventListener(mousedown, (e) => {
    e.preventDefault();
    trans.drag = true;
    trans.startX = isMobile() ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    trans.startY = isMobile() ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    selected.style.cursor = "grabbing";
    const grid = isEmpty(selected.getElementsByClassName("grid")[0] as HTMLElement);
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
      chooseImg.style.translate = `${trans.moveX + trans.scaleMoveX}px ${trans.moveY + trans.scaleMoveY}px`;
      selected.getElementsByTagName("span")[0].innerText =
        `X축: ${trans.moveX}px, Y축: ${trans.moveY}px, 비율: ${(trans.scale * 100).toFixed(0)}%`;
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

// 텍스트 이동 핸들러
export function handleMoveText(app: HTMLElement, moveText: MoveText): void {
  let isMoveX = false;

  app.addEventListener("mousedown", (e) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    // input, textarea, button 요소는 기본 동작 허용
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'button') {
      return;
    }
    e.preventDefault();
    moveText.isDrag = true;
    moveText.startX = e.clientX;
    moveText.startY = e.clientY;
  });

  app.addEventListener("mousemove", (e) => {
    if (!moveText.isDrag) return;
    e.preventDefault();
    if (moveText.isDrag) {
      const moveX = isMoveX ? 0 : e.clientX - moveText.startX;
      const moveY = e.clientY - moveText.startY;
      moveText.newX += moveX;
      moveText.newY += moveY;
      moveText.startX = e.clientX;
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

// 타겟 이동 핸들러 (move 클래스용)
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
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      // input, textarea, button 요소는 기본 동작 허용
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'button') {
        return;
      }
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onLetGo);
    }

    move.addEventListener("mousedown", onGrab);
  });
}
