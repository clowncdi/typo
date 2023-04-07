import {
  addDownloadButton,
  BGCOLOR, handleChangeImage,
  Img,
  inputNullCheck,
  TransEvent,
  isMobile,
  resetPosition,
  MoveText, handleMoveText, changeColor, makeDouble, addWatermarkRightTop, getToday, isEmpty
} from './common';

const editImg4: Img = new Img();
const transEvent4: TransEvent = new TransEvent();
const moveTitle4: MoveText = new MoveText();
const moveSub4: MoveText = new MoveText();
const chooseFileApp4 = document.getElementById("chooseFileApp4") as HTMLInputElement;
const selectedImageApp4 = document.getElementById("selectedImageApp4") as HTMLImageElement;
const submitBtnApp4 = document.getElementById("submitBtnApp4") as HTMLButtonElement;
const imageContainerApp4 = document.getElementById("imageContainerApp4") as HTMLDivElement;
const app4TitleColor = document.getElementById("app4TitleColor") as HTMLInputElement;
const app4Title = document.getElementById("app4Title") as HTMLInputElement;
const app4Date = document.getElementById("app4Date") as HTMLInputElement;
const app4Inputs = document.querySelectorAll("#app4 input") as NodeListOf<HTMLInputElement>;
const app4Move = document.querySelectorAll("#app4 .move-edit") as NodeListOf<HTMLDivElement>;
const reset = document.querySelector('#app4 .selected-image-position-reset') as HTMLDivElement;
const chooseImg4: string = "chooseImg4";

handleChangeImage(
  chooseFileApp4,
  selectedImageApp4,
  editImg4,
  transEvent4,
  chooseImg4,
  submitBtnApp4
);
handleMoveText(app4Move[0], moveTitle4);
handleMoveText(app4Move[1], moveSub4);
changeColor(app4TitleColor, app4Title);

reset.addEventListener('click', (e) =>
    resetPosition(e.target as HTMLElement, transEvent4, chooseImg4));

document.addEventListener("DOMContentLoaded", () => {
  app4Date.value = getToday();
});

isMobile() && submitBtnApp4.addEventListener("touchstart", makeImageApp4);
!isMobile() && submitBtnApp4.addEventListener("click", makeImageApp4);

async function makeImageApp4() {
  event?.stopPropagation();
  // initialize canvas.
  imageContainerApp4.innerHTML = "";
  isEmpty(imageContainerApp4.nextElementSibling).innerHTML = "";
  inputNullCheck(app4Inputs, chooseFileApp4);

  const file = isEmpty(chooseFileApp4.files)[0];
  if (file) {
    imageContainerApp4.parentElement!.parentElement!.style.display = "block";
  }
  const reader = new FileReader();
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result as string;

    img.onload = async () => {
      canvas.width = 1000;
      canvas.height = 1000;
      ctx.fillStyle = BGCOLOR;
      ctx.filter = "contrast(110%) brightness(110%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let canvasWidth = 1000 * transEvent4.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent4.moveX * 2;
      let y = transEvent4.moveY * 2 + editImg4.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

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
        ctx.fillText(
          word,
          makeDouble(moveTitle4.newX, 500),
          makeDouble(moveTitle4.newY, topPosition)
        );
        topPosition += 90;
      }

      ctx.font = "300 26px Montserrat Alternates";
      ctx.letterSpacing = "1px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillText(
        app4Date.value.replaceAll("-", ". "),
        makeDouble(moveSub4.newX, 500),
        makeDouble(moveSub4.newY, 935)
      );

      addWatermarkRightTop(ctx, "white");
      imageContainerApp4.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp4.nextElementSibling as HTMLDivElement);
    };
  };
}
