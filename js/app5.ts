import {
  addDownloadButton,
  BGCOLOR, handleChangeImage,
  Img,
  inputNullCheck,
  TransEvent,
  isMobile,
  resetPosition,
  MoveText, handleMoveText, changeColor, makeDouble, getToday, addWatermarkRightBottom, isEmpty
} from './common';

const editImg5: Img = new Img();
const transEvent5: TransEvent = new TransEvent();
const moveTitle5: MoveText = new MoveText();
const moveSub5: MoveText = new MoveText();
const moveDate5: MoveText = new MoveText();
const chooseFileApp5 = document.getElementById("chooseFileApp5") as HTMLInputElement;
const selectedImageApp5 = document.getElementById("selectedImageApp5") as HTMLImageElement;
const submitBtnApp5 = document.getElementById("submitBtnApp5") as HTMLButtonElement;
const imageContainerApp5 = document.getElementById("imageContainerApp5") as HTMLDivElement;
const app5TitleColor = document.getElementById("app5TitleColor") as HTMLInputElement;
const app5Title = document.getElementById("app5Title") as HTMLInputElement;
const app5Sub = document.getElementById("app5Sub") as HTMLInputElement;
const app5StartDate = document.getElementById("app5StartDate") as HTMLInputElement;
const app5EndDate = document.getElementById("app5EndDate") as HTMLInputElement;
const app5Inputs = document.querySelectorAll("#app5 input") as NodeListOf<HTMLInputElement>;
const app5Move = document.querySelectorAll("#app5 .move-edit") as NodeListOf<HTMLDivElement>;
const reset = document.querySelector('#app5 .selected-image-position-reset') as HTMLDivElement;
const chooseImg5: string = "chooseImg5";

handleChangeImage(
  chooseFileApp5,
  selectedImageApp5,
  editImg5,
  transEvent5,
  chooseImg5,
  submitBtnApp5
);
handleMoveText(app5Move[0], moveTitle5);
handleMoveText(app5Move[1], moveSub5);
handleMoveText(app5Move[2], moveDate5);
changeColor(app5TitleColor, app5Title);
changeColor(app5TitleColor, app5Sub);

reset.addEventListener('click', (e) =>
    resetPosition(e.target as HTMLElement, transEvent5, chooseImg5));

document.addEventListener("DOMContentLoaded", () => {
  app5StartDate.value = getToday();
  app5EndDate.value = getToday();
});

isMobile() && submitBtnApp5.addEventListener("touchstart", makeImageApp5);
!isMobile() && submitBtnApp5.addEventListener("click", makeImageApp5);

async function makeImageApp5() {
  gtag("event", "app5_create", {
    app_name: "Summer Vacation",
    event_date: new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp5.innerHTML = "";
  isEmpty(imageContainerApp5.nextElementSibling).innerHTML = "";
  inputNullCheck(app5Inputs, chooseFileApp5);

  const file = isEmpty(chooseFileApp5.files)[0];
  if (file) {
    imageContainerApp5.parentElement!.parentElement!.style.display = "block";
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
      let canvasWidth = 1000 * transEvent5.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent5.moveX * 2;
      let y = transEvent5.moveY * 2 + editImg5.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.font = "186px Monoton";
      ctx.fillStyle = app5TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";
      ctx.fillText(
        app5Title.value.toUpperCase(),
        makeDouble(moveTitle5.newX, 500),
        makeDouble(moveTitle5.newY, 550)
      );

      ctx.font = "300 130px Montserrat";
      ctx.letterSpacing = "35px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.fillText(
        app5Sub.value.toUpperCase(),
        makeDouble(moveSub5.newX, 525),
        makeDouble(moveSub5.newY, 680)
      );

      ctx.font = "400 38px Oswald";
      ctx.letterSpacing = "3px";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillText(
        app5StartDate.value.substring(5).replace("-", "."),
        makeDouble(moveDate5.newX, 420),
        makeDouble(moveDate5.newY, 830)
      );
      ctx.fillText(
        "~",
        makeDouble(moveDate5.newX, 500),
        makeDouble(moveDate5.newY, 830)
      );
      ctx.fillText(
        app5EndDate.value.substring(5).replace("-", "."),
        makeDouble(moveDate5.newX, 590),
        makeDouble(moveDate5.newY, 830)
      );

      addWatermarkRightBottom(ctx, "white");
      imageContainerApp5.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp5.nextElementSibling as HTMLElement);
    };
  };
}
