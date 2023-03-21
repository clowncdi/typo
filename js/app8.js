const editImg8 = new Img();
const transEvent8 = new TransEvent();
const moveTitle8 = new MoveText();
const moveSub8 = new MoveText();
const moveDate8 = new MoveText();
const chooseFileApp8 = document.getElementById("chooseFileApp8");
const selectedImageApp8 = document.getElementById("selectedImageApp8");
const submitBtnApp8 = document.getElementById("submitBtnApp8");
const imageContainerApp8 = document.getElementById("imageContainerApp8");
const app8TitleColor = document.getElementById("app8TitleColor");
const app8Title = document.getElementById("app8Title");
const app8Sub = document.getElementById("app8Sub");
const app8Date = document.getElementById("app8Date");
const app8Inputs = document.querySelectorAll("#app8 input");
const app8Move = document.querySelectorAll('#app8 .move-edit');
const chooseImg8 = "chooseImg8";

handleChangeImage(chooseFileApp8, selectedImageApp8, editImg8, transEvent8, chooseImg8, submitBtnApp8);
handleMoveText(app8Move[0], moveTitle8);
handleMoveText(app8Move[1], moveSub8);
handleMoveText(app8Move[2], moveDate8);
changeColor(app8TitleColor, app8Title);
changeColor(app8TitleColor, app8Sub);
changeColor(app8TitleColor, app8Date);

document.addEventListener("DOMContentLoaded", () => {
  app8Date.value = getToday();
});

isMobile() && submitBtnApp8.addEventListener("touchstart", makeImageApp8);
!isMobile() && submitBtnApp8.addEventListener("click", makeImageApp8);

async function makeImageApp8() {
  gtag('event', 'app8_create', {
    'app_name': 'IKEA',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp8.innerHTML = "";
  imageContainerApp8.nextElementSibling.innerHTML = "";
  inputNullCheck(app8Inputs, chooseFileApp8);

  const file = chooseFileApp8.files[0];
  if (file) {
    imageContainerApp8.parentElement.parentElement.style.display = "block";
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
      ctx.filter = "contrast(110%) grayscale(100%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let canvasWidth = 1000 * transEvent8.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent8.moveX * 2;
      let y = transEvent8.moveY * 2 + editImg8.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.globalCompositeOperation = "overlay";
      ctx.fillRect(0, 0, 1000, 1000);

      ctx.font = "900 240px Montserrat";
      ctx.fillStyle = app8TitleColor.value;
      ctx.filter = "opacity(0.6)";
      ctx.globalCompositeOperation = "screen";
      ctx.textAlign = "center";
      ctx.fillText(app8Title.value.toUpperCase(), makeDouble(moveTitle8.newX, 500), makeDouble(moveTitle8.newY, 580));
      ctx.save();

      ctx.scale(0.9, 1);
      ctx.filter = "opacity(1)";
      ctx.globalCompositeOperation = "normal";
      ctx.font = "100 48px Montserrat";
      ctx.letterSpacing = "35px";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.fillText(app8Sub.value, makeDouble(moveSub8.newX, 560), makeDouble(moveSub8.newY, 675));

      ctx.font = "100 32px Montserrat";
      ctx.letterSpacing = "15px";
      ctx.wordSpacing = "6px";
      ctx.fillText(setFormattingDate(app8Date.value), makeDouble(moveDate8.newX, 550), makeDouble(moveDate8.newY, 926));

      addWatermarkRightBottom(ctx, 'white');
      imageContainerApp8.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp8.nextElementSibling);
    };
  };
}
