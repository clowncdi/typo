const originImg6 = new Img();
const editImg6 = new Img();
const transEvent6 = new TransEvent();
const chooseFileApp6 = document.getElementById("chooseFileApp6");
const selectedImageApp6 = document.getElementById("selectedImageApp6");
const submitBtnApp6 = document.getElementById("submitBtnApp6");
const imageContainerApp6 = document.getElementById("imageContainerApp6");
const app6TitleColor = document.getElementById("app6TitleColor");
const app6Title = document.getElementById("app6Title");
const app6Inputs = document.querySelectorAll("#app6 input");

chooseFileApp6.addEventListener("change", (e) => {
  // initialize
  imageValueReset(selectedImageApp6, originImg6, editImg6, transEvent6);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp6.style.backgroundColor = BGCOLOR;

    img.onload = () => {
      originImg6.width = img.width;
      originImg6.height = img.height;
      editImg6.height = (editImg6.width * img.height) / img.width;
      transEvent6.startY = img.width >= img.height ? 0 : editImg6.getLongImageStartPositionY();

      img.style.left = `${transEvent6.startX}px`;
      img.style.top = `${transEvent6.startY}px`;
      img.id = "chooseImg6";
      selectedImageApp6.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp6, transEvent6, "chooseImg6");

      changeFileBtn(e.target);
      submitBtnApp6.style.marginRight = 0;
    };
  };
});

isMobile() && submitBtnApp6.addEventListener("touchstart", makeImageApp6);
!isMobile() && submitBtnApp6.addEventListener("click", makeImageApp6);

async function makeImageApp6() {
  gtag('event', 'app6_create', {
    'app_name': 'Go Home',
    'event_date': new Date().toLocaleString(),
  });
  // initialize canvas.
  imageContainerApp6.innerHTML = "";
  imageContainerApp6.nextElementSibling.innerHTML = "";
  inputNullCheck(app6Inputs, chooseFileApp6);

  const file = chooseFileApp6.files[0];
  if (file) {
    imageContainerApp6.parentElement.parentElement.style.display = "block";
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
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.filter = "contrast(120%) brightness(90%) sepia(30%) hue-rotate(-30deg) blur(2px)";
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent6.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent6.moveX * ratio * -1;
        let originY = transEvent6.moveY * ratio * -1;

        x = transEvent6.moveX;
        y = transEvent6.moveY + editImg6.getLongImageStartPositionY() * 2;
        ctx.drawImage(
          img,
          originX,
          originY,
          img.width,
          img.height,
          x,
          y,
          canvasWidth,
          canvasHeight
        );
      } else {
        // original width : original height = width resize : height resize
        // height resize = (width resize * original height) / original width
        let canvasHeight = (1000 * img.height) / img.width;
        let startY = img.width === img.height ? 0 : (1000 - canvasHeight) / 2;
        ctx.drawImage(
          img,
          x,
          y,
          img.width,
          img.height,
          transEvent6.moveX * 2,
          transEvent6.moveY * 2 + startY,
          1000 * transEvent6.scale,
          canvasHeight * transEvent6.scale
        );
      }

      const title = app6Title.value.trim().toUpperCase();

      ctx.fillStyle = app6TitleColor.value;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = '5px';
      ctx.textAlign = "center";
      ctx.font = "56px Montserrat Subrayada";
      ctx.filter = "opacity(0.77) blur(2px)";
      ctx.fillText(title.charAt(5), 525, 189);
      ctx.font = "70px Montserrat Subrayada";
      ctx.filter = "opacity(0.8) blur(1.8px)";
      ctx.fillText(title.charAt(4), 583, 265);
      ctx.font = "110px Montserrat Subrayada";
      ctx.filter = "opacity(0.85) blur(1.5px)";
      ctx.fillText(title.charAt(3), 500, 330);
      ctx.font = "150px Montserrat Subrayada";
      ctx.filter = "opacity(0.89) blur(1.3px)";
      ctx.fillText(title.charAt(2), 450, 425);
      ctx.font = "280px Monoton";
      ctx.filter = "opacity(0.92) blur(0.9px)";
      ctx.fillText(title.charAt(1), 550, 695);
      ctx.font = "360px Alfa Slab One";
      ctx.filter = "opacity(0.98) blur(0.8px)";
      ctx.fillText(title.charAt(0), 410, 900);
      
      let gradient = ctx.createRadialGradient(500, 0, 0, 500, 100, 800);
      gradient.addColorStop(0, "rgba(9, 12, 82, 0.5)");
      gradient.addColorStop(0.5, "rgba(9, 12, 82, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.fillStyle = "rgba(9, 12, 82, 1)";
      ctx.globalCompositeOperation = "lighten";
      ctx.filter = "blur(1px)";
      ctx.fillRect(0, 0, 1000, 1000);

      addWatermarkRightBottom(ctx, 'white');
      imageContainerApp6.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp6.nextElementSibling);
    };
  };
}
