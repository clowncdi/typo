import { BaseApp } from '../classes/BaseApp';
import { BGCOLOR } from '../core/constants';
import { getToday, addWatermarkCenterBottom } from '../core/utils';
import { isEmpty } from '../core/utils';

export class App1 extends BaseApp {
  private lowTemp: HTMLInputElement;
  private highTemp: HTMLInputElement;
  private dateInput: HTMLInputElement;
  private country: HTMLInputElement;
  private city: HTMLInputElement;
  private url: HTMLInputElement;
  private icons: NodeListOf<HTMLElement>;
  private weatherUrl: string = '';

  constructor() {
    super({
      appId: 'app1',
      appName: 'Today Weather',
      fileInputId: 'fileInput',
      selectedImageId: 'selectedImage',
      submitBtnId: 'submitBtn',
      imageContainerId: 'imageContainer',
      inputSelector: '#app1 input',
    });

    this.lowTemp = document.getElementById('lowTemp') as HTMLInputElement;
    this.highTemp = document.getElementById('highTemp') as HTMLInputElement;
    this.dateInput = document.getElementById('dateInput') as HTMLInputElement;
    this.country = document.getElementById('country') as HTMLInputElement;
    this.city = document.getElementById('city') as HTMLInputElement;
    this.url = document.getElementById('url') as HTMLInputElement;
    this.icons = document.querySelectorAll('.weather-icon') as NodeListOf<HTMLElement>;

    this.setupWeatherIcons();
    this.setupNavScroll();
    this.init();
  }

  protected initializeDefaults(): void {
    this.dateInput.value = getToday();
    this.url.value = 'Weaco.co.kr';
    this.city.value = '서울';
    this.country.value = 'S.Korea, Seoul';
    const icon = this.icons.item(0).children[0] as HTMLImageElement;
    icon.classList.add('active');
    this.weatherUrl = icon.src.slice(icon.src.lastIndexOf('/'));
  }

  private setupWeatherIcons(): void {
    this.icons.forEach((icon) => {
      icon.addEventListener('click', (e) => {
        const target = isEmpty(e.target as HTMLImageElement);
        if (target.classList.contains('active')) {
          target.classList.remove('active');
          this.weatherUrl = '';
          return;
        }
        if (target.tagName === 'IMG' || target.tagName === 'svg') {
          this.icons.forEach((icon) => {
            icon.children[0].classList.remove('active');
          });
          target.classList.add('active');
          this.weatherUrl = target.src.slice(target.src.lastIndexOf('/'));
        }
      });
    });
  }

  private setupNavScroll(): void {
    const nav = document.getElementById('nav') as HTMLElement;
    document.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        nav.classList.add('show');
      } else {
        nav.classList.remove('show');
      }
    });
  }

  protected async processImage(file: File): Promise<void> {
    const reader = new FileReader();
    const reader2 = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas 2D 컨텍스트를 가져올 수 없습니다.');
      return;
    }

    let weatherIcon: Blob;
    try {
      const response = await fetch(this.weatherUrl);
      weatherIcon = await response.blob();
    } catch (error) {
      console.error('날씨 아이콘을 가져올 수 없습니다:', error);
      return;
    }

    reader.onerror = () => {
      console.error('파일 읽기 실패:', reader.error);
      alert('파일을 읽을 수 없습니다.');
    };

    reader2.onerror = () => {
      console.error('아이콘 파일 읽기 실패:', reader2.error);
    };

    reader.readAsDataURL(file);
    reader2.readAsDataURL(weatherIcon);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      const iconImg = new Image();
      iconImg.src = reader2.result as string;

      img.onerror = () => {
        console.error('이미지 로드 실패');
        alert('이미지를 불러올 수 없습니다.');
      };

      img.onload = () => {
        canvas.width = 1000;
        canvas.height = 1000;
        this.renderCanvas(ctx, img, canvas, iconImg);
      };
    };
  }

  protected renderCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement, iconImg?: HTMLImageElement): void {
    const height50 = 48;
    const height100 = 97;

    ctx.fillStyle = BGCOLOR;
    ctx.fillRect(0, 0, 1000, 1000);

    this.drawBaseImage(ctx, img);

    ctx.font = '50px S-CoreDream-6Bold';
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.textAlign = 'right';
    this.url && ctx.fillText(this.url.value, 950, 42 + height50);

    if (iconImg) {
      ctx.filter = 'opacity(1)';
      ctx.drawImage(iconImg, 50, 160);
    }

    const low = this.lowTemp.value;
    const high = this.highTemp.value;
    const date = this.dateInput.value.replaceAll('-', '');

    ctx.font = '50px S-CoreDream-3Light';
    ctx.textAlign = 'left';
    date && ctx.fillText(date.substring(0, 4), 60, 802 + height50);
    ctx.textAlign = 'right';
    this.country && ctx.fillText(this.country.value, 950, 792 + height50);

    ctx.font = '90px S-CoreDream-3Light';
    ctx.textAlign = 'left';
    const delim = 90 + Math.round(ctx.measureText(low).width);
    low && high && ctx.fillText('/', delim, 30 + height100);

    ctx.font = '100px S-CoreDream-6Bold';
    ctx.textAlign = 'left';
    low && ctx.fillText(low + '°', 44, 35 + height100);
    high && ctx.fillText(high + '°', 40 + ctx.measureText(low + '°/').width, 35 + height100);
    ctx.letterSpacing = '-1px';
    date && ctx.fillText(date.substring(4), 55, 856 + height100);
    ctx.textAlign = 'right';
    this.city && ctx.fillText(this.city.value, 950, 846 + height100);

    addWatermarkCenterBottom(ctx, 'white');
    this.imageContainer.appendChild(canvas);

    // Import dynamically to avoid circular dependency
    import('../core/utils').then(({ addDownloadButton }) => {
      addDownloadButton(canvas, this.imageContainer.nextElementSibling as HTMLElement);
    });
  }
}
