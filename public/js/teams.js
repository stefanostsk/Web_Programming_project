const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1
const clamp = (val, min, max) => Math.max(min, Math.min(val, max))

class DragScroll {
  constructor(obj) {
    this.$el = document.querySelector(obj.el)
    this.$wrap = this.$el.querySelector(obj.wrap)
    this.$items = this.$el.querySelectorAll(obj.item)
    this.$bar = this.$el.querySelector(obj.bar)
    this.init()
  }
  
  init() {
    this.progress = 0
    this.speed = 0
    this.oldX = 0
    this.x = 0
    this.playrate = 0
    //
    this.bindings()
    this.events()
    this.calculate()
    this.raf()
  }
  
  bindings() {
    [
     'events', 
     'calculate',
     'raf', 
     'handleWheel', 
     'move', 
     'raf', 
     'handleTouchStart',
     'handleTouchMove', 
     'handleTouchEnd'
    ].forEach(i => { this[i] = this[i].bind(this) })
  }
  
  calculate() {
    this.progress = 0
    this.wrapWidth = this.$items[0].clientWidth * this.$items.length
    this.$wrap.style.width = `${this.wrapWidth}px`
    this.maxScroll = this.wrapWidth - this.$el.clientWidth
  }
  
  handleWheel(e) {
    this.progress += e.deltaY
    this.move()
  }
  
  handleTouchStart(e) {
    e.preventDefault()
    this.dragging = true
    this.startX = e.clientX || e.touches[0].clientX
    this.$el.classList.add('dragging')
  }

  handleTouchMove(e) {
    if (!this.dragging) return false
    const x = e.clientX || e.touches[0].clientX
    this.progress += (this.startX - x) * 2.5
    this.startX = x
    this.move()
  }

  handleTouchEnd() {
    this.dragging = false
    this.$el.classList.remove('dragging')
  }
  
  move() {
    this.progress = clamp(this.progress, 0, this.maxScroll)
  }
  
  events() {
    window.addEventListener('resize', this.calculate)
    window.addEventListener('wheel', this.handleWheel)
    //
    this.$el.addEventListener('touchstart', this.handleTouchStart)
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleTouchEnd)
    //
    window.addEventListener('mousedown', this.handleTouchStart)
    window.addEventListener('mousemove', this.handleTouchMove)
    window.addEventListener('mouseup', this.handleTouchEnd)
    document.body.addEventListener('mouseleave', this.handleTouchEnd)
  }
  
  raf() {
    // requestAnimationFrame(this.raf)
    this.x = lerp(this.x, this.progress, 0.1)
    this.playrate = this.x / this.maxScroll
    //
    this.$wrap.style.transform = `translateX(${-this.x}px)`
    this.$bar.style.transform = `scaleX(${.18 + this.playrate * .82})`
    //
    this.speed = Math.min(100, this.oldX - this.x)
    this.oldX = this.x
    //
    this.scale = lerp(this.scale, this.speed, 0.1)
    this.$items.forEach(i => {
      i.style.transform = `scale(${1 - Math.abs(this.speed) * 0.002})`
      i.querySelector('img').style.transform = `scaleX(${1 + Math.abs(this.speed) * 0.004})`
    })
  }
}


/*--------------------
Instances
--------------------*/
const scroll = new DragScroll({
  el: '.carousel',
  wrap: '.carousel--wrap',
  item: '.carousel--item',
  bar: '.carousel--progress-bar',
})


/*--------------------
One raf to rule em all
--------------------*/
const raf = () => {
  requestAnimationFrame(raf)
  scroll.raf()
}
raf()


// (function() {
//     "use strict";
  
//     var carousel = document.getElementsByClassName('carousel')[0],
//         slider = carousel.getElementsByClassName('carousel__slider')[0],
//         items = carousel.getElementsByClassName('carousel__slider__item'),
//         prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
//         nextBtn = carousel.getElementsByClassName('carousel__next')[0];
    
//     var width, height, totalWidth, margin = 20,
//         currIndex = 0,
//         interval, intervalTime = 4000;
    
//     function init() {
//         resize();
//         move(Math.floor(items.length / 2));
//         bindEvents();
      
//         timer();
//     }
    
//     function resize() {
//         width = Math.max(window.innerWidth * .25, 275),
//         height = window.innerHeight * .5,
//         totalWidth = width * items.length;
      
//         slider.style.width = totalWidth + "px";
      
//         for(var i = 0; i < items.length; i++) {
//             let item = items[i];
//             item.style.width = (width - (margin * 2)) + "px";
//             item.style.height = height + "px";
//         }
//     }
    
//     function move(index) {
      
//         if(index < 1) index = items.length;
//         if(index > items.length) index = 1;
//         currIndex = index;
      
//         for(var i = 0; i < items.length; i++) {
//             let item = items[i],
//                 box = item.getElementsByClassName('item__3d-frame')[0];
//             if(i == (index - 1)) {
//                 item.classList.add('carousel__slider__item--active');
//                 box.style.transform = "perspective(1200px)"; 
//             } else {
//               item.classList.remove('carousel__slider__item--active');
//                 box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
//             }
//         }
      
//         slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
//     }
    
//     function timer() {
//         clearInterval(interval);    
//         interval = setInterval(() => {
//           move(++currIndex);
//         }, intervalTime);    
//     }
    
//     function prev() {
//       move(--currIndex);
//       timer();
//     }
    
//     function next() {
//       move(++currIndex);    
//       timer();
//     }
    
    
//     function bindEvents() {
//         window.onresize = resize;
//         prevBtn.addEventListener('click', () => { prev(); });
//         nextBtn.addEventListener('click', () => { next(); });    
//     }
  
  
  
  
    
//     init();
    
//   })();