# Light scroll
Lightweight (3kb) js lib that supports scroll events such drag, arrowkey, mousewheel and scrollbar click
Simply add [data-scroll] to your html element that supposed to be srollable.
In your js
```js
    import init from '../light-scroll'
    init({
      scroll_speed: 25 // scroll speed when mousewheel or arrow-up(down) events are trigger
    })
```
So far this js scroll supports only vertical scroll and only desktop(no touch) devices. Will work on it
