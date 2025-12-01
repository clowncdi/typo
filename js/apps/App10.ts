import { isMobile, isEmpty, checkValue, addDownloadButton, addWatermarkRightBottom } from '../core/utils';

export class App10 {
  private submitBtn: HTMLButtonElement;
  private imageContainer: HTMLDivElement;
  private bgColor: HTMLInputElement;
  private titleColor: HTMLInputElement;
  private subColor: HTMLInputElement;
  private title: HTMLInputElement;
  private sub: HTMLInputElement;
  private writer: HTMLInputElement;
  private inputs: NodeListOf<HTMLInputElement>;
  private textareas: NodeListOf<HTMLTextAreaElement>;

  constructor() {
    this.submitBtn = document.getElementById('submitBtnApp10') as HTMLButtonElement;
    this.imageContainer = document.getElementById('imageContainerApp10') as HTMLDivElement;
    this.bgColor = document.getElementById('app10BgColor') as HTMLInputElement;
    this.titleColor = document.getElementById('app10TitleColor') as HTMLInputElement;
    this.subColor = document.getElementById('app10SubColor') as HTMLInputElement;
    this.title = document.getElementById('app10Title') as HTMLInputElement;
    this.sub = document.getElementById('app10Sub') as HTMLInputElement;
    this.writer = document.getElementById('app10Writer') as HTMLInputElement;
    this.inputs = document.querySelectorAll('#app10 input') as NodeListOf<HTMLInputElement>;
    this.textareas = document.querySelectorAll('#app10 textarea') as NodeListOf<HTMLTextAreaElement>;

    this.init();
  }

  private init(): void {
    const handler = (evt?: Event) => this.makeImage(evt);
    if (isMobile()) {
      this.submitBtn.addEventListener('touchstart', handler);
    } else {
      this.submitBtn.addEventListener('click', handler);
    }
  }

  private async makeImage(evt?: Event): Promise<void> {
    evt?.stopPropagation();

    this.imageContainer.innerHTML = '';
    isEmpty(this.imageContainer.nextElementSibling).innerHTML = '';
    this.inputs.forEach((input) => checkValue(input));
    this.textareas.forEach((textarea) => checkValue(textarea));

    const parentEl = this.imageContainer.parentElement?.parentElement;
    if (parentEl) {
      parentEl.style.display = 'block';
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas 2D 컨텍스트를 가져올 수 없습니다.');
      return;
    }

    canvas.width = 1000;
    canvas.height = 1000;

    // Background
    ctx.fillStyle = this.bgColor.value;
    ctx.fillRect(0, 0, 1000, 1000);

    // Draw horizontal lines
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 117, 255, 0.2)';
    for (let i = 0; i < 13; i++) {
      ctx.moveTo(0, 140 + i * 62);
      ctx.lineTo(1000, 140 + i * 62);
    }
    ctx.stroke();
    ctx.closePath();

    // Draw vertical lines
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.moveTo(45, 0);
    ctx.lineTo(45, 1000);
    ctx.moveTo(50, 0);
    ctx.lineTo(50, 1000);
    ctx.stroke();
    ctx.closePath();

    // Title
    ctx.fillStyle = this.titleColor.value;
    ctx.textAlign = 'left';
    ctx.font = '120px PyeongChangPeace-Bold';
    ctx.filter = 'opacity(0.95)';
    const titleLines = this.title.value === ''
      ? 'Hello,\nStranger.'.split('\n')
      : this.title.value.split('\n');
    for (let i = 0; i < titleLines.length; i++) {
      ctx.fillText(titleLines[i], 90, 200 + i * 130);
    }

    // Subtitle
    ctx.fillStyle = this.subColor.value;
    ctx.font = '90px S-CoreDream-3Light';
    const subLines = this.sub.value === ''
      ? 'For sale:\nBaby shoes.\nNever worn.'.split('\n')
      : this.sub.value.split('\n');
    for (let i = 0; i < subLines.length; i++) {
      ctx.fillText(subLines[i], 90, 660 + i * 110);
    }

    // Writer
    ctx.font = '28px S-CoreDream-6Bold';
    const writerText = this.writer.value === '' ? '@plus.typo' : this.writer.value;
    ctx.fillText(writerText, 95, 960);

    addWatermarkRightBottom(ctx, 'black');
    this.imageContainer.appendChild(canvas);
    addDownloadButton(canvas, this.imageContainer.nextElementSibling as HTMLDivElement);
  }
}
