import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, getToday, addWatermarkRightTop } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App4 extends BaseApp {
  private moveTitle: MoveText;
  private moveSub: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;
  private appDate: HTMLInputElement;

  constructor() {
    super({
      appId: 'app4',
      appName: 'Perilla Leaf',
      fileInputId: 'chooseFileApp4',
      selectedImageId: 'selectedImageApp4',
      submitBtnId: 'submitBtnApp4',
      imageContainerId: 'imageContainerApp4',
      inputSelector: '#app4 input',
    });

    this.moveTitle = new MoveText();
    this.moveSub = new MoveText();
    this.appTitle = document.getElementById('app4Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app4TitleColor') as HTMLInputElement;
    this.appDate = document.getElementById('app4Date') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app4 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveTitle);
    this.setupMoveText(moveElements[1], this.moveSub);
    changeColor(this.appTitleColor, this.appTitle);

    this.init();
  }

  protected initializeDefaults(): void {
    this.appDate.value = getToday();
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.filter = 'contrast(110%) brightness(110%)';
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.font = '80px Pacifico';
    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = 'rgba(10, 10, 10, 0.6)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'center';

    const words = this.appTitle.value.split(' ');
    let topPosition = 730;
    for (const word of words) {
      ctx.fillText(
        word,
        makeDouble(this.moveTitle.newX, 500),
        makeDouble(this.moveTitle.newY, topPosition)
      );
      topPosition += 90;
    }

    ctx.font = '300 26px Montserrat Alternates';
    ctx.letterSpacing = '1px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(
      this.appDate.value.replaceAll('-', '. '),
      makeDouble(this.moveSub.newX, 500),
      makeDouble(this.moveSub.newY, 935)
    );

    addWatermarkRightTop(ctx, 'white');
  }
}
