const langs = document.querySelectorAll(".btn-lang");
const sub1 = document.querySelector(".about-sub-text1");
const sub2 = document.querySelector(".about-sub-text2");
const sub3 = document.querySelector(".about-sub-text3");
const aboutWrap = document.querySelector(".about-wrap");
const KOR = {
  text: `'Plus Typo'는 단순한 더하기가 아니라, 글자와 이미지의 조화로운 결합을 의미합니다. 글자와 사진을 쉽게 합성하여 인스그램이나 블로그 등 썸네일 이미지를 만들 수 있도록 도와줍니다. 'Plus Typo'로 다양한 가능성과 창의력을 보여주세요.`,
  sub1: `<b>PlusTypo</b> 는 디자이너이자 개발자인 <a href="https://github.com/clowncdi" target="_blank">최대일</a>의 개인 프로젝트입니다.`,
  sub2: `PlusTypo가 더 나아질 수 있도록 여러분이 만든 작품과 피드백을 보내주세요.`,
  sub3: `<a href="mailto:clowncdi85@gmail.com">clowncdi85@gmail.com</a>`,
};
const ENG = {
  text: `You can easily combine photos and text to create images for Instagram. Not only that, but you can also create cover images for your blog or create your own thumbnail images. Play around with it, it's that easy!`,
  sub1: `<b>PlusTypo</b> is the work of designer and developer <a href="https://github.com/clowncdi" target="_blank">Daeil Choi</a>.`,
  sub2: `Help me make PlusTypo better.`,
  sub3: `Send your feedback and creations to <a href="mailto:clowncdi85@gmail.com">clowncdi85@gmail.com</a>.`,
};

document.addEventListener("DOMContentLoaded", () => {
  textFront.parentElement.classList.add("loaded");
  textFront.value = ENG.text;
});

langs.forEach((lang) => {
  isMobile() && lang.addEventListener("touchstart", () => setLang(lang));
  !isMobile() && lang.addEventListener("click", () => setLang(lang));
});

function setLang(lang) {
  langs.forEach((lang) => lang.classList.remove("active"));
  lang.classList.add("active");
  aboutWrap.classList.toggle("kor", lang.id === "kor");
  if (lang.id === "kor") {
    textFront.classList.add("kor");
    textFront.value = KOR.text;
    sub1.innerHTML = KOR.sub1;
    sub2.innerHTML = KOR.sub2;
    sub3.innerHTML = KOR.sub3;
  } else if (lang.id === "eng") {
    textFront.classList.remove("kor");
    textFront.value = ENG.text;
    sub1.innerHTML = ENG.sub1;
    sub2.innerHTML = ENG.sub2;
    sub3.innerHTML = ENG.sub3;
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
}
