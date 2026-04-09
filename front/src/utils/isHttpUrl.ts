/**
 * 引数のURLがHTTP URLかどうかを判定する関数
 * @param href - 判定するURL
 * @returns httpから始まれば true, それ以外は false
 */
export function isHttpUrl(href: string) {
  return /^https?:\/\//i.test(href);
}