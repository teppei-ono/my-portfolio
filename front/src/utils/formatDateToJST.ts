/**
 * UTC（ISO8601）形式の日付文字列を JST に変換し、
 * "YYYY.MM.DD" 形式で返す関数。
 *
 * @param isoString - 例: "2025-10-23T13:53:19.323Z"
 * @returns "2025.10.23"
 */
export const formatDateToJST = (isoString: string): string => {
  if (!isoString) return '';

  // ISO 文字列を Date に変換（この時点では UTC 扱い）
  const date = new Date(isoString);

  // JST に変換（UTC + 9 時間）
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  // "YYYY.MM.DD" の形式に整形
  const year = jst.getFullYear();
  const month = String(jst.getMonth() + 1).padStart(2, '0');
  const day = String(jst.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
