// 변환(이동, 스케일) 이벤트 상태 관리 클래스

export class TransEvent {
  private _startX: number = 0;
  private _startY: number = 0;
  private _moveX: number = 0;
  private _moveY: number = 0;
  private _scale: number = 1;
  private _scaleMoveX: number = 0;
  private _scaleMoveY: number = 0;
  private _drag: boolean = false;

  get startX(): number { return this._startX; }
  get startY(): number { return this._startY; }
  get moveX(): number { return this._moveX; }
  get moveY(): number { return this._moveY; }
  get scale(): number { return this._scale; }
  get scaleMoveX(): number { return this._scaleMoveX; }
  get scaleMoveY(): number { return this._scaleMoveY; }
  get drag(): boolean { return this._drag; }

  set startX(value: number) { this._startX = value; }
  set startY(value: number) { this._startY = value; }
  set moveX(value: number) { this._moveX = value; }
  set moveY(value: number) { this._moveY = value; }
  set scale(value: number) { this._scale = value; }
  set scaleMoveX(value: number) { this._scaleMoveX = value; }
  set scaleMoveY(value: number) { this._scaleMoveY = value; }
  set drag(value: boolean) { this._drag = value; }

  reset(): void {
    this._startX = 0;
    this._startY = 0;
    this._moveX = 0;
    this._moveY = 0;
    this._scale = 1;
    this._scaleMoveX = 0;
    this._scaleMoveY = 0;
    this._drag = false;
  }
}
