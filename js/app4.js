const editImg4 = new Img();
const transEvent4 = new TransEvent();
const moveTitle4 = new MoveText();
const moveSub4 = new MoveText();
const chooseFileApp4 = document.getElementById("chooseFileApp4");
const selectedImageApp4 = document.getElementById("selectedImageApp4");
const submitBtnApp4 = document.getElementById("submitBtnApp4");
const imageContainerApp4 = document.getElementById("imageContainerApp4");
const app4TitleColor = document.getElementById("app4TitleColor");
const app4Title = document.getElementById("app4Title");
const app4Date = document.getElementById("app4Date");
const app4Inputs = document.querySelectorAll("#app4 input");
const app4Move = document.querySelectorAll("#app4 .app-move");
const chooseImg4 = "chooseImg4";

handleChangeImage(chooseFileApp4, selectedImageApp4, editImg4, transEvent4, chooseImg4, submitBtnApp4);
handleMoveText(app4Move[0], moveTitle4);
handleMoveText(app4Move[1], moveSub4);

document.addEventListener("DOMContentLoaded", () => {
  app4Date.value = getToday();
});

isMobile() && submitBtnApp4.addEventListener("touchstart", makeImageApp4);
!isMobile() && submitBtnApp4.addEventListener("click", makeImageApp4);

async function makeImageApp4() {
  gtag('event', 'app4_create', {
    'app_name': 'Perilla Leaf',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp4.innerHTML = "";
  imageContainerApp4.nextElementSibling.innerHTML = "";
  inputNullCheck(app4Inputs, chooseFileApp4);

  const file = chooseFileApp4.files[0];
  if (file) {
    imageContainerApp4.parentElement.parentElement.style.display = "block";
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
        ctx.fillText(word, makeDouble(moveTitle4.newX, 500), makeDouble(moveTitle4.newY, topPosition));
        topPosition += 90;
      }

      ctx.font = "300 26px Montserrat Alternates";
      ctx.letterSpacing = "1px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillText(app4Date.value.replaceAll("-", ". "), makeDouble(moveSub4.newX, 500), makeDouble(moveSub4.newY, 935));

      addWatermarkRightTop(ctx, 'white');
      imageContainerApp4.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp4.nextElementSibling);
    };
  };
}
