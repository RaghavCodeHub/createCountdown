import createTimer from ".";

describe('Create Timer', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.clearAllTimers()
  });

  it('calls listen and done after count down is complete', () => {
    const listenCallback = jest.fn();
    const doneCallback = jest.fn();
    const timer = createTimer({ h: 1, m: 30, s: 0 }, {
      listen: listenCallback,
      done: doneCallback
    });
    timer.start();
    jest.runAllTimers();
    expect(listenCallback).toHaveBeenCalledWith({
      h: 0,
      hh: '00',
      m: 0,
      mm: '00',
      s: 0,
      ss: '00'
    });
    expect(doneCallback).toHaveBeenCalled();
  });

  it('calls listen after one second countdown', () => {
    const listenCallback = jest.fn();
    const doneCallback = jest.fn();
    const timer = createTimer({ h: 1, m: 30, s: 0 }, {
      listen: listenCallback,
      done: doneCallback
    });
    timer.start();
    jest.advanceTimersByTime(1000);
    expect(listenCallback).toHaveBeenCalledTimes(2);
    expect(listenCallback.mock.calls[1][0]).toMatchInlineSnapshot(`
    Object {
      "h": 1,
      "hh": "01",
      "m": 29,
      "mm": "29",
      "s": 59,
      "ss": "59",
    }
    `);
    expect(doneCallback).not.toHaveBeenCalled();
  });

  it('calls clearInterval after initiating stop', () => {
    const listenCallback = jest.fn();
    const doneCallback = jest.fn();
    clearInterval = jest.fn();
    const timer = createTimer({ h: 1, m: 30, s: 0 }, {
      listen: listenCallback,
      done: doneCallback
    });
    timer.start();
    jest.advanceTimersByTime(1000);
    timer.stop();
    expect(clearInterval).toHaveBeenCalled();
    expect(listenCallback).toHaveBeenCalledTimes(2);
  });

  it('calls clearInterval and listen after initiating reset', () => {
    const listenCallback = jest.fn();
    const doneCallback = jest.fn();
    clearInterval = jest.fn();
    const timer = createTimer({ h: 1, m: 30, s: 0 }, {
      listen: listenCallback,
      done: doneCallback
    });
    timer.start();
    jest.advanceTimersByTime(1000);
    timer.reset();
    expect(clearInterval).toHaveBeenCalled();
    expect(listenCallback).toHaveBeenCalledTimes(3);
    expect(listenCallback.mock.calls[2][0]).toMatchInlineSnapshot(`
    Object {
      "h": 1,
      "hh": "01",
      "m": 30,
      "mm": "30",
      "s": 0,
      "ss": "00",
    }
    `);
  });
});
