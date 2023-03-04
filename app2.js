const originImg2 = JSON.parse(JSON.stringify(originImg));
const editImg2 = JSON.parse(JSON.stringify(editImg));
const transEvent2 = JSON.parse(JSON.stringify(transEvent));
const chooseFileApp2 = document.getElementById('chooseFileApp2');
const selectedImageApp2 = document.getElementById('selectedImageApp2');
const submitBtnApp2 = document.getElementById('submitBtnApp2');
const imageContainerApp2 = document.getElementById("imageContainerApp2");
const app2Title = document.getElementById("app2Title");
const app2Inputs = document.querySelectorAll("#app2 input");


chooseFileApp2.addEventListener('change', (e) => {
  // initialize
  imageValueReset(selectedImageApp2);

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    selectedImageApp2.style.backgroundColor = "#19202c";

    img.onload = () => {
      originImg2.width = img.width;
      originImg2.height = img.height;
      editImg2.height = (editImg.width * img.height) / img.width;
      transEvent2.startY = img.width >= img.height ? 0 : LONGIMGDEFAULTY;
      
      console.log(originImg2, editImg2, transEvent2)
      img.style.left = `${transEvent2.startX}px`;
      img.style.top = `${transEvent2.startY}px`;
      img.id = "chooseImg2";
      selectedImageApp2.appendChild(img);
      // 이미지 실시간 드래그로 위치 조정
      handleMouseDragEvent(selectedImageApp2, transEvent2, "chooseImg2");

      changeFileBtn(e.target);
      submitBtnApp2.style.marginRight = 0;
    }
  }
});

submitBtnApp2.addEventListener("click", async () => {
  // initialize canvas.
  imageContainerApp2.innerHTML = "";
  imageContainerApp2.nextElementSibling.innerHTML = "";
  inputNullCheck(app2Inputs, chooseFileApp2);

  const file = chooseFileApp2.files[0];
  const reader = new FileReader();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = async () => {
      const height50 = 48;
      const height100 = 97;
      canvas.width = 1000;
      canvas.height = 1000;
      ctx.fillStyle = "#19202C";
      ctx.fillRect(0, 0, 1000, 1000);
      let x = 0;
      let y = 0;
      if (img.width < img.height) {
        // 변형된 이미지의 가로 세로 비율. 4032 / (3024 / 1000) = 1.333
        let canvasWidth = 1000 * transEvent2.scale;
        let canvasHeight = (canvasWidth * img.height) / img.width;
        // 원본 이미지 높이를 변형된 이미지 높이로 나눈 비율.
        let ratio = img.height / canvasHeight;
        // 샘플 이미지에서 옮긴 y값만큼 원본 이미지의 비율로 y값 변환.
        let originX = transEvent2.moveX * ratio * -1;
        let originY = transEvent2.moveY * ratio * -1;
        
        x = transEvent2.moveX;
        y = transEvent2.moveY + (LONGIMGDEFAULTY*2);
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
          transEvent2.moveX * 2,
          transEvent2.moveY * 2 + startY,
          1000 * transEvent2.scale,
          canvasHeight * transEvent2.scale
        );
      }

      ctx.font = "120px Bodoni Moda";
      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";
      url && ctx.fillText(app2Title.value, 500, 100 + height50);

      ctx.font = "24px S-CoreDream-6Bold";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText(`${TYPOURL}`, 500, 980);

      imageContainerApp2.appendChild(canvas);
      addDownloadButton(canvas, imageContainerApp2.nextElementSibling);
    };
  };
});