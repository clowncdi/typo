const originImg9 = new Img();
const editImg9 = new Img();
const transEvent9 = new TransEvent();
const chooseFileApp9 = document.getElementById("chooseFileApp9");
const selectedImageApp9 = document.getElementById("selectedImageApp9");
const submitBtnApp9 = document.getElementById("submitBtnApp9");
const imageContainerApp9 = document.getElementById("imageContainerApp9");
const app9TitleColor = document.getElementById("app9TitleColor");
const app9Title = document.getElementById("app9Title");
const app9Inputs = document.querySelectorAll("#app9 input");
const chooseImg9 = "chooseImg9";

chooseFileApp9.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp9, originImg9, editImg9, transEvent9);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp9.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      originImg9.width = img.width;
      originImg9.height = img.height;
      editImg9.height = (editImg9.width * img.height) / img.width;
      transEvent9.startY = img.width >= img.height ? 0 : editImg9.getLongImageStartPositionY();
      // if (img.width <= img.height) {
      //   editImg9.width = 500;
      //   editImg9.height = (editImg9.width * img.height) / img.width;
      //   transEvent9.startY = img.width >= img.height ? 0 : editImg9.getLongImageStartPositionY();
      // } else {
      //   editImg9.height = 500;
      //   editImg9.width = (editImg9.height * img.width) / img.height;
      //   transEvent9.startX = img.width <= img.height ? 0 : editImg9.getLongImageStartPositionX();
      // }
      // console.log(img, originImg9, editImg9, transEvent9);

      // img.width = editImg9.width;
      // img.height = editImg9.height;
      img.style.left = `${transEvent9.startX}px`;
      img.style.top = `${transEvent9.startY}px`;
      img.id = chooseImg9;
      selectedImageApp9.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp9, transEvent9, chooseImg9);

      changeFileBtn(e.target);
      submitBtnApp9.style.marginRight = 0;
    };
  };
});

mobile && submitBtnApp9.addEventListener("touchstart", makeImageApp9);
!mobile && submitBtnApp9.addEventListener("click", makeImageApp9);

async function makeImageApp9() {
  // initialize canvas.
  imageContainerApp9.innerHTML = "";
  imageContainerApp9.nextElementSibling.innerHTML = "";
  inputNullCheck(app9Inputs, chooseFileApp9);

  const file = chooseFileApp9.files[0];
  if (file) {
    imageContainerApp9.parentElement.parentElement.style.display = "block";
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
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.filter = "brightness(103%)";
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent9.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent9.moveX * ratio * -1;
        let originY = transEvent9.moveY * ratio * -1;

        x = transEvent9.moveX;
        y = transEvent9.moveY + editImg9.getLongImageStartPositionY() * 2;
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
          transEvent9.moveX * 2,
          transEvent9.moveY * 2 + startY,
          1000 * transEvent9.scale,
          canvasHeight * transEvent9.scale
        );
      }

      ctx.fillStyle = app9TitleColor.value;
      ctx.shadowColor = "rgba(255, 110, 138, 0.5)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "left";
      ctx.font = "110px Stalemate";
      ctx.filter = "opacity(0.95)";
      ctx.fillText(app9Title.value, 150, 215);
      
      ctx.font = "24px S-CoreDream-6Bold";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.letterSpacing = "0px";
      ctx.fillText(`${TYPOURL}`, 910, 980);

      imageContainerApp9.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp9.nextElementSibling);
    };
  };
}
