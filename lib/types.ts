export interface ImageSpec {
  label: string;
  size: string;
  ratio?: string;
  formats: string[];
  maxSizeKB?: number;
  maxSizeMB?: number;
  notes?: string;
}

export interface TextField {
  id: string;
  label: string;
  maxLength: number;
  unit: 'char' | 'byte';
  description?: string;
  required?: boolean;
}

export interface AdFormat {
  id: string;
  name: string;
  imageSpecs: ImageSpec[];
  textFields: TextField[];
  notes?: string[];
  guideImages?: string[];   // 레이아웃/가이드 이미지 경로 (/images/...)
  exampleImages?: string[]; // 완성 소재 예시 이미지 경로 (/images/...)
}

export interface MediaChannel {
  id: string;
  name: string;
  platform: string;
  color: string;
  formats: AdFormat[];
}

export interface Submission {
  channel_id: string;
  format_id: string;
  field_id: string;
  value: string;
}
