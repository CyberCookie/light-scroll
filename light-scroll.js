window.initLightScroll = options => {
  if (isTouch()) {return false}
  var sсrollContainers = document.querySelectorAll('[lightscroll]'),
      scrollData = [],
      keyScrollData = {},
      isMS = window.navigator.userAgent.includes('Edge'),
      scroll_speed = 15;
  
  options && options.speed && (scroll_speed = options.speed)

  for (let i = 0; i < sсrollContainers.length; i++) {
    let container = sсrollContainers[i],
        scroll = injectScroll(container, i),
        top = 0,
        { maxHeight, height, _kw_deltaTop } = recalculateScroll(scroll, container);

    container.style['overflow-y'] = 'hidden'

    scrollData[i] = { scroll, top, height, container, maxHeight, _kw_deltaTop }

    initEvents(scrollData[i])
  }
  
  function recalculateScroll(scroll, container) {
    var { clientHeight, scrollHeight, classList } = container;
    clientHeight == scrollHeight ? classList.add('scroll-dissabled') : classList.remove('scroll-dissabled');

    var maxHeight = scroll.parentNode.clientHeight,
        height = (maxHeight * clientHeight) / scrollHeight,
        _kw_deltaTop = Math.ceil((maxHeight - height) * (scroll_speed / (scrollHeight - clientHeight)));

    scroll.style['height'] = height + 'px';
    
    return { maxHeight, height, _kw_deltaTop } 
  }
  
  function scrollUpdate(scrollContainer) {
    var data = scrollData[scrollContainer.getAttribute('lightscroll')];
    data.scroll.parentNode.style['margin-top'] = '0px';
    
    var { maxHeight, height, _kw_scrollTop } = recalculateScroll(data.scroll, scrollContainer)
    Object.assign(data, { maxHeight, height, _kw_scrollTop })
    
    if ((data.top + height) > maxHeight) {
      data.top = maxHeight - height
      data.scroll.style['top'] = data.top + 'px'
    }
    
    data.scroll.parentNode.style['margin-top'] = scrollContainer.scrollTop + 'px'
  }
  
  function isTouch() {
    try { return document.createEvent("TouchEvent") } 
    catch (e) { return false }
  }
  
  function injectScroll(elem, index) {
    var scroll = document.createElement('div');
    
    scroll.classList.add('scroll-bar')
    scroll.innerHTML += ('<div class="scroll" lightscroll-id="' + index + '"></div>')
    elem.appendChild(scroll)
    elem.setAttribute('lightscroll', index)
    
    return scroll.firstChild
  }
  
  function doScroll(top, scrollValue, scrollData, isException = true) {
    let { scroll, container } = scrollData;
    
    container.scrollTop = isException ? scrollValue : (container.scrollTop += scrollValue)
    scroll.style['top'] = top + 'px';
    scroll.parentNode.style['margin-top'] = container.scrollTop + 'px'
    
    scrollData.top = top
  }

  function keyWheelScroll(e, scrollData) {
    if (scrollData.container.classList.contains('scroll-dissabled')) {return false}
    isMS && e.preventDefault()
    e.stopPropagation()
    
    let { scroll, height, maxHeight, top, _kw_deltaTop, container } = scrollData,
        scrollSpeed = scroll_speed,
        newTop = top;

    if (e.deltaY < 0 || e.keyCode == 38 || e.keyCode == 33) {
      newTop -= _kw_deltaTop;
      newTop < 0 ? doScroll(0, 0, scrollData) : doScroll(newTop, -scrollSpeed, scrollData, false)
    } else if (e.deltaY > 0 || e.keyCode == 40 || e.keyCode == 34) {
      newTop += _kw_deltaTop;
      if ((newTop + height) > maxHeight) {
        doScroll(Math.ceil(maxHeight - height), container.scrollHeight, scrollData)
      } else {
        doScroll(newTop, scrollSpeed, scrollData, false)
      }
    }
  }
  
  function keyScroll(e) {
    keyWheelScroll(e, keyScrollData)
  }
  
  function initEvents(scrollData) {
    var { scroll, container } = scrollData;

    function wheelScroll(e) {
      keyWheelScroll(e, scrollData)
    }
    
    function dragScroll(e) {
      e.stopPropagation()
      var { height, top, maxHeight, container } = scrollData,
          newTop = top + e.movementY,
          scrollValue = container.scrollHeight;

      if (newTop > 0 && (newTop + height) < maxHeight) {
        scrollValue = Math.ceil(container.scrollHeight * (newTop / maxHeight));
      } else {
        newTop = newTop <= 0 ? (scrollValue = 0) : Math.ceil(maxHeight - height)
      }
      
      doScroll(newTop, scrollValue, scrollData)
    }
    
    function clickScroll(e) {
      e.stopPropagation()
      let { height, maxHeight, container } = scrollData;
      
      if (e.target != scroll) {
        var percentage = e.offsetY / maxHeight,
            scrollValue = Math.ceil((container.scrollHeight - container.clientHeight) * percentage),
            newTop = Math.ceil(( maxHeight - height ) * percentage);

        doScroll(newTop, scrollValue, scrollData)
      }
    }
    
    scroll.addEventListener('mousedown', e => {
      window.addEventListener('mousemove', dragScroll, false)
      window.addEventListener('mouseup', function(e) {
        this.removeEventListener('mousemove', dragScroll)
      }, false)
    }, false)
    
    scroll.parentNode.addEventListener('click', clickScroll, false) 
    container.addEventListener('wheel', wheelScroll, isMS ? false : {passive: true})
    
    container.addEventListener('click', e => {
      e.stopPropagation()
      keyScrollData = scrollData;
      window.addEventListener('keydown', keyScroll, false)
    }, false)
  }
  
  return scrollUpdate
}

