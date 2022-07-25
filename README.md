# createCountdown
Create a count down timer with a count down listener every second.

## Specification
```javascript
createCountdown(inputOptions[,callbackOptions])
```
* `inputOptions` `<Object>` Specify the time limit for the count down
    * `h` `<Number>` Time limit in hours
    * `m` `<Number>` Time limit in minutes
    * `s` `<Number>` Time limit in seconds
* `callbackOptions` `<Object>`
    * `listen` `<Function`> Listens every second of the count down
        * `countdown` `<Object>` Remaining time in the count down
            * `h` `<Number>` Remaining time in hours
            * `hh` `<String>` Remaining time in two digit hours (Single digit hours will be preceeded by zero)
            * `m` `<Number>` Remaining time in minutes
            * `mm` `<String>` Remaining time in two digit minutes (Single digit minutes will be preceeded by zero)
            * `s` `<Number>` Remaining time in seconds
            * `ss` `<String>` Remaining time in two digit seconds (Single digit seconds will be preceeded by zero)
    * `done` `<Function>` Called when the count down completes
* Returns: `<Object>`
    * `start` `<Function>` Starts the count down on timer
    * `stop` `<Function>` Stops the count down on the timer
    * `reset` `<Function>` Resets the count down on the timer
    * `set` `<Function>` Sets the count down on the timer

## Description
This module exports a single function that can used to set a timer, start the timer and listen to the remaining time in the count down every second. The listener is helpful in displaying the remaining time in any format that is desired. The remaining time is always split between hours, minutes and seconds. It doesn't have the consolidated time in seconds or minutes.

## Example
* Create a timer for 90 minutes
```javascript
const timer = createCountdown({
  h: 1,
  m: 30,
  s: 0  
}, {
  listen: ({hh, mm, ss}) => {
    console.log(`${hh}:${mm}:${ss}`)
  }
});
timer.start();
/*
01:30:00
01:29:59
...
*/
```
or
```javascript
const timer = createCountdown({
  h: 0,
  m: 90,
  s: 0  
}, {
  listen: ({h, mm, ss}) => {
    console.log(`${h}:${mm}:${ss}`)
  }
});
timer.start();
/*
1:30:00
1:29:59
...
*/
```
* Reset the timer
```javascript
const timer = createCountdown({
  h: 1,
  m: 30,
  s: 0  
}, {
  listen: ({hh, mm, ss}) => {
    console.log(`${hh}:${mm}:${ss}`)
  }
});
timer.start();
setTimeout(() => {
  timer.reset();
}, 1000);
/*
01:30:00
01:29:59
01:30:00
*/
```
* Stop the timer
```javascript
const timer = createCountdown({
  h: 1,
  m: 30,
  s: 0  
}, {
  listen: ({hh, mm, ss}) => {
    console.log(`${hh}:${mm}:${ss}`)
  }
});
timer.start();
setTimeout(() => {
  timer.stop();
}, 1000);
/*
01:30:00
01:29:59
*/
```
* Set a timer for 30 seconds
```javascript
const timer = createCountdown({}, {
  listen: ({hh, mm, ss}) => {
    console.log(`${hh}:${mm}:${ss}`)
  }
});
timer.set({
  h: 0, 
  m: 0,
  s: 30,
});
timer.start();
/*
00:00:30
00:00:29
...
*/
```