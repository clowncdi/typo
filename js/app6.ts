import {
  addDownloadButton,
  BGCOLOR, handleChangeImage,
  Img,
  inputNullCheck,
  TransEvent,
  isMobile,
  resetPosition,
  MoveText, handleMoveText, changeColor, makeDouble, addWatermarkRightBottom, isEmpty
} from './common';

const editImg6: Img = new Img();
const transEvent6: TransEvent = new TransEvent();
const moveTitle6: MoveText = new MoveText();
const chooseFileApp6 = document.getElementById("chooseFileApp6") as HTMLInputElement;
const selectedImageApp6 = document.getElementById("selectedImageApp6") as HTMLImageElement;
const submitBtnApp6 = document.getElementById("submitBtnApp6") as HTMLButtonElement;
const imageContainerApp6 = document.getElementById("imageContainerApp6") as HTMLDivElement;
const app6TitleColor = document.getElementById("app6TitleColor") as HTMLInputElement;
const app6Title = document.getElementById("app6Title") as HTMLInputElement;
const app6Inputs = document.querySelectorAll("#app6 input") as NodeListOf<HTMLInputElement>;
const app6Move = document.querySelectorAll("#app6 .move-edit") as NodeListOf<HTMLDivElement>;
const reset = document.querySelector('#app6 .selected-image-position-reset') as HTMLDivElement;
const chooseImg6: string = "chooseImg6";

handleChangeImage(
  chooseFileApp6,
  selectedImageApp6,
  editImg6,
  transEvent6,
  chooseImg6,
  submitBtnApp6
);
handleMoveText(app6Move[0], moveTitle6);
changeColor(app6TitleColor, app6Title);

reset.addEventListener('click', (e) =>
    resetPosition(e.target as HTMLElement, transEvent6, chooseImg6));

isMobile() && submitBtnApp6.addEventListener("touchstart", makeImageApp6);
!isMobile() && submitBtnApp6.addEventListener("click", makeImageApp6);

async function makeImageApp6() {
  event?.stopPropagation();
  // initialize canvas.
  imageContainerApp6.innerHTML = "";
  isEmpty(imageContainerApp6.nextElementSibling).innerHTML = "";
  inputNullCheck(app6Inputs, chooseFileApp6);

  const file = isEmpty(chooseFileApp6.files)[0];
  if (file) {
    imageContainerApp6.parentElement!.parentElement!.style.display = "block";
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
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.filter =
        "contrast(120%) brightness(90%) sepia(30%) hue-rotate(-30deg) blur(2px)";
      let canvasWidth = 1000 * transEvent6.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent6.moveX * 2;
      let y = transEvent6.moveY * 2 + editImg6.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      const title = app6Title.value.trim().toUpperCase();

      ctx.fillStyle = app6TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      ctx.textAlign = "center";
      ctx.font = "56px Montserrat Subrayada";
      ctx.filter = "opacity(0.77) blur(2px)";
      ctx.fillText(
        title.charAt(5),
        makeDouble(moveTitle6.newX, 525),
        makeDouble(moveTitle6.newY, 189)
      );
      ctx.font = "70px Montserrat Subrayada";
      ctx.filter = "opacity(0.8) blur(1.8px)";
      ctx.fillText(
        title.charAt(4),
        makeDouble(moveTitle6.newX, 583),
        makeDouble(moveTitle6.newY, 265)
      );
      ctx.font = "110px Montserrat Subrayada";
      ctx.filter = "opacity(0.85) blur(1.5px)";
      ctx.fillText(
        title.charAt(3),
        makeDouble(moveTitle6.newX, 500),
        makeDouble(moveTitle6.newY, 330)
      );
      ctx.font = "150px Montserrat Subrayada";
      ctx.filter = "opacity(0.89) blur(1.3px)";
      ctx.fillText(
        title.charAt(2),
        makeDouble(moveTitle6.newX, 450),
        makeDouble(moveTitle6.newY, 425)
      );
      ctx.font = "280px Monoton";
      ctx.filter = "opacity(0.92) blur(0.9px)";
      ctx.fillText(
        title.charAt(1),
        makeDouble(moveTitle6.newX, 550),
        makeDouble(moveTitle6.newY, 695)
      );
      ctx.font = "360px Alfa Slab One";
      ctx.filter = "opacity(0.98) blur(0.8px)";
      ctx.fillText(
        title.charAt(0),
        makeDouble(moveTitle6.newX, 410),
        makeDouble(moveTitle6.newY, 900)
      );

      let gradient = ctx.createRadialGradient(500, 0, 0, 500, 100, 800);
      gradient.addColorStop(0, "rgba(9, 12, 82, 0.5)");
      gradient.addColorStop(0.5, "rgba(9, 12, 82, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.fillStyle = "rgba(9, 12, 82, 1)";
      ctx.globalCompositeOperation = "lighten";
      ctx.filter = "blur(1px)";
      ctx.fillRect(0, 0, 1000, 1000);

      addWatermarkRightBottom(ctx, "white");
      imageContainerApp6.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp6.nextElementSibling as HTMLDivElement);
    };
  };
}
