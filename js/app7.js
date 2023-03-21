const editImg7 = new Img();
const transEvent7 = new TransEvent();
const moveTitle7 = new MoveText();
const moveDate7 = new MoveText();
const chooseFileApp7 = document.getElementById("chooseFileApp7");
const selectedImageApp7 = document.getElementById("selectedImageApp7");
const submitBtnApp7 = document.getElementById("submitBtnApp7");
const imageContainerApp7 = document.getElementById("imageContainerApp7");
const app7TitleColor = document.getElementById("app7TitleColor");
const app7Title = document.getElementById("app7Title");
const app7Date = document.getElementById("app7Date");
const app7Inputs = document.querySelectorAll("#app7 input");
const app7Move = document.querySelectorAll("#app7 .move-edit");
const chooseImg7 = "chooseImg7";

handleChangeImage(chooseFileApp7, selectedImageApp7, editImg7, transEvent7, chooseImg7, submitBtnApp7);
handleMoveText(app7Move[0], moveDate7);
handleMoveText(app7Move[1], moveTitle7);
changeColor(app7TitleColor, app7Title);
changeColor(app7TitleColor, app7Date);

document.addEventListener("DOMContentLoaded", () => {
  app7Date.value = getToday();
});

isMobile() && submitBtnApp7.addEventListener("touchstart", makeImageApp7);
!isMobile() && submitBtnApp7.addEventListener("click", makeImageApp7);

async function makeImageApp7() {
  gtag('event', 'app7_create', {
    'app_name': 'Night Duty',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp7.innerHTML = "";
  imageContainerApp7.nextElementSibling.innerHTML = "";
  inputNullCheck(app7Inputs, chooseFileApp7);

  const file = chooseFileApp7.files[0];
  if (file) {
    imageContainerApp7.parentElement.parentElement.style.display = "block";
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
      ctx.filter = "contrast(110%)";
      ctx.fillRect(0, 0, 1000, 1000);
      let canvasWidth = 1000 * transEvent7.scale;
      let canvasHeight = (canvasWidth * img.height) / img.width;
      let x = transEvent7.moveX * 2;
      let y = transEvent7.moveY * 2 + editImg7.getLongImageStartPositionY() * 2;
      ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

      ctx.font = "76px Oswald";
      ctx.fillStyle = app7TitleColor.value;
      ctx.textAlign = "left";
      ctx.letterSpacing = "-1px";
      ctx.fillText(app7Title.value.toUpperCase(), makeDouble(moveTitle7.newX, 146), makeDouble(moveTitle7.newY, 860));

      ctx.font = "44px Oswald";
      ctx.letterSpacing = "12px";
      ctx.fillText(app7Date.value.replaceAll("-", ". "), makeDouble(moveDate7.newX, 146), makeDouble(moveDate7.newY, 775));

      addWatermarkRightTop(ctx, 'white');
      imageContainerApp7.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp7.nextElementSibling);
    };
  };
}
