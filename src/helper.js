export const msInfoHeaderFormat = (ms) => {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  hours = hours % 24;

  return hours > 1
    ? `${hours} 小時 ${minutes}分`
    : `${minutes} 分 ${seconds - minutes * 60}秒`;
};

export const msSongListFormat = (ms) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
