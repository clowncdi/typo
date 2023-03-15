const submitBtnApp10 = document.getElementById("submitBtnApp10");
const imageContainerApp10 = document.getElementById("imageContainerApp10");
const app10BgColor = document.getElementById("app10BgColor");
const app10TitleColor = document.getElementById("app10TitleColor");
const app10SubColor = document.getElementById("app10SubColor");
const app10Title = document.getElementById("app10Title");
const app10Sub = document.getElementById("app10Sub");
const app10Writer = document.getElementById("app10Writer");
const app10Inputs = document.querySelectorAll("#app10 input");

mobile && submitBtnApp10.addEventListener("touchstart", makeImageApp10);
!mobile && submitBtnApp10.addEventListener("click", makeImageApp10);

async function makeImageApp10() {
  console.log(app10Title.value);
  // initialize canvas.
  imageContainerApp10.innerHTML = "";
  imageContainerApp10.nextElementSibling.innerHTML = "";
  app10Inputs.forEach((input) => checkValue(input));

  imageContainerApp10.parentElement.parentElement.style.display = "block";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
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
  const title = app10Title.value.split("\n");
  ctx.fillText(title[0], 90, 200);
  ctx.fillText(title[1], 90, 330);
  ctx.fillText(title[2], 90, 460);

  ctx.fillStyle = app10SubColor.value;
  ctx.font = "90px S-CoreDream-3Light";
  const sub = app10Sub.value.split("\n");
  ctx.fillText(sub[0], 90, 660);
  ctx.fillText(sub[1], 90, 770);
  ctx.fillText(sub[2], 90, 880);

  ctx.font = "28px S-CoreDream-6Bold";
  ctx.fillText(app10Writer.value, 95, 960);

  ctx.font = "24px S-CoreDream-6Bold";
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.letterSpacing = "0px";
  ctx.fillText(`${TYPOURL}`, 980, 980);

  imageContainerApp10.appendChild(canvas);
  console.log(imageContainerApp10);
  addDownloadButton(canvas, imageContainerApp10.nextElementSibling);
}
