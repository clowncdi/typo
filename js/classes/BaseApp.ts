import { Img } from './Img';
import { TransEvent } from './TransEvent';
import { MoveText } from './MoveText';
import { isEmpty, isMobile, addDownloadButton } from '../core/utils';
import { handleChangeImage, resetPosition, inputNullCheck } from '../handlers/imageHandler';
import { handleMoveText } from '../handlers/dragHandler';

export interface AppConfig {
  appId: string;
  appName: string;
  fileInputId: string;
  selectedImageId: string;
  submitBtnId: string;
  imageContainerId: string;
  inputSelector: string;
  moveEditSelector?: string;
  colorInputIds?: string[];
  colorTargetIds?: string[];
}

export abstract class BaseApp {
  protected appId: string;
  protected appName: string;
  protected editImg: Img;
  protected transEvent: TransEvent;
  protected moveTexts: MoveText[] = [];

  protected fileInput: HTMLInputElement;
  protected selectedImage: HTMLImageElement;
  protected submitBtn: HTMLElement;
  protected imageContainer: HTMLElement;
  protected inputs: NodeListOf<HTMLInputElement>;
  protected resetBtn: HTMLElement | null;
  protected chooseImgKey: string;

  constructor(config: AppConfig) {
    this.appId = config.appId;
    this.appName = config.appName;
    this.editImg = new Img();
    this.transEvent = new TransEvent();
    this.chooseImgKey = `chooseImg${config.appId.replace('app', '')}`;

    this.fileInput = document.getElementById(config.fileInputId) as HTMLInputElement;
    this.selectedImage = document.getElementById(config.selectedImageId) as HTMLImageElement;
    this.submitBtn = document.getElementById(config.submitBtnId) as HTMLElement;
    this.imageContainer = document.getElementById(config.imageContainerId) as HTMLElement;
    this.inputs = document.querySelectorAll(config.inputSelector) as NodeListOf<HTMLInputElement>;
    this.resetBtn = document.querySelector(`#${config.appId} .selected-image-position-reset`);
  }

  protected init(): void {
    this.setupImageHandler();
    this.setupResetHandler();
    this.setupSubmitHandler();
    this.onDOMContentLoaded();
  }

  protected setupImageHandler(): void {
    handleChangeImage(
      this.fileInput,
      this.selectedImage,
      this.editImg,
      this.transEvent,
      this.chooseImgKey,
      this.submitBtn
    );
  }

  protected setupResetHandler(): void {
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', (e) => {
        resetPosition(e.target as HTMLElement, this.transEvent, this.chooseImgKey);
      });
    }
  }

  protected setupSubmitHandler(): void {
    const handler = (evt?: Event) => this.makeImage(evt);
    if (isMobile()) {
      this.submitBtn.addEventListener('touchstart', handler);
    } else {
      this.submitBtn.addEventListener('click', handler);
    }
  }

  protected setupMoveText(element: HTMLElement, moveText: MoveText): void {
    this.moveTexts.push(moveText);
    handleMoveText(element, moveText);
  }

  protected onDOMContentLoaded(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeDefaults();
    });
  }

  protected async makeImage(evt?: Event): Promise<void> {
    evt?.stopPropagation();

    this.imageContainer.innerHTML = '';
    isEmpty(this.imageContainer.nextElementSibling).innerHTML = '';
    inputNullCheck(this.inputs, this.fileInput);

    const files = this.fileInput.files;
    if (!files || files.length === 0) {
      return;
    }

    const parentEl = this.imageContainer.parentElement?.parentElement;
    if (parentEl) {
      parentEl.style.display = 'block';
    }

    const file = files[0];
    await this.processImage(file);
  }

  protected async processImage(file: File): Promise<void> {
    const reader = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas 2D 컨텍스트를 가져올 수 없습니다.');
      return;
    }

    reader.onerror = () => {
      console.error('파일 읽기 실패:', reader.error);
      alert('파일을 읽을 수 없습니다.');
    };

    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onerror = () => {
        console.error('이미지 로드 실패');
        alert('이미지를 불러올 수 없습니다.');
      };

      img.onload = async () => {
        canvas.width = 1000;
        canvas.height = 1000;

        this.renderCanvas(ctx, img, canvas);

        this.imageContainer.appendChild(canvas);
        addDownloadButton(canvas, this.imageContainer.nextElementSibling as HTMLElement);
      };
    };
  }

  protected drawBaseImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement): void {
    const canvasWidth = 1000 * this.transEvent.scale;
    const canvasHeight = (canvasWidth * img.height) / img.width;
    const x = this.transEvent.moveX * 2;
    const y = this.transEvent.moveY * 2 + this.editImg.getLongImageStartPositionY() * 2;
    ctx.drawImage(img, x, y, canvasWidth, canvasHeight);
  }

  protected abstract initializeDefaults(): void;
  protected abstract renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement): void;
}
