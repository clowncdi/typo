// 유틸리티 함수 모음

import { PRIMARYCOLOR, TYPOURL } from './constants';

// 타입 안전한 DOM 요소 접근
export function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Element #${id} not found`);
  }
  return el as T;
}

// null/undefined 체크
export function isEmpty<T>(el: T | null | undefined): T {
  if (el !== null && el !== undefined) {
    return el;
  }
  throw new Error("Element is null or undefined");
}

// 오늘 날짜를 yyyy-mm-dd 형식으로 반환
export function getToday(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// 날짜 포매팅 (yyyy-mm-dd -> yyyy.m.d)
export function setFormattingDate(value: string): string {
  const date = value.split("-");
  date[1] = date[1].replace(/^0+/, "");
  date[2] = date[2].replace(/^0+/, "");
  return `${date[0]}.${date[1]}.${date[2]}`;
}

// 모바일 디바이스 체크
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
}

// 값 2배 계산 (이동 좌표용)
export function makeDouble(value: number, origin: number): number {
  return value === 0 ? origin : origin + value * 2;
}

// input 값 체크
export function checkValue(input: HTMLInputElement | HTMLTextAreaElement): void {
  if (input.value === "") {
    input.focus();
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = PRIMARYCOLOR;
  }
}

// 다운로드 버튼 추가
export function addDownloadButton(canvas: HTMLCanvasElement, container: HTMLElement): void {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  a.download = `${getToday()}_${TYPOURL}.jpg`;
  a.innerHTML = `<p><span>File Name</span>${getToday()}_${TYPOURL}.jpg</p>`;
  const button = document.createElement("button");
  button.innerText = "Download";
  button.className = "btn btn-dark";
  a.appendChild(button);
  container.appendChild(a);
}

// 워터마크 추가 함수들
export function addWatermarkRightBottom(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "right";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(TYPOURL, 980, 980);
}

export function addWatermarkCenterBottom(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(TYPOURL, 500, 980);
}

export function addWatermarkRightTop(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.restore();
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "right";
  ctx.fillStyle = color;
  ctx.filter = "opacity(0.5)";
  ctx.fillText(TYPOURL, 980, 40);
}

// 파일을 Data URL로 읽기
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("파일 읽기 실패"));
    reader.readAsDataURL(file);
  });
}

// 이미지 로드
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("이미지 로드 실패"));
    img.src = src;
  });
}

// 성능 최적화를 위한 debounce 함수
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// 성능 최적화를 위한 throttle 함수
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
