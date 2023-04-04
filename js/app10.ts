import {addDownloadButton, addWatermarkRightBottom, checkValue, isEmpty, isMobile} from "./common";

const submitBtnApp10 = document.getElementById("submitBtnApp10") as HTMLButtonElement;
const imageContainerApp10 = document.getElementById("imageContainerApp10") as HTMLDivElement;
const app10BgColor = document.getElementById("app10BgColor") as HTMLInputElement;
const app10TitleColor = document.getElementById("app10TitleColor") as HTMLInputElement;
const app10SubColor = document.getElementById("app10SubColor") as HTMLInputElement;
const app10Title = document.getElementById("app10Title") as HTMLInputElement;
const app10Sub = document.getElementById("app10Sub") as HTMLInputElement;
const app10Writer = document.getElementById("app10Writer") as HTMLInputElement;
const app10Inputs = document.querySelectorAll("#app10 input") as NodeListOf<HTMLInputElement>;
const app10Textarea = document.querySelectorAll("#app10 textarea") as NodeListOf<HTMLTextAreaElement>;

isMobile() && submitBtnApp10.addEventListener("touchstart", makeImageApp10);
!isMobile() && submitBtnApp10.addEventListener("click", makeImageApp10);

async function makeImageApp10() {
  // initialize canvas.
  imageContainerApp10.innerHTML = "";
  isEmpty(imageContainerApp10.nextElementSibling).innerHTML = "";
  app10Inputs.forEach((input) => checkValue(input));
  app10Textarea.forEach((textarea) => checkValue(textarea));

  imageContainerApp10.parentElement!.parentElement!.style.display = "block";

  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 1000;
  canvas.height = 1000;
  ctx.fillStyle = app10BgColor.value;
  ctx.fillRect(0, 0, 1000, 1000);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 117, 255, 0.2)";
  for (let i = 0; i < 13; i++) {
    ctx.moveTo(0, 140 + i * 62);
    ctx.lineTo(1000, 140 + i * 62);
  }
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 0, 0, 0.2)";
  ctx.moveTo(45, 0);
  ctx.lineTo(45, 1000);
  ctx.moveTo(50, 0);
  ctx.lineTo(50, 1000);
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = app10TitleColor.value;
  ctx.textAlign = "left";
  ctx.font = "120px PyeongChangPeace-Bold";
  ctx.filter = "opacity(0.95)";
  const title =
    app10Title.value === ""
      ? "Hello,\nStranger.".split("\n")
      : app10Title.value.split("\n");
  for (let i = 0; i < title.length; i++) {
    ctx.fillText(title[i], 90, 200 + i * 130);
  }

  ctx.fillStyle = app10SubColor.value;
  ctx.font = "90px S-CoreDream-3Light";
  const sub =
    app10Sub.value === ""
      ? "For sale:\nBaby shoes.\nNever worn.".split("\n")
      : app10Sub.value.split("\n");
  for (let i = 0; i < sub.length; i++) {
    ctx.fillText(sub[i], 90, 660 + i * 110);
  }

  ctx.font = "28px S-CoreDream-6Bold";
  const writer = app10Writer.value === "" ? "@plus.typo" : app10Writer.value;
  ctx.fillText(writer, 95, 960);

  addWatermarkRightBottom(ctx, "black");
  imageContainerApp10.appendChild(canvas);
  addDownloadButton(canvas, imageContainerApp10.nextElementSibling as HTMLDivElement);
}
