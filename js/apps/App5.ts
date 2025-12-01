import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, getToday, addWatermarkRightBottom } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App5 extends BaseApp {
  private moveTitle: MoveText;
  private moveSub: MoveText;
  private moveDate: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;
  private appSub: HTMLInputElement;
  private appStartDate: HTMLInputElement;
  private appEndDate: HTMLInputElement;

  constructor() {
    super({
      appId: 'app5',
      appName: 'Summer Vacation',
      fileInputId: 'chooseFileApp5',
      selectedImageId: 'selectedImageApp5',
      submitBtnId: 'submitBtnApp5',
      imageContainerId: 'imageContainerApp5',
      inputSelector: '#app5 input',
    });

    this.moveTitle = new MoveText();
    this.moveSub = new MoveText();
    this.moveDate = new MoveText();
    this.appTitle = document.getElementById('app5Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app5TitleColor') as HTMLInputElement;
    this.appSub = document.getElementById('app5Sub') as HTMLInputElement;
    this.appStartDate = document.getElementById('app5StartDate') as HTMLInputElement;
    this.appEndDate = document.getElementById('app5EndDate') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app5 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveTitle);
    this.setupMoveText(moveElements[1], this.moveSub);
    this.setupMoveText(moveElements[2], this.moveDate);
    changeColor(this.appTitleColor, this.appTitle);
    changeColor(this.appTitleColor, this.appSub);

    this.init();
  }

  protected initializeDefaults(): void {
    this.appStartDate.value = getToday();
    this.appEndDate.value = getToday();
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.filter = 'contrast(110%) brightness(110%)';
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.font = '186px Monoton';
    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'center';
    ctx.fillText(
      this.appTitle.value.toUpperCase(),
      makeDouble(this.moveTitle.newX, 500),
      makeDouble(this.moveTitle.newY, 550)
    );

    ctx.font = '300 130px Montserrat';
    ctx.letterSpacing = '35px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fillText(
      this.appSub.value.toUpperCase(),
      makeDouble(this.moveSub.newX, 525),
      makeDouble(this.moveSub.newY, 680)
    );

    ctx.font = '400 38px Oswald';
    ctx.letterSpacing = '3px';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fillText(
      this.appStartDate.value.substring(5).replace('-', '.'),
      makeDouble(this.moveDate.newX, 420),
      makeDouble(this.moveDate.newY, 830)
    );
    ctx.fillText(
      '~',
      makeDouble(this.moveDate.newX, 500),
      makeDouble(this.moveDate.newY, 830)
    );
    ctx.fillText(
      this.appEndDate.value.substring(5).replace('-', '.'),
      makeDouble(this.moveDate.newX, 590),
      makeDouble(this.moveDate.newY, 830)
    );

    addWatermarkRightBottom(ctx, 'white');
  }
}
