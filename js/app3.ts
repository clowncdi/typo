import {
  addDownloadButton,
  addWatermarkCenterBottom,
  BGCOLOR, handleChangeImage,
  Img,
  inputNullCheck,
  TransEvent,
  isMobile,
  resetPosition,
  MoveText, handleMoveText, changeColor, makeDouble, isEmpty
} from './common';

const editImg3: Img = new Img();
const transEvent3: TransEvent = new TransEvent();
const moveTitle3: MoveText = new MoveText();
const moveSub3: MoveText = new MoveText();
const chooseFileApp3 = document.getElementById("chooseFileApp3") as HTMLInputElement;
const selectedImageApp3 = document.getElementById("selectedImageApp3") as HTMLImageElement;
const submitBtnApp3 = document.getElementById("submitBtnApp3") as HTMLButtonElement;
const imageContainerApp3 = document.getElementById("imageContainerApp3") as HTMLDivElement;
const app3TitleColor = document.getElementById("app3TitleColor") as HTMLInputElement;
const app3Title = document.getElementById("app3Title") as HTMLInputElement;
const app3Sub = document.getElementById("app3Sub") as HTMLInputElement;
const app3Inputs = document.querySelectorAll("#app3 input") as NodeListOf<HTMLInputElement>;
const app3Move = document.querySelectorAll("#app3 .move-edit") as NodeListOf<HTMLDivElement>;
const reset = document.querySelector('#app3 .selected-image-position-reset') as HTMLDivElement;
const chooseImg3: string = "chooseImg3";

handleChangeImage(
  chooseFileApp3,
  selectedImageApp3,
  editImg3,
  transEvent3,
  chooseImg3,
  submitBtnApp3
);
handleMoveText(app3Move[0], moveTitle3);
handleMoveText(app3Move[1], moveSub3);
changeColor(app3TitleColor, app3Title);

reset.addEventListener('click', (e) =>
    resetPosition(e.target as HTMLElement, transEvent3, chooseImg3));

isMobile() && submitBtnApp3.addEventListener("touchstart", makeImageApp3);
!isMobile() && submitBtnApp3.addEventListener("click", makeImageApp3);

async function makeImageApp3() {
  // initialize canvas.
  imageContainerApp3.innerHTML = "";
  isEmpty(imageContainerApp3.nextElementSibling).innerHTML = "";
  inputNullCheck(app3Inputs, chooseFileApp3);

  const file = isEmpty(chooseFileApp3.files)[0];
  if (file) {
    imageContainerApp3.parentElement!.parentElement!.style.display = "block";
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
      ctx.filter = "grayscale(100%) contrast(110%) brightness(90%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let canvasWidth = 1000 * transEvent3.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent3.moveX * 2;
      let y = transEvent3.moveY * 2 + editImg3.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.filter = "grayscale(0%)";
      ctx.font = "160px Bodoni Moda";
      ctx.fillStyle = app3TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";
      ctx.fillText(
        app3Title.value,
        makeDouble(moveTitle3.newX, 500),
        makeDouble(moveTitle3.newY, 520)
      );

      ctx.font = "300 40px Roboto";
      ctx.letterSpacing = "16px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillText(
        app3Sub.value,
        makeDouble(moveSub3.newX, 500),
        makeDouble(moveSub3.newY, 600)
      );

      addWatermarkCenterBottom(ctx, "white");
      imageContainerApp3.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp3.nextElementSibling as HTMLDivElement);
    };
  };
}
