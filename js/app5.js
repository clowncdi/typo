const editImg5 = new Img();
const transEvent5 = new TransEvent();
const moveTitle5 = new MoveText();
const moveSub5 = new MoveText();
const moveDate5 = new MoveText();
const chooseFileApp5 = document.getElementById("chooseFileApp5");
const selectedImageApp5 = document.getElementById("selectedImageApp5");
const submitBtnApp5 = document.getElementById("submitBtnApp5");
const imageContainerApp5 = document.getElementById("imageContainerApp5");
const app5TitleColor = document.getElementById("app5TitleColor");
const app5Title = document.getElementById("app5Title");
const app5Sub = document.getElementById("app5Sub");
const app5StartDate = document.getElementById("app5StartDate");
const app5EndDate = document.getElementById("app5EndDate");
const app5Inputs = document.querySelectorAll("#app5 input");
const app5Move = document.querySelectorAll("#app5 .move-edit");
const chooseImg5 = "chooseImg5";

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
  imageContainerApp5.nextElementSibling.innerHTML = "";
  inputNullCheck(app5Inputs, chooseFileApp5);

  const file = chooseFileApp5.files[0];
  if (file) {
    imageContainerApp5.parentElement.parentElement.style.display = "block";
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
      addDownloadButton(canvas, imageContainerApp5.nextElementSibling);
    };
  };
}
