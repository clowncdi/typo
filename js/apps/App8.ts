import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { makeDouble, getToday, setFormattingDate, addWatermarkRightBottom } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App8 extends BaseApp {
  private moveTitle: MoveText;
  private moveSub: MoveText;
  private moveDate: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;
  private appSub: HTMLInputElement;
  private appDate: HTMLInputElement;

  constructor() {
    super({
      appId: 'app8',
      appName: 'IKEA',
      fileInputId: 'chooseFileApp8',
      selectedImageId: 'selectedImageApp8',
      submitBtnId: 'submitBtnApp8',
      imageContainerId: 'imageContainerApp8',
      inputSelector: '#app8 input',
    });

    this.moveTitle = new MoveText();
    this.moveSub = new MoveText();
    this.moveDate = new MoveText();
    this.appTitle = document.getElementById('app8Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app8TitleColor') as HTMLInputElement;
    this.appSub = document.getElementById('app8Sub') as HTMLInputElement;
    this.appDate = document.getElementById('app8Date') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app8 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveTitle);
    this.setupMoveText(moveElements[1], this.moveSub);
    this.setupMoveText(moveElements[2], this.moveDate);
    changeColor(this.appTitleColor, this.appTitle);
    changeColor(this.appTitleColor, this.appSub);
    changeColor(this.appTitleColor, this.appDate);

    this.init();
  }

  protected initializeDefaults(): void {
    this.appDate.value = getToday();
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.filter = 'contrast(110%) grayscale(100%)';
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillRect(0, 0, 1000, 1000);

    ctx.font = '900 240px Montserrat';
    ctx.fillStyle = this.appTitleColor.value;
    ctx.filter = 'opacity(0.6)';
    ctx.globalCompositeOperation = 'screen';
    ctx.textAlign = 'center';
    ctx.fillText(
      this.appTitle.value.toUpperCase(),
      makeDouble(this.moveTitle.newX, 500),
      makeDouble(this.moveTitle.newY, 580)
    );
    ctx.save();

    ctx.scale(0.9, 1);
    ctx.filter = 'opacity(1)';
    ctx.font = '100 48px Montserrat';
    ctx.letterSpacing = '35px';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText(
      this.appSub.value,
      makeDouble(this.moveSub.newX, 560),
      makeDouble(this.moveSub.newY, 675)
    );

    ctx.font = '100 32px Montserrat';
    ctx.letterSpacing = '15px';
    ctx.wordSpacing = '6px';
    ctx.fillText(
      setFormattingDate(this.appDate.value),
      makeDouble(this.moveDate.newX, 550),
      makeDouble(this.moveDate.newY, 926)
    );

    addWatermarkRightBottom(ctx, 'white');
  }
}
