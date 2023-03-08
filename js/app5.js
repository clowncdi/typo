const originImg5 = JSON.parse(JSON.stringify(originImg));
const editImg5 = JSON.parse(JSON.stringify(editImg));
const transEvent5 = JSON.parse(JSON.stringify(transEvent));
const chooseFileApp5 = document.getElementById("chooseFileApp5");
const selectedImageApp5 = document.getElementById("selectedImageApp5");
const submitBtnApp5 = document.getElementById("submitBtnApp5");
const imageContainerApp5 = document.getElementById("imageContainerApp5");
const app5TitleColor = document.getElementById("app5TitleColor");
const app5Title = document.getElementById("app5Title");
const app5Sub = document.getElementById("app5Sub");
const app5StartDate = document.getElementById("app5StartDate");
const app5EndDate = document.getElementById("app5EndDate");
const app5Inputs = document.querySelectorAll("#app5 input");

document.addEventListener("DOMContentLoaded", () => {
  app5StartDate.value = getToday();
  app5EndDate.value = getToday();
});

chooseFileApp5.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp5, originImg5, editImg5, transEvent5);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp5.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      originImg5.width = img.width;
      originImg5.height = img.height;
      editImg5.height = (editImg.width * img.height) / img.width;
      transEvent5.startY = img.width >= img.height ? 0 : LONGIMGDEFAULTY;

      img.style.left = `${transEvent5.startX}px`;
      img.style.top = `${transEvent5.startY}px`;
      img.id = "chooseImg5";
      selectedImageApp5.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp5, transEvent5, "chooseImg5");

      changeFileBtn(e.target);
      submitBtnApp5.style.marginRight = 0;
    };
  };
});

mobile && submitBtnApp5.addEventListener("touchstart", makeImageApp5);
!mobile && submitBtnApp5.addEventListener("click", makeImageApp5);

async function makeImageApp5() {
  // initialize canvas.
  imageContainerApp5.innerHTML = "";
  imageContainerApp5.nextElementSibling.innerHTML = "";
  inputNullCheck(app5Inputs, chooseFileApp5);

  const file = chooseFileApp5.files[0];
  if (file) {
    imageContainerApp5.parentElement.parentElement.style.display = "block";
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
      ctx.fillStyle = BGCOLOR;
      ctx.filter = "contrast(110%) brightness(110%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent5.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent5.moveX * ratio * -1;
        let originY = transEvent5.moveY * ratio * -1;

        x = transEvent5.moveX;
        y = transEvent5.moveY + LONGIMGDEFAULTY * 2;
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
          transEvent5.moveX * 2,
          transEvent5.moveY * 2 + startY,
          1000 * transEvent5.scale,
          canvasHeight * transEvent5.scale
        );
      }

      ctx.font = "186px Monoton";
      ctx.fillStyle = app5TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";
      ctx.fillText(app5Title.value.toUpperCase(), 500, 550);

      ctx.font = "300 130px Montserrat";
      ctx.letterSpacing = "35px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.fillText(app5Sub.value.toUpperCase(), 525, 680);

      ctx.font = "400 38px Oswald";
      ctx.letterSpacing = "3px";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillText(
        app5StartDate.value.substring(5).replace("-", "."),
        420,
        830
      );
      ctx.fillText("~", 500, 830);
      ctx.fillText(app5EndDate.value.substring(5).replace("-", "."), 590, 830);

      ctx.font = "24px S-CoreDream-6Bold";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.letterSpacing = "0px";
      ctx.fillText(`${TYPOURL}`, 910, 980);

      imageContainerApp5.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp5.nextElementSibling);
    };
  };
}
