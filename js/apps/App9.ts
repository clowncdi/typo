import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, addWatermarkRightBottom } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App9 extends BaseApp {
  private moveTitle: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;

  constructor() {
    super({
      appId: 'app9',
      appName: 'Spring',
      fileInputId: 'chooseFileApp9',
      selectedImageId: 'selectedImageApp9',
      submitBtnId: 'submitBtnApp9',
      imageContainerId: 'imageContainerApp9',
      inputSelector: '#app9 input',
    });

    this.moveTitle = new MoveText();
    this.appTitle = document.getElementById('app9Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app9TitleColor') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app9 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveTitle);
    changeColor(this.appTitleColor, this.appTitle);

    this.init();
  }

  protected initializeDefaults(): void {
    // No defaults for App9
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.filter = 'brightness(103%)';

    this.drawBaseImage(ctx, img);

    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = 'rgba(255, 110, 138, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'left';
    ctx.font = '110px Stalemate';
    ctx.filter = 'opacity(0.95)';
    ctx.fillText(
      this.appTitle.value,
      makeDouble(this.moveTitle.newX, 150),
      makeDouble(this.moveTitle.newY, 215)
    );

    addWatermarkRightBottom(ctx, 'white');
  }
}
