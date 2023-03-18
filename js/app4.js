const originImg4 = new Img();
const editImg4 = new Img();
const transEvent4 = new TransEvent();
const moveTitle4 = new MoveText();
const moveSub4 = new MoveText();
const chooseFileApp4 = document.getElementById("chooseFileApp4");
const selectedImageApp4 = document.getElementById("selectedImageApp4");
const submitBtnApp4 = document.getElementById("submitBtnApp4");
const imageContainerApp4 = document.getElementById("imageContainerApp4");
const app4TitleColor = document.getElementById("app4TitleColor");
const app4Title = document.getElementById("app4Title");
const app4Date = document.getElementById("app4Date");
const app4Inputs = document.querySelectorAll("#app4 input");
const appMove4 = document.querySelectorAll("#app4 .app-move");

handleMoveText(appMove4[0], moveTitle4);
handleMoveText(appMove4[1], moveSub4);

document.addEventListener("DOMContentLoaded", () => {
  app4Date.value = getToday();
});

chooseFileApp4.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp4, originImg4, editImg4, transEvent4);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp4.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      originImg4.width = img.width;
      originImg4.height = img.height;
      editImg4.height = (editImg4.width * img.height) / img.width;
      transEvent4.startY = img.width >= img.height ? 0 : editImg4.getLongImageStartPositionY();

      img.style.left = `${transEvent4.startX}px`;
      img.style.top = `${transEvent4.startY}px`;
      img.id = "chooseImg4";
      selectedImageApp4.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp4, transEvent4, "chooseImg4");

      changeFileBtn(e.target);
      submitBtnApp4.style.marginRight = 0;
    };
  };
});

isMobile() && submitBtnApp4.addEventListener("touchstart", makeImageApp4);
!isMobile() && submitBtnApp4.addEventListener("click", makeImageApp4);

async function makeImageApp4() {
  gtag('event', 'app4_create', {
    'app_name': 'Perilla Leaf',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp4.innerHTML = "";
  imageContainerApp4.nextElementSibling.innerHTML = "";
  inputNullCheck(app4Inputs, chooseFileApp4);

  const file = chooseFileApp4.files[0];
  if (file) {
    imageContainerApp4.parentElement.parentElement.style.display = "block";
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
        let canvasWidth = 1000 * transEvent4.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent4.moveX * ratio * -1;
        let originY = transEvent4.moveY * ratio * -1;

        x = transEvent4.moveX;
        y = transEvent4.moveY + editImg4.getLongImageStartPositionY() * 2;
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
          transEvent4.moveX * 2,
          transEvent4.moveY * 2 + startY,
          1000 * transEvent4.scale,
          canvasHeight * transEvent4.scale
        );
      }

      ctx.font = "80px Pacifico";
      ctx.fillStyle = app4TitleColor.value;
      ctx.shadowColor = "rgba(10, 10, 10, 0.6)";
      ctx.shadowBlur = 25;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";

      let words = app4Title.value.split(" ");
      let topPosition = 730;
      for (let word of words) {
        ctx.fillText(word, makeDouble(moveTitle4.newX, 500), makeDouble(moveTitle4.newY, topPosition));
        topPosition += 90;
      }

      ctx.font = "300 26px Montserrat Alternates";
      ctx.letterSpacing = "1px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillText(app4Date.value.replaceAll("-", ". "), makeDouble(moveSub4.newX, 500), makeDouble(moveSub4.newY, 935));

      addWatermarkRightTop(ctx, 'white');
      imageContainerApp4.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp4.nextElementSibling);
    };
  };
}
