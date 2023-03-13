const originImg8 = new Img();
const editImg8 = new Img();
const transEvent8 = new TransEvent();
const chooseFileApp8 = document.getElementById("chooseFileApp8");
const selectedImageApp8 = document.getElementById("selectedImageApp8");
const submitBtnApp8 = document.getElementById("submitBtnApp8");
const imageContainerApp8 = document.getElementById("imageContainerApp8");
const app8TitleColor = document.getElementById("app8TitleColor");
const app8Title = document.getElementById("app8Title");
const app8Sub = document.getElementById("app8Sub");
const app8StartDate = document.getElementById("app8StartDate");
const app8EndDate = document.getElementById("app8EndDate");
const app8Inputs = document.querySelectorAll("#app8 input");
const chooseImg8 = "chooseImg8";

document.addEventListener("DOMContentLoaded", () => {
  app8Date.value = getToday();
});

chooseFileApp8.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp8, editImg8);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp8.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      originImg8.width = img.width;
      originImg8.height = img.height;
      editImg8.height = (editImg8.width * img.height) / img.width;
      transEvent8.startY = img.width >= img.height ? 0 : editImg8.getLongImageStartPositionY();

      img.style.left = `${transEvent8.startX}px`;
      img.style.top = `${transEvent8.startY}px`;
      img.id = chooseImg8;
      selectedImageApp8.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp8, transEvent8, chooseImg8);

      changeFileBtn(e.target);
      submitBtnApp8.style.marginRight = 0;
    };
  };
});

mobile && submitBtnApp8.addEventListener("touchstart", makeImageApp8);
!mobile && submitBtnApp8.addEventListener("click", makeImageApp8);

async function makeImageApp8() {
  // initialize canvas.
  imageContainerApp8.innerHTML = "";
  imageContainerApp8.nextElementSibling.innerHTML = "";
  inputNullCheck(app8Inputs, chooseFileApp8);

  const file = chooseFileApp8.files[0];
  if (file) {
    imageContainerApp8.parentElement.parentElement.style.display = "block";
  }
  const reader = new FileReader();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = async () => {
      canvas.width = 1000;
      canvas.height = 1000;
      ctx.filter = "contrast(110%) grayscale(100%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent8.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent8.moveX * ratio * -1;
        let originY = transEvent8.moveY * ratio * -1;

        x = transEvent8.moveX;
        y = transEvent8.moveY + editImg8.getLongImageStartPositionY() * 2;
        ctx.drawImage(
          img,
          originX,
          originY,
          img.width,
          img.height,
          x,
          y,
          canvasWidth,
          canvasHeight
        );
      } else {
        // original width : original height = width resize : height resize
        // height resize = (width resize * original height) / original width
        let canvasHeight = (1000 * img.height) / img.width;
        let startY = img.width === img.height ? 0 : (1000 - canvasHeight) / 2;
        ctx.drawImage(
          img,
          x,
          y,
          img.width,
          img.height,
          transEvent8.moveX * 2,
          transEvent8.moveY * 2 + startY,
          1000 * transEvent8.scale,
          canvasHeight * transEvent8.scale
        );
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.globalCompositeOperation = "overlay";
      ctx.fillRect(0, 0, 1000, 1000);

      ctx.font = "900 240px Montserrat";
      ctx.fillStyle = app8TitleColor.value;
      ctx.filter = "opacity(0.6)";
      ctx.globalCompositeOperation = "screen";
      ctx.textAlign = "center";
      ctx.fillText(app8Title.value.toUpperCase(), 500, 580);

      ctx.scale(0.9, 1);
      ctx.filter = "opacity(1)";
      ctx.globalCompositeOperation = "normal";
      ctx.font = "100 48px Montserrat";
      ctx.letterSpacing = "35px";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.fillText(app8Sub.value, 560, 675);

      ctx.font = "100 32px Montserrat";
      ctx.letterSpacing = "15px";
      ctx.wordSpacing = "6px";
      ctx.fillText(setFormattingDate(app8Date.value), 550, 926);

      ctx.scale(1.1, 1);
      ctx.font = "24px S-CoreDream-6Bold";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.letterSpacing = "0px";
      ctx.fillText(`${TYPOURL}`, 920, 980);

      imageContainerApp8.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp8.nextElementSibling);
    };
  };
}
