'use strict';

const convert = (time) => {
  const toTwoDigit = d => Math.floor(d / 10) + '' + (d % 10);
  const h = Math.floor(time / (60 * 60));
  const hh = toTwoDigit(h);
  let m = Math.floor(time / 60);
  m = ((m % 60) + 60) % 60;
  const mm = toTwoDigit(m);
  const s = time % 60;
  const ss = toTwoDigit(s);

  return {
    hh,
    h,
    mm,
    m,
    ss,
    s,
  };
};

const createCountdown = ({ h, m, s } = {}, { listen = () => { }, done = () => { } }) => {
  let limit = 0;
  let start = 0;
  let interval;

  const set = ({ h = 0, m = 0, s = 0 }) => {
    limit = h * 60 * 60 + m * 60 + s;
  };

  set({ h, m, s });

  return {
    start: () => {
      listen(convert(limit - start));
      interval = setInterval(() => {
        start += 1;
        listen(convert(limit - start));
        if (start === limit) {
          done();
          clearInterval(interval);
        }
      }, 1000);
    },
    reset: () => {
      start = 0;
      listen(convert(limit - start));
      clearInterval(interval);
    },
    stop: () => {
      clearInterval(interval);
    },
    set,
  };
};

export default createCountdown;
