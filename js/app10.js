const submitBtnApp10 = document.getElementById("submitBtnApp10");
const imageContainerApp10 = document.getElementById("imageContainerApp10");
const app10TitleColor = document.getElementById("app10TitleColor");
const app10Title = document.getElementById("app10Title");
const app10Inputs = document.querySelectorAll("#app10 input");
const chooseImg10 = "chooseImg10";

mobile && submitBtnApp10.addEventListener("touchstart", makeImageApp10);
!mobile && submitBtnApp10.addEventListener("click", makeImageApp10);

async function makeImageApp10() {
  // initialize canvas.
  imageContainerApp10.innerHTML = "";
  imageContainerApp10.nextElementSibling.innerHTML = "";
  app10Inputs.forEach((input) => checkValue(input));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 1000;
  ctx.fillStyle = BGCOLOR;
  ctx.fillRect(0, 0, 1000, 1000);

  ctx.fillStyle = app10TitleColor.value;
  ctx.shadowColor = "rgba(255, 110, 138, 0.5)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.textAlign = "left";
  ctx.font = "110px Stalemate";
  ctx.filter = "opacity(0.95)";
  ctx.fillText(app10Title.value, 150, 215);
  
  ctx.font = "24px S-CoreDream-6Bold";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.letterSpacing = "0px";
  ctx.fillText(`${TYPOURL}`, 910, 980);

  imageContainerApp10.appendChild(canvas);
  console.log(imageContainerApp10);
  addDownloadButton(canvas, imageContainerApp10.nextElementSibling);
}
