import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, addWatermarkCenterBottom } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App3 extends BaseApp {
  private moveTitle: MoveText;
  private moveSub: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;
  private appSub: HTMLInputElement;

  constructor() {
    super({
      appId: 'app3',
      appName: 'Bicycle Repair Shop',
      fileInputId: 'chooseFileApp3',
      selectedImageId: 'selectedImageApp3',
      submitBtnId: 'submitBtnApp3',
      imageContainerId: 'imageContainerApp3',
      inputSelector: '#app3 input',
    });

    this.moveTitle = new MoveText();
    this.moveSub = new MoveText();
    this.appTitle = document.getElementById('app3Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app3TitleColor') as HTMLInputElement;
    this.appSub = document.getElementById('app3Sub') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app3 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveTitle);
    this.setupMoveText(moveElements[1], this.moveSub);
    changeColor(this.appTitleColor, this.appTitle);

    this.init();
  }

  protected initializeDefaults(): void {
    // No defaults for App3
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.filter = 'grayscale(100%) contrast(110%) brightness(90%)';
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.filter = 'grayscale(0%)';
    ctx.font = '160px Bodoni Moda';
    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'center';
    ctx.fillText(
      this.appTitle.value,
      makeDouble(this.moveTitle.newX, 500),
      makeDouble(this.moveTitle.newY, 520)
    );

    ctx.font = '300 40px Roboto';
    ctx.letterSpacing = '16px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillText(
      this.appSub.value,
      makeDouble(this.moveSub.newX, 500),
      makeDouble(this.moveSub.newY, 600)
    );

    addWatermarkCenterBottom(ctx, 'white');
  }
}
