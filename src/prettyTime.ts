export function prettyDuration(time: number): string {
  // convert milliseconds to pretty time

  let output = "";

  const seconds = time / 1000;

  if (seconds < 1) {
    output = `${time}ms`;
  } else if (seconds < 60) {
    output = `${seconds.toFixed(2)}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    output = `${minutes}m ${remainingSeconds.toFixed(2)}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSeconds2 = remainingSeconds % 60;
    output = `${hours}h ${minutes}m ${remainingSeconds2.toFixed(2)}s`;
  }

  return output;
}
