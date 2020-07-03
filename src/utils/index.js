import dayjs from "dayjs";

// 防抖,time时间内,只有最后一次有效
export const debounce = (fn, time = 100) => {
  let timer = 0;
  return function () {
    const context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

// 节流,降低事件频率
export function throttle(fn, gapTime = 500) {
  let _lastTime = null;

  return function (...args) {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn(...args);
      _lastTime = _nowTime;
    }
  };
}

export const fmt = (s) => (v) => (dayjs(v).isValid() ? dayjs(v).format(s) : v);

export const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const ellipsis = (count) => (str) =>
  str.length > count ? str.substr(0, count) + "..." : str;
export const copy = (o) => JSON.parse(JSON.stringify(o));
export const ranger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const limit = (min, max) => (value) =>
  Math.max(Math.min(max, value), min);

export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  const result = JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
  return Object.keys(result).reduce(
    (p, k) => ({ ...p, [k.toLowerCase()]: result[k] }),
    {}
  );
}
