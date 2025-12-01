// 공통 타입 정의

export interface AppElements {
  fileInput: string;
  submitBtn: string;
  imageContainer: string;
  selectedImage: string;
  resetBtn: string;
  inputs: string[];
  moveEdits?: string[];
  titleColor?: string;
  title?: string;
  sub?: string;
  date?: string;
}

export interface RenderData {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  inputs: Record<string, string>;
  movePositions: Record<string, { x: number; y: number }>;
  transform: {
    scale: number;
    moveX: number;
    moveY: number;
    scaleMoveX: number;
    scaleMoveY: number;
  };
  editImg: {
    width: number;
    height: number;
    getLongImageStartPositionY: () => number;
  };
}

export interface AppConfig {
  appId: number;
  elements: AppElements;
  canvasSize: { width: number; height: number };
  hasImage: boolean;
  render: (data: RenderData) => void;
}
