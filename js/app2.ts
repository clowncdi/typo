// 클래스
import { Img } from './classes/Img';
import { TransEvent } from './classes/TransEvent';
import { MoveText } from './classes/MoveText';
// 상수
import { BGCOLOR } from './core/constants';
// 유틸리티
import { isEmpty, isMobile, makeDouble, addDownloadButton, addWatermarkCenterBottom } from './core/utils';
// 핸들러
import { handleChangeImage, resetPosition, inputNullCheck, changeColor } from './handlers/imageHandler';
import { handleMoveText } from './handlers/dragHandler';

class App2 {
  private editImg: Img;
  private transEvent: TransEvent;
  private moveText: MoveText;
  private readonly chooseImgId: string = "chooseImg2";

  private chooseFileApp: HTMLInputElement;
  private selectedImageApp: HTMLImageElement;
  private submitBtnApp: HTMLButtonElement;
  private imageContainerApp: HTMLDivElement;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;
  private appInputs: NodeListOf<HTMLInputElement>;
  private appMove: NodeListOf<HTMLDivElement>;
  private resetBtn: HTMLDivElement;

  constructor() {
    this.editImg = new Img();
    this.transEvent = new TransEvent();
    this.moveText = new MoveText();

    this.chooseFileApp = document.getElementById("chooseFileApp2") as HTMLInputElement;
    this.selectedImageApp = document.getElementById("selectedImageApp2") as HTMLImageElement;
    this.submitBtnApp = document.getElementById("submitBtnApp2") as HTMLButtonElement;
    this.imageContainerApp = document.getElementById("imageContainerApp2") as HTMLDivElement;
    this.appTitle = document.getElementById("app2Title") as HTMLInputElement;
    this.appTitleColor = document.getElementById("app2TitleColor") as HTMLInputElement;
    this.appInputs = document.querySelectorAll("#app2 input") as NodeListOf<HTMLInputElement>;
    this.appMove = document.querySelectorAll("#app2 .move-edit") as NodeListOf<HTMLDivElement>;
    this.resetBtn = document.querySelector('#app2 .selected-image-position-reset') as HTMLDivElement;

    this.init();
  }

  private init(): void {
    handleChangeImage(
      this.chooseFileApp,
      this.selectedImageApp,
      this.editImg,
      this.transEvent,
      this.chooseImgId,
      this.submitBtnApp
    );

    handleMoveText(this.appMove[0], this.moveText);
    changeColor(this.appTitleColor, this.appTitle);

    this.resetBtn.addEventListener('click', (e) =>
      resetPosition(e.target as HTMLElement, this.transEvent, this.chooseImgId)
    );

    const eventName = isMobile() ? "touchstart" : "click";
    this.submitBtnApp.addEventListener(eventName, this.generateImage.bind(this));
  }

  private async generateImage(event: Event): Promise<void> {
    event?.stopPropagation();

    // Initialize UI
    this.imageContainerApp.innerHTML = "";
    isEmpty(this.imageContainerApp.nextElementSibling).innerHTML = "";
    inputNullCheck(this.appInputs, this.chooseFileApp);

    const file = isEmpty(this.chooseFileApp.files)[0];
    if (file) {
      this.imageContainerApp.parentElement!.parentElement!.style.display = "block";
    } else {
      return;
    }

    try {
      const dataUrl = await this.readFile(file);
      const img = await this.loadImage(dataUrl);
      this.drawCanvas(img);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  private drawCanvas(img: HTMLImageElement): void {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = 1000;
    canvas.height = 1000;

    // Background
    ctx.fillStyle = BGCOLOR;
    ctx.fillRect(0, 0, 1000, 1000);

    // Draw Image
    const canvasWidth = 1000 * this.transEvent.scale;
    const canvasHeight = (canvasWidth * img.height) / img.width;
    const x = this.transEvent.moveX * 2;
    const y = this.transEvent.moveY * 2 + this.editImg.getLongImageStartPositionY() * 2;
    ctx.drawImage(img, x, y, canvasWidth, canvasHeight);

    // Draw Text
    ctx.font = "120px Bodoni Moda";
    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = "center";
    ctx.fillText(
      this.appTitle.value,
      makeDouble(this.moveText.newX, 500),
      makeDouble(this.moveText.newY, 170)
    );

    // Watermark & Download
    addWatermarkCenterBottom(ctx, "white");
    this.imageContainerApp.appendChild(canvas);
    addDownloadButton(canvas, this.imageContainerApp.nextElementSibling as HTMLDivElement);
  }
}

new App2();
