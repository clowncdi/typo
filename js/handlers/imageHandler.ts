// 이미지 처리 핸들러

import { Img } from '../classes/Img';
import { TransEvent } from '../classes/TransEvent';
import { isEmpty } from '../core/utils';
import { BGCOLOR, PRIMARYCOLOR } from '../core/constants';
import { handleMouseDragEvent } from './dragHandler';

// 이미지 값 초기화
export function imageValueReset(
  container: HTMLElement,
  edit: Img,
  trans: TransEvent
): void {
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

// 파일 버튼 위치 변경
export function changeFileBtn(target: HTMLElement | null): void {
  const input = isEmpty(target);
  const prevEl = isEmpty(input.previousElementSibling as HTMLElement);
  prevEl.innerText = "Change";
  prevEl.style.position = "absolute";
  prevEl.style.left = "0";
  prevEl.style.bottom = "-60px";
  const parentEl = isEmpty(input.parentElement as HTMLElement);
  parentEl.style.zIndex = "0";
}

// 이미지 리사이즈 (마우스 휠)
export function resizeImage(
  imgApp: HTMLElement,
  edit: Img,
  trans: TransEvent
): void {
  imgApp.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.1 : -0.1;
    const newScale = trans.scale + delta;
    if (newScale <= 0.1 || newScale >= 3) return;
    trans.scale = newScale;
    trans.scaleMoveX += (edit.width * delta) / 2;
    trans.scaleMoveY += (edit.height * delta) / 2;
    const firstImage = isEmpty(imgApp.getElementsByTagName("img")[0]);
    firstImage.style.scale = String(trans.scale);
    firstImage.style.translate =
      `${trans.moveX + trans.scaleMoveX}px ${trans.moveY + trans.scaleMoveY}px`;
    imgApp.getElementsByTagName("span")[0].innerText =
      `X축: ${trans.moveX}px, Y축: ${trans.moveY}px, 비율: ${(trans.scale * 100).toFixed(0)}%`;
    imgApp.getElementsByTagName("span")[0].style.display = "block";
    imgApp.getElementsByTagName("span")[1].style.display = "block";
  });
}

// 이미지 변경 핸들러
export function handleChangeImage(
  choose: HTMLElement | null,
  selected: HTMLElement | null,
  edit: Img,
  trans: TransEvent,
  chooseImgId: string,
  submitBtn: HTMLElement | null
): void {
  isEmpty(choose).addEventListener("change", (e) => {
    const container = isEmpty(selected);
    const submit = isEmpty(submitBtn);
    imageValueReset(container, edit, trans);

    const target = isEmpty(e.target as HTMLInputElement);
    const file = target.files != null && target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = () => {
      console.error("파일 읽기 실패:", reader.error);
      alert("파일을 읽을 수 없습니다.");
    };

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      container.style.backgroundColor = BGCOLOR;

      img.onerror = () => {
        console.error("이미지 로드 실패");
        alert("이미지를 불러올 수 없습니다.");
      };

      img.onload = () => {
        edit.height = (edit.width * img.height) / img.width;
        trans.startY =
          img.width >= img.height ? 0 : edit.getLongImageStartPositionY();
        img.style.left = `${trans.startX}px`;
        img.style.top = `${trans.startY}px`;
        img.id = chooseImgId;
        img.draggable = false;
        img.style.userSelect = 'none';
        container.appendChild(img);

        handleMouseDragEvent(container, trans, chooseImgId);
        resizeImage(container, edit, trans);

        changeFileBtn(e.target as HTMLElement);
        submit.style.marginRight = '0';
      };
    };
  });
}

// 위치 초기화
export function resetPosition(
  resetBtn: HTMLElement,
  trans: TransEvent,
  chooseImgId: string
): void {
  trans.reset();
  const chooseImg = isEmpty(document.getElementById(chooseImgId) as HTMLImageElement);
  chooseImg.style.scale = String(trans.scale);
  const y = chooseImg.height > chooseImg.width
    ? (chooseImg.height - chooseImg.width) / -2
    : 0;
  chooseImg.style.translate = `0px ${y}px`;
  chooseImg.style.left = '0';
  chooseImg.style.top = '0';
  trans.scaleMoveX = 0;
  trans.scaleMoveY = y;
  const prevEl = isEmpty(resetBtn.previousElementSibling as HTMLElement);
  prevEl.innerText = `X축: ${trans.moveX}px, Y축: ${trans.moveY}px, 비율: ${trans.scale * 100}%`;
}

// 색상 변경 핸들러
export function changeColor(
  colorInput: HTMLInputElement | null,
  target: HTMLInputElement | null
): void {
  const color = isEmpty(colorInput);
  const text = isEmpty(target);
  color.addEventListener("change", () => {
    text.style.color = color.value;
  });
}

// input null 체크
export function inputNullCheck(
  inputList: NodeListOf<HTMLInputElement>,
  inputFile: HTMLInputElement
): void {
  if (inputFile.files?.length === 0) {
    const prevEl = inputFile.previousElementSibling as HTMLElement;
    if (prevEl) {
      prevEl.style.backgroundColor = "#ff3333";
      prevEl.style.color = "white";
    }
  }
  inputList.forEach((input) => {
    if (input.value === "") {
      input.focus();
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = PRIMARYCOLOR;
    }
  });
}
