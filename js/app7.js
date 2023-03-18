const editImg7 = new Img();
const transEvent7 = new TransEvent();
const moveTitle7 = new MoveText();
const moveDate7 = new MoveText();
const chooseFileApp7 = document.getElementById("chooseFileApp7");
const selectedImageApp7 = document.getElementById("selectedImageApp7");
const submitBtnApp7 = document.getElementById("submitBtnApp7");
const imageContainerApp7 = document.getElementById("imageContainerApp7");
const app7TitleColor = document.getElementById("app7TitleColor");
const app7Title = document.getElementById("app7Title");
const app7Date = document.getElementById("app7Date");
const app7Inputs = document.querySelectorAll("#app7 input");
const app7Move = document.querySelectorAll("#app7 .app-move");

handleMoveText(app7Move[0], moveDate7);
handleMoveText(app7Move[1], moveTitle7);

document.addEventListener("DOMContentLoaded", () => {
  app7Date.value = getToday();
});

chooseFileApp7.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp7, editImg7, transEvent7);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp7.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      editImg7.height = (editImg7.width * img.height) / img.width;
      transEvent7.startY = img.width >= img.height ? 0 : editImg7.getLongImageStartPositionY();

      img.style.left = `${transEvent7.startX}px`;
      img.style.top = `${transEvent7.startY}px`;
      img.id = "chooseImg7";
      selectedImageApp7.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp7, transEvent7, "chooseImg7");

      changeFileBtn(e.target);
      submitBtnApp7.style.marginRight = 0;
    };
  };
});

isMobile() && submitBtnApp7.addEventListener("touchstart", makeImageApp7);
!isMobile() && submitBtnApp7.addEventListener("click", makeImageApp7);

async function makeImageApp7() {
  gtag('event', 'app7_create', {
    'app_name': 'Night Duty',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp7.innerHTML = "";
  imageContainerApp7.nextElementSibling.innerHTML = "";
  inputNullCheck(app7Inputs, chooseFileApp7);

  const file = chooseFileApp7.files[0];
  if (file) {
    imageContainerApp7.parentElement.parentElement.style.display = "block";
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
      ctx.filter = "contrast(110%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent7.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent7.moveX * ratio * -1;
        let originY = transEvent7.moveY * ratio * -1;

        x = transEvent7.moveX;
        y = transEvent7.moveY + editImg7.getLongImageStartPositionY() * 2;
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
          transEvent7.moveX * 2,
          transEvent7.moveY * 2 + startY,
          1000 * transEvent7.scale,
          canvasHeight * transEvent7.scale
        );
      }

      ctx.font = "76px Oswald";
      ctx.fillStyle = app7TitleColor.value;
      ctx.textAlign = "left";
      ctx.letterSpacing = "-1px";
      ctx.fillText(app7Title.value.toUpperCase(), makeDouble(moveTitle7.newX, 146), makeDouble(moveTitle7.newY, 860));

      ctx.font = "44px Oswald";
      ctx.letterSpacing = "12px";
      ctx.fillText(app7Date.value.replaceAll("-", ". "), makeDouble(moveDate7.newX, 146), makeDouble(moveDate7.newY, 775));

      addWatermarkRightTop(ctx, 'white');
      imageContainerApp7.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp7.nextElementSibling);
    };
  };
}
