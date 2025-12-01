import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, addWatermarkCenterBottom } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App2 extends BaseApp {
  private moveText: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;

  constructor() {
    super({
      appId: 'app2',
      appName: 'Yellow City',
      fileInputId: 'chooseFileApp2',
      selectedImageId: 'selectedImageApp2',
      submitBtnId: 'submitBtnApp2',
      imageContainerId: 'imageContainerApp2',
      inputSelector: '#app2 input',
    });

    this.moveText = new MoveText();
    this.appTitle = document.getElementById('app2Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app2TitleColor') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app2 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveText);
    changeColor(this.appTitleColor, this.appTitle);

    this.init();
  }

  protected initializeDefaults(): void {
    // No defaults for App2
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.font = '120px Bodoni Moda';
    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'center';
    ctx.fillText(
      this.appTitle.value,
      makeDouble(this.moveText.newX, 500),
      makeDouble(this.moveText.newY, 170)
    );

    addWatermarkCenterBottom(ctx, 'white');
  }
}
