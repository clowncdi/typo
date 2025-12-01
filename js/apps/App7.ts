import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, getToday, addWatermarkRightTop } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App7 extends BaseApp {
  private moveTitle: MoveText;
  private moveDate: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;
  private appDate: HTMLInputElement;

  constructor() {
    super({
      appId: 'app7',
      appName: 'Night Duty',
      fileInputId: 'chooseFileApp7',
      selectedImageId: 'selectedImageApp7',
      submitBtnId: 'submitBtnApp7',
      imageContainerId: 'imageContainerApp7',
      inputSelector: '#app7 input',
    });

    this.moveTitle = new MoveText();
    this.moveDate = new MoveText();
    this.appTitle = document.getElementById('app7Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app7TitleColor') as HTMLInputElement;
    this.appDate = document.getElementById('app7Date') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app7 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveDate);
    this.setupMoveText(moveElements[1], this.moveTitle);
    changeColor(this.appTitleColor, this.appTitle);
    changeColor(this.appTitleColor, this.appDate);

    this.init();
  }

  protected initializeDefaults(): void {
    this.appDate.value = getToday();
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.filter = 'contrast(110%)';
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.font = '76px Oswald';
    ctx.fillStyle = this.appTitleColor.value;
    ctx.textAlign = 'left';
    ctx.letterSpacing = '-1px';
    ctx.fillText(
      this.appTitle.value.toUpperCase(),
      makeDouble(this.moveTitle.newX, 146),
      makeDouble(this.moveTitle.newY, 860)
    );

    ctx.font = '44px Oswald';
    ctx.letterSpacing = '12px';
    ctx.fillText(
      this.appDate.value.replaceAll('-', '. '),
      makeDouble(this.moveDate.newX, 146),
      makeDouble(this.moveDate.newY, 775)
    );

    addWatermarkRightTop(ctx, 'white');
  }
}
