import {
  addDownloadButton,
  BGCOLOR, handleChangeImage,
  Img,
  inputNullCheck,
  TransEvent,
  isMobile,
  resetPosition,
  MoveText, handleMoveText, changeColor, makeDouble, addWatermarkRightBottom,
} from './common';

const editImg9 = new Img();
const transEvent9 = new TransEvent();
const moveTitle9 = new MoveText();
const chooseFileApp9 = document.getElementById("chooseFileApp9");
const selectedImageApp9 = document.getElementById("selectedImageApp9");
const submitBtnApp9 = document.getElementById("submitBtnApp9");
const imageContainerApp9 = document.getElementById("imageContainerApp9");
const app9TitleColor = document.getElementById("app9TitleColor");
const app9Title = document.getElementById("app9Title");
const app9Inputs = document.querySelectorAll("#app9 input");
const app9Move = document.querySelectorAll("#app9 .move-edit");
const reset = document.querySelector('#app9 .selected-image-position-reset');
const chooseImg9 = "chooseImg9";

handleChangeImage(
  chooseFileApp9,
  selectedImageApp9,
  editImg9,
  transEvent9,
  chooseImg9,
  submitBtnApp9
);
handleMoveText(app9Move[0], moveTitle9);
changeColor(app9TitleColor, app9Title);

reset.addEventListener('click', (e) =>
    resetPosition(e.target, transEvent9, chooseImg9));

isMobile() && submitBtnApp9.addEventListener("touchstart", makeImageApp9);
!isMobile() && submitBtnApp9.addEventListener("click", makeImageApp9);

async function makeImageApp9() {
  gtag("event", "app9_create", {
    app_name: "Spring",
    event_date: new Date().toLocaleString(),
  });
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
      let canvasWidth = 1000 * transEvent9.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent9.moveX * 2;
      let y = transEvent9.moveY * 2 + editImg9.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.fillStyle = app9TitleColor.value;
      ctx.shadowColor = "rgba(255, 110, 138, 0.5)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "left";
      ctx.font = "110px Stalemate";
      ctx.filter = "opacity(0.95)";
      ctx.fillText(
        app9Title.value,
        makeDouble(moveTitle9.newX, 150),
        makeDouble(moveTitle9.newY, 215)
      );

      addWatermarkRightBottom(ctx, "white");
      imageContainerApp9.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp9.nextElementSibling);
    };
  };
}
