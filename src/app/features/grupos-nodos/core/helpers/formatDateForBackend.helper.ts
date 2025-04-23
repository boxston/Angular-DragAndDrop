export function formatDateForBackend(date: Date): string {
    const pad = (num: number, size: number) => String(num).padStart(size, '0');
  
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1, 2);
    const dd = pad(date.getDate(), 2);
  
    const HH = pad(date.getHours(), 2);
    const mm = pad(date.getMinutes(), 2);
    const ss = pad(date.getSeconds(), 2);
    const SSSSSSS = pad(date.getMilliseconds() * 10000, 7);
  
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}.${SSSSSSS}`;
}
  