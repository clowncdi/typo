// 텍스트 이동 상태 관리 클래스

export class MoveText {
  private _isDrag: boolean = false;
  private _startX: number = 0;
  private _startY: number = 0;
  private _newX: number = 0;
  private _newY: number = 0;

  get isDrag(): boolean { return this._isDrag; }
  get startX(): number { return this._startX; }
  get startY(): number { return this._startY; }
  get newX(): number { return this._newX; }
  get newY(): number { return this._newY; }

  set isDrag(value: boolean) { this._isDrag = value; }
  set startX(value: number) { this._startX = value; }
  set startY(value: number) { this._startY = value; }
  set newX(value: number) { this._newX = value; }
  set newY(value: number) { this._newY = value; }

  reset(): void {
    this._isDrag = false;
    this._startX = 0;
    this._startY = 0;
    this._newX = 0;
    this._newY = 0;
  }
}
