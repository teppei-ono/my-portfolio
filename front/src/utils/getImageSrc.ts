/**
 * 画像の URL を返すユーティリティ関数。
 *
 * 渡された URL が存在し、かつ空文字でない場合はそのまま返却します。
 * 未定義・null・空文字（空白のみを含む文字列を含む）の場合は、
 * デフォルトの画像パスを返します。
 *
 * @param {string | null | undefined} url - 判定対象の画像 URL。未定義や null、空文字も可。
 * @returns {string} - 有効な URL の場合はその文字列、そうでない場合はデフォルト画像のパス
 * (`/assets/images/common/img_panel_default.png`) を返す。
 *
 * @example
 * getImageSrc('https://example.com/image.png');
 * // => 'https://example.com/image.png'
 *
 * @example
 * getImageSrc('');
 * // => '/assets/images/common/img_panel_default.png'
 *
 * @example
 * getImageSrc(undefined);
 * // => '/assets/images/common/img_panel_default.png'
 */
export const getImageSrc = (url?: string | null): string => {
  const fallback = '/assets/images/common/img_news_dummy.webp';
  return url?.trim() ? url : fallback;
};
