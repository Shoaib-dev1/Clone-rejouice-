function animationslocomotive(){
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
animationslocomotive()

function MouseMoverEffect(){
    var page1Content = document.querySelector(".page1-content")

var mousemover = document.querySelector(".mousemover")

   
page1Content.addEventListener("mousemove", function(dets) {
    mousemover.style.left = dets.x+"px"
    mousemover.style.top = dets.y+"px"

                         // For Smooth Mouse Movement
    
//   gsap.to(mousemover, {
//         x: dets.x,              
//         y: dets.y,
//   })
    
 })

page1Content.addEventListener("mouseenter", function() {
    
    gsap.to(mousemover, {
        display: "block",  } )
})

page1Content.addEventListener("mouseleave", function() {
    gsap.to(mousemover, {
        display: "none"})

})




 var page2 = document.querySelector(".page2")

 var playreel = document.querySelector(".playreel h4")

 page2.addEventListener("mousemove", function(dets) {
    playreel.style.left = dets.x+"px"
    playreel.style.top = dets.y+"px"
    
    // gsap.to(playreel, {
    //     x: dets.x,
    //     y: dets.y
    // })
 })

 page2.addEventListener("mouseenter", function() {
    
    gsap.to(playreel, {
        display: "block",  } )
})

page2.addEventListener("mouseleave", function() {
    gsap.to(playreel, {
        display: "none  "})

})
}
MouseMoverEffect()


function page3(){
  gsap.from(".elem h3", {
  yPercent: 100,
  duration: 2,
  ease: "power4.out",
  stagger: 0.9,
  scrollTrigger: {
    trigger: ".page3-content",
    scroller: "#main",
    start: "top 70%",
    end: "top 60%",
    scrub: 2,
    // markers: true
  }
});
}
page3();

function page4MouseMove() {
  var page4 = document.querySelector(".page4-image-after-content");
var page4MediaContent = document.querySelector(".page4-image-after-content video ");

page4.addEventListener("mousemove", function(dets) {
    var bounds = page4.getBoundingClientRect();
    var x = dets.clientX - bounds.left - page4MediaContent.offsetWidth / 2;
    var y = dets.clientY - bounds.top - page4MediaContent.offsetHeight / 2;

    gsap.to(page4MediaContent, {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power2.out"
    });
});
}

page4MouseMove();


function page5MouseMove() {
  
  var boxes = document.querySelectorAll(".box");
  boxes.forEach(function(box) {
    var video = box.querySelector(".page5-image-after-content video");
    if (!video) return; 

    box.addEventListener("mousemove", function(dets) {
      var bounds = box.getBoundingClientRect();
      var x = dets.clientX - bounds.left - video.offsetWidth / 2;
      var y = dets.clientY - bounds.top - video.offsetHeight / 2;

      gsap.to(video, {
        x: x,
        y: y,
        duration: 2,
        ease: "power2.out"
      });
    });

    
    box.addEventListener("mouseleave", function() {
      gsap.to(video, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}
page5MouseMove();




