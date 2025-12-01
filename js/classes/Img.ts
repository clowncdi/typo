// 이미지 치수 관리 클래스

export class Img {
  private _width: number = 0;
  private _height: number = 0;

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  set width(width: number) {
    this._width = width;
  }

  set height(height: number) {
    this._height = height;
  }

  getLongImageStartPositionX(): number {
    return (this._height - this._width) / 2;
  }

  getLongImageStartPositionY(): number {
    return (this._width - this._height) / 2;
  }

  reset(): void {
    this._width = 0;
    this._height = 0;
  }
}
