// init.ts - 페이지 초기화 로직
// index.html에서 로드되어 공통 DOM 이벤트를 설정

import { handleTargetMove } from './handlers/dragHandler';
import { isEmpty } from './core/utils';
import { AppFactory } from './classes/AppFactory';

const year = document.getElementById("year");
const links = document.querySelectorAll("a[href^='#']") as NodeListOf<HTMLAnchorElement>;
const moveList = document.querySelectorAll(".move") as NodeListOf<HTMLElement>;
const clearBtns = document.querySelectorAll(".clearBtn") as NodeListOf<HTMLElement>;
const items = document.querySelectorAll(".item-wrap");

function clearInput(btn: HTMLElement): void {
  const input = btn.previousElementSibling as HTMLInputElement;
  if (input) input.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // IntersectionObserver를 사용하여 뷰포트에 들어올 때만 애니메이션 적용
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    items.forEach((item) => {
      observer.observe(item);
    });
  } else {
    items.forEach((item) => {
      item.classList.add("loaded");
    });
  }

  handleTargetMove(moveList);
  if (year) {
    year.innerText = new Date().getFullYear().toString();
  }
});

// Clear 버튼 이벤트
clearBtns.forEach((clearBtn) => {
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearInput(clearBtn);
  });
});

// 앵커 링크 스무스 스크롤
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = isEmpty(document.querySelector(link.hash));
    const targetPosition = target.getBoundingClientRect().top;
    window.scrollBy({
      top: targetPosition - 150,
      left: 0,
      behavior: "smooth",
    });
  });
});

// 모든 앱 초기화
AppFactory.createAll();
