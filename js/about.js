const ABOUT_TEXT_ENG = `You can easily combine photos and text to create images for Instagram. Not only that, but you can also create cover images for your blog or create your own thumbnail images. Play around with it, it's that easy!`;
const ABOUT_TEXT_KOR = `'Plus Typo'는 단순한 더하기가 아니라, 글자와 이미지의 조화로운 결합을 의미합니다. 글자와 사진을 쉽게 합성하여 인스그램이나 블로그 등 썸네일 이미지를 만들 수 있도록 도와줍니다. 'Plus Typo'로 다양한 가능성과 창의력을 보여주세요.`;
const ABOUT_SUB_TEXT1_KOR = `<b>PlusTypo</b> 는 디자이너이자 개발자인 <a href="https://github.com/clowncdi" target="_blank">최대일</a>의 개인 프로젝트입니다.`;
const ABOUT_SUB_TEXT2_KOR = `PlusTypo가 더 나아질 수 있도록 여러분이 만든 작품과 피드백을 보내주세요.`;
const ABOUT_SUB_TEXT3_KOR = `<a href="mailto:clowncdi85@gmail.com">clowncdi85@gmail.com</a>`;
const ABOUT_SUB_TEXT1_ENG = `<b>PlusTypo</b> is the work of designer and developer <a href="https://github.com/clowncdi" target="_blank">Daeil Choi</a>.`;
const ABOUT_SUB_TEXT2_ENG = `Help me make PlusTypo better.`;
const ABOUT_SUB_TEXT3_ENG = `Send your feedback and creations to <a href="mailto:clowncdi85@gmail.com">clowncdi85@gmail.com</a>.`;
const textFront = document.getElementById("textFront");
const langs = document.querySelectorAll(".btn-lang");
const sub1 = document.querySelector(".about-sub-text1");
const sub2 = document.querySelector(".about-sub-text2");
const sub3 = document.querySelector(".about-sub-text3");

document.addEventListener("DOMContentLoaded", () => {
  textFront.parentElement.classList.add("loaded");
  textFront.value = ABOUT_TEXT_ENG;
});

langs.forEach((lang) => {
  lang.addEventListener("click", () => {
    langs.forEach((lang) => lang.classList.remove("active"));
    lang.classList.add("active");
    console.log(lang.innerText);
    if (lang.innerText === "Kor") {
      textFront.classList.add("kor");
      textFront.value = ABOUT_TEXT_KOR;
      sub1.innerHTML = ABOUT_SUB_TEXT1_KOR;
      sub2.innerHTML = ABOUT_SUB_TEXT2_KOR;
      sub3.innerHTML = ABOUT_SUB_TEXT3_KOR;
    } else {
      textFront.classList.remove("kor");
      textFront.value = ABOUT_TEXT_ENG;
      sub1.innerHTML = ABOUT_SUB_TEXT1_ENG;
      sub2.innerHTML = ABOUT_SUB_TEXT2_ENG;
      sub3.innerHTML = ABOUT_SUB_TEXT3_ENG;
    }
  });
});
