// microCMSの共通型定義
export interface MicroCMSBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSBaseImage {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  fieldId: 'image';
  image: MicroCMSBaseImage;
  alt: string;
}

export type OmitMicroCMSBase<T extends MicroCMSBase> = Omit<T, keyof MicroCMSBase>;

export type OmitFieldId<T> = Omit<T, 'fieldId'>;

// 記事コンテンツの型定義例（汎用的）
export interface Blogs extends MicroCMSBase {
  title: string;
  content: string;
  thumbnail: MicroCMSBaseImage;
}