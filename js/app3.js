const originImg3 = new Img();
const editImg3 = new Img();
const transEvent3 = new TransEvent();
const moveTitle3 = new MoveText();
const moveSub3 = new MoveText();
const chooseFileApp3 = document.getElementById("chooseFileApp3");
const selectedImageApp3 = document.getElementById("selectedImageApp3");
const submitBtnApp3 = document.getElementById("submitBtnApp3");
const imageContainerApp3 = document.getElementById("imageContainerApp3");
const app3TitleColor = document.getElementById("app3TitleColor");
const app3Title = document.getElementById("app3Title");
const app3Sub = document.getElementById("app3Sub");
const app3Inputs = document.querySelectorAll("#app3 input");
const appMove3 = document.querySelectorAll("#app3 .app-move");

handleMoveText(appMove3[0], moveTitle3);
handleMoveText(appMove3[1], moveSub3);

chooseFileApp3.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp3, originImg3, editImg3, transEvent3);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp3.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      originImg3.width = img.width;
      originImg3.height = img.height;
      editImg3.height = (editImg3.width * img.height) / img.width;
      transEvent3.startY = img.width >= img.height ? 0 : editImg3.getLongImageStartPositionY();

      img.style.left = `${transEvent3.startX}px`;
      img.style.top = `${transEvent3.startY}px`;
      img.id = "chooseImg3";
      selectedImageApp3.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp3, transEvent3, "chooseImg3");

      changeFileBtn(e.target);
      submitBtnApp3.style.marginRight = 0;
    };
  };
});

isMobile() && submitBtnApp3.addEventListener("touchstart", makeImageApp3);
!isMobile() && submitBtnApp3.addEventListener("click", makeImageApp3);

async function makeImageApp3() {
  gtag('event', 'app3_create', {
    'app_name': 'Bicycle Repair Shop',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp3.innerHTML = "";
  imageContainerApp3.nextElementSibling.innerHTML = "";
  inputNullCheck(app3Inputs, chooseFileApp3);

  const file = chooseFileApp3.files[0];
  if (file) {
    imageContainerApp3.parentElement.parentElement.style.display = "block";
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
      ctx.filter = "grayscale(100%) contrast(110%) brightness(90%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent3.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent3.moveX * ratio * -1;
        let originY = transEvent3.moveY * ratio * -1;

        x = transEvent3.moveX;
        y = transEvent3.moveY + editImg3.getLongImageStartPositionY() * 2;
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
          transEvent3.moveX * 2,
          transEvent3.moveY * 2 + startY,
          1000 * transEvent3.scale,
          canvasHeight * transEvent3.scale
        );
      }

      ctx.filter = "grayscale(0%)";
      ctx.font = "160px Bodoni Moda";
      ctx.fillStyle = app3TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";
      ctx.fillText(app3Title.value, makeDouble(moveTitle3.newX, 500), makeDouble(moveTitle3.newY, 520));

      ctx.font = "300 40px Roboto";
      ctx.letterSpacing = "16px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillText(app3Sub.value, makeDouble(moveSub3.newX, 500), makeDouble(moveSub3.newY, 600));

      addWatermarkCenterBottom(ctx, 'white');
      imageContainerApp3.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp3.nextElementSibling);
    };
  };
}
