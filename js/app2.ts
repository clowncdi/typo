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

const editImg2: Img = new Img();
const transEvent2: TransEvent = new TransEvent();
const moveText2: MoveText = new MoveText();
const chooseFileApp2 = document.getElementById("chooseFileApp2") as HTMLInputElement;
const selectedImageApp2 = document.getElementById("selectedImageApp2") as HTMLImageElement;
const submitBtnApp2 = document.getElementById("submitBtnApp2") as HTMLButtonElement;
const imageContainerApp2 = document.getElementById("imageContainerApp2") as HTMLDivElement;
const app2Title = document.getElementById("app2Title") as HTMLInputElement;
const app2TitleColor = document.getElementById("app2TitleColor") as HTMLInputElement;
const app2Inputs = document.querySelectorAll("#app2 input") as NodeListOf<HTMLInputElement>;
const app2Move = document.querySelectorAll("#app2 .move-edit") as NodeListOf<HTMLDivElement>;
const reset = document.querySelector('#app2 .selected-image-position-reset') as HTMLDivElement;
const chooseImg2: string = "chooseImg2";

handleChangeImage(
  chooseFileApp2,
  selectedImageApp2,
  editImg2,
  transEvent2,
  chooseImg2,
  submitBtnApp2
);
handleMoveText(app2Move[0], moveText2);
changeColor(app2TitleColor, app2Title);

reset.addEventListener('click', (e) =>
    resetPosition(e.target as HTMLElement, transEvent2, chooseImg2));

isMobile() && submitBtnApp2.addEventListener("touchstart", makeImageApp2);
!isMobile() && submitBtnApp2.addEventListener("click", makeImageApp2);

async function makeImageApp2() {
  gtag("event", "app2_create", {
    app_name: "Yellow City",
    event_date: new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp2.innerHTML = "";
  isEmpty(imageContainerApp2.nextElementSibling).innerHTML = "";
  inputNullCheck(app2Inputs, chooseFileApp2);

  const file = isEmpty(chooseFileApp2.files)[0];
  if (file) {
    imageContainerApp2.parentElement!.parentElement!.style.display = "block";
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
      let canvasWidth = 1000 * transEvent2.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent2.moveX * 2;
      let y = transEvent2.moveY * 2 + editImg2.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.font = "120px Bodoni Moda";
      ctx.fillStyle = app2TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";
      ctx.fillText(
        app2Title.value,
        makeDouble(moveText2.newX, 500),
        makeDouble(moveText2.newY, 170)
      );

      addWatermarkCenterBottom(ctx, "white");
      imageContainerApp2.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp2.nextElementSibling as HTMLDivElement);
    };
  };
}
