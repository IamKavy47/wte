function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnima() {
  var timer = document.querySelector("#loader h3");
  var img = document.querySelector("#loader img");
  var grow = 0;

  var interval = setInterval(function () {
    if (grow < 110) {
      grow++;
      timer.innerHTML = grow + "%";

      if (grow % 10 === 0) {
        let index = grow / 10; // 20% = 1, 40% = 2, ..., 100% = 5
        img.setAttribute("src", `/assets/loader/${index}.svg`);
      }
    } else {
      grow = 110;
      timer.innerHTML = grow + "%";
      clearInterval(interval);
    }
  }, 22);

  // GSAP animations
  gsap.to("#loader", {
    y: "-100vh",
    delay: 2.55,
    duration: 0.4,
  });
  gsap.from("#page1 span", {
    y: 700,
    delay: 2.4,
    duration: 0.7,
    stagger: 0.1,
  });
}


function herovideo(){
  var tl = gsap.timeline();
  tl.to("#page2 video",{
  
    width:"100%",
    scrollTrigger:{
      trigger:"#page2",
      scroller:"#main",
      // markers:true,
      // start:"top 0",
      // end:" top -100%"
      scrub:1
    }
  })
  tl.from("#page3 #one", {
    y: 200,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page3 h1",
      scroller: "#main",
      start: "top 100%",
      end: "top 95%",
      scrub: 1,
      // markers: true 
    }
  });
  tl.from("#page3 #two", {
    y: 200,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page3 h1",
      scroller: "#main",
      start: "top 95%",
      end: "top 90%",
      scrub: 1,
      // markers: true 
    }
  });
  tl.from("#page3 #three", {
    y: 200,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page3 h1",
      scroller: "#main",
      start: "top 70%",
      end: "top 65%",
      scrub: 1,
      // markers: true 
    }
  });
  tl.from("#page3 #four", {
    y: 200,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page3 h1",
      scroller: "#main",
      start: "top 50%",
      end: "top 45%",
      scrub: 1,
      // markers: true 
    }
  });
  
  
}

function experties(){
  gsap.to("#page4 h1",{
    transform:"translateX(-130vw)",
    scrollTrigger:{
      trigger:"#page4",
      scroller:"#main",
      // markers:true,
      start:"top 0",
      end:"top -100%",
      pin:true,
      scrub:2
  
    }
  })
}
locomotive()
loadingAnima()
herovideo()
experties()
