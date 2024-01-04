export function uid() {
  const timestamp = new Date().getTime();
  return parseInt(timestamp.toString().slice(-9), 10);
}
