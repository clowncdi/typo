import { BaseApp } from '../classes/BaseApp';
import { MoveText } from '../classes/MoveText';
import { BGCOLOR } from '../core/constants';
import { makeDouble, addWatermarkRightBottom } from '../core/utils';
import { changeColor } from '../handlers/imageHandler';

export class App6 extends BaseApp {
  private moveTitle: MoveText;
  private appTitle: HTMLInputElement;
  private appTitleColor: HTMLInputElement;

  constructor() {
    super({
      appId: 'app6',
      appName: 'Go Home',
      fileInputId: 'chooseFileApp6',
      selectedImageId: 'selectedImageApp6',
      submitBtnId: 'submitBtnApp6',
      imageContainerId: 'imageContainerApp6',
      inputSelector: '#app6 input',
    });

    this.moveTitle = new MoveText();
    this.appTitle = document.getElementById('app6Title') as HTMLInputElement;
    this.appTitleColor = document.getElementById('app6TitleColor') as HTMLInputElement;

    const moveElements = document.querySelectorAll('#app6 .move-edit') as NodeListOf<HTMLElement>;
    this.setupMoveText(moveElements[0], this.moveTitle);
    changeColor(this.appTitleColor, this.appTitle);

    this.init();
  }

  protected initializeDefaults(): void {
    // No defaults for App6
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = BGCOLOR;
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.filter = 'contrast(120%) brightness(90%) sepia(30%) hue-rotate(-30deg) blur(2px)';

    this.drawBaseImage(ctx, img);

    const title = this.appTitle.value.trim().toUpperCase();

    ctx.fillStyle = this.appTitleColor.value;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    ctx.textAlign = 'center';

    ctx.font = '56px Montserrat Subrayada';
    ctx.filter = 'opacity(0.77) blur(2px)';
    ctx.fillText(
      title.charAt(5),
      makeDouble(this.moveTitle.newX, 525),
      makeDouble(this.moveTitle.newY, 189)
    );

    ctx.font = '70px Montserrat Subrayada';
    ctx.filter = 'opacity(0.8) blur(1.8px)';
    ctx.fillText(
      title.charAt(4),
      makeDouble(this.moveTitle.newX, 583),
      makeDouble(this.moveTitle.newY, 265)
    );

    ctx.font = '110px Montserrat Subrayada';
    ctx.filter = 'opacity(0.85) blur(1.5px)';
    ctx.fillText(
      title.charAt(3),
      makeDouble(this.moveTitle.newX, 500),
      makeDouble(this.moveTitle.newY, 330)
    );

    ctx.font = '150px Montserrat Subrayada';
    ctx.filter = 'opacity(0.89) blur(1.3px)';
    ctx.fillText(
      title.charAt(2),
      makeDouble(this.moveTitle.newX, 450),
      makeDouble(this.moveTitle.newY, 425)
    );

    ctx.font = '280px Monoton';
    ctx.filter = 'opacity(0.92) blur(0.9px)';
    ctx.fillText(
      title.charAt(1),
      makeDouble(this.moveTitle.newX, 550),
      makeDouble(this.moveTitle.newY, 695)
    );

    ctx.font = '360px Alfa Slab One';
    ctx.filter = 'opacity(0.98) blur(0.8px)';
    ctx.fillText(
      title.charAt(0),
      makeDouble(this.moveTitle.newX, 410),
      makeDouble(this.moveTitle.newY, 900)
    );

    const gradient = ctx.createRadialGradient(500, 0, 0, 500, 100, 800);
    gradient.addColorStop(0, 'rgba(9, 12, 82, 0.5)');
    gradient.addColorStop(0.5, 'rgba(9, 12, 82, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = 'rgba(9, 12, 82, 1)';
    ctx.globalCompositeOperation = 'lighten';
    ctx.filter = 'blur(1px)';
    ctx.fillRect(0, 0, 1000, 1000);

    addWatermarkRightBottom(ctx, 'white');
  }
}
