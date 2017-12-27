# Light scroll
Crossbrowser lightweight (only 3kb) JS scrollbar that you can easily restyle and configure. Light scroll supports all the events that native browser scroll does, such as scrollbar drag/click, arrow keys and mouse wheel scrolling.

## Usage
First you should determine which HTML blocks are supposed to be scrollable and add `lightscroll` attribute to such blocks
````html
<body>
    <div id="container" style="height:100vh" lightscroll>
        <!-- scrollable page -->
        <div lightscroll> <!-- scrollable block --> </div>
        <div lightscroll> <!-- scrollable block -->
            <div lightscroll>  <!-- scrollable child block --> </div>
        </div>
    </div>
</body>
````

Since lightscroll init function defined in global window object - you can init lightscroll wherever you want from any corner of your project. Example in your JS code.
````js
var recalculateBlock = window.initLightScroll({
    /* options */
})

var dynamicHeightBlock = document.querySelectorAll('[lightscroll]')[0]
setTimeout(() => { recalculateBlock(dynamicHeightBlock) }, 1000)
````
In example above we init lightScroll, calling `window.initLightScroll()`. Since there is no any hooks in browser to track block height change - you should recalculate block that has dynamic height manually. 
For such purposes init function returns `recalculateBlock` function. Simply call this function during the phase when height of _lightscroll block_ could be changed passing this lightscroll element.

### options 
`speed` - scroll speed when you use arrows and mouse wheel while scrolling.

### styling
You can rewrite scroll styles in your _.css_ file or recompile _.sass_ file using sass compilers.
Light scroll has 3 states. In _.sass_ file it separated into includes as to bring better user experience. In general mouse hovering over scroll elements determine all the states. Here are 3 _sass includes_ that describes all the states:
`scroll-initial` - when mouse is not hover a _lightscroll block_
`scroll-cont-hover` - when mouse is hover _lightscroll block_
`scroll_hover` - when mosue is hover a scroll bar
</br>
There is also 4th state you can't controll - scroll bar is hidding completely when _scrollHeigh == clientHeight_ of scroll block, in such cases `scroll-dissabled` class is toggle.

Having cloned the repository you can open _test.html_ in your browser and check how Light scroll works!
> So far Light scroll supports only vertical scroll and only desktop(no touch) devices. It's not a > NPM package yet so just simple copy-paste source JS and CSS to your project

Any suggestions and bug reports are welcomed :)
Have fun
