// Hide elements on load to prevent flash of unstyled content (FOUC)
gsap.set(".page1-content h1, .page1-content-para", { opacity: 0 });

function animationslocomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  footer(); // Calling footer() after Locomotive Scroll is initialized
}
animationslocomotive();

function MouseMoverEffect() {
  var page1Content = document.querySelector(".page1-content");

  var mousemover = document.querySelector(".mousemover");

  page1Content.addEventListener("mousemove", function (dets) {
    mousemover.style.left = dets.x + "px";
    mousemover.style.top = dets.y + "px";

    // For Smooth Mouse Movement

    //   gsap.to(mousemover, {
    //         x: dets.x,
    //         y: dets.y,
    //   })
  });

  page1Content.addEventListener("mouseenter", function () {
    gsap.to(mousemover, {
      display: "block",
    });
  });

  page1Content.addEventListener("mouseleave", function () {
    gsap.to(mousemover, {
      display: "none",
    });
  });

  var page2 = document.querySelector(".page2");

  var playreel = document.querySelector(".playreel h4");

  page2.addEventListener("mousemove", function (dets) {
    playreel.style.left = dets.x + "px";
    playreel.style.top = dets.y + "px";

    // gsap.to(playreel, {
    //     x: dets.x,
    //     y: dets.y
    // })
  });

  page2.addEventListener("mouseenter", function () {
    gsap.to(playreel, {
      display: "block",
    });
  });

  page2.addEventListener("mouseleave", function () {
    gsap.to(playreel, {
      display: "none  ",
    });
  });
}
MouseMoverEffect();


function loader(){
  var timeLine = gsap.timeline({
    onComplete: page1 // Call page1 animation after loader is done
  });
  timeLine.from(".loader h3",{
      x:50,
      opacity:0,
      duration:1,
      stagger:0.1,
  })
  .to(".loader h3",{
      opacity:0,
      x:-10,
      duration:0.5,
      stagger:0.1,
      delay:1
  })
  .to(".loader",{
      opacity:0,
  })
  .to(".loader",{
      display:"none",
  });
}

loader();


function page1() {
  const page1H1 = document.querySelector(".page1-content h1");
  if (!page1H1) return;

  // Make containers visible before animating children
  gsap.set(".page1-content h1, .page1-content-para", { opacity: 1 });

  // Split the text into characters for the animation
  const text = page1H1.textContent.trim();
  page1H1.innerHTML = "";

  // Wrap each character in a structure that allows for the slide-in animation
  text.split("").forEach((char) => {
    const charContainer = document.createElement("span");
    charContainer.className = "page1-char-container";
    charContainer.innerHTML = `<span class="page1-char">${
      char === " " ? "&nbsp;" : char
    }</span>`;
    page1H1.appendChild(charContainer);
  });

  // Animate each character with a stagger from bottom to top
  gsap.from(".page1-content h1 .page1-char", {
    yPercent: 110,
    opacity: 0,
    stagger: 0.05,
    duration: 1,
    ease: "power3.out",
    delay: 0, // Removed delay to start immediately
  });

  // Animate the paragraph below the heading
  gsap.from(".page1-content-para p", {
    yPercent: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    delay: 0.2, // Reduced delay to start shortly after the heading
  });
}

function page3() {
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
    },
  });
}
page3();

function page4MouseMove() {
  var page4 = document.querySelector(".page4-image-after-content");
  var page4MediaContent = document.querySelector(
    ".page4-image-after-content video "
  );

  page4.addEventListener("mousemove", function (dets) {
    var bounds = page4.getBoundingClientRect();
    var x = dets.clientX - bounds.left - page4MediaContent.offsetWidth / 2;
    var y = dets.clientY - bounds.top - page4MediaContent.offsetHeight / 2;

    gsap.to(page4MediaContent, {
      x: x,
      y: y,
      duration: 1.5,
      ease: "power2.out",
    });
  });
}

page4MouseMove();

function page5MouseMove() {
  var boxes = document.querySelectorAll(".box");
  boxes.forEach(function (box) {
    var video = box.querySelector(".page5-image-after-content video");
    if (!video) return;

    box.addEventListener("mousemove", function (dets) {
      var bounds = box.getBoundingClientRect();
      var x = dets.clientX - bounds.left - video.offsetWidth / 2;
      var y = dets.clientY - bounds.top - video.offsetHeight / 2;

      gsap.to(video, {
        x: x,
        y: y,
        duration: 2,
        ease: "power2.out",
      });
    });

    box.addEventListener("mouseleave", function () {
      gsap.to(video, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}
page5MouseMove();

// --- Scroll Zoom Video Animation ---
function page8() {
  gsap.to(".scroll-zoom-video", {
    scale: 1.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".scroll-zoom-section",
      scroller: "#main",
      start: "top center",
      end: "bottom top",
      scrub: true,
      // markers: true
    },
  });
}
page8();

function splitToSpans(element) {
  const text = element.textContent;
  element.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.classList.add("char");
    element.appendChild(span);
  });
}

const mainWord = document.querySelector(".word-main");
const altWord = document.querySelector(".word-alt");
const bar = document.querySelector(".width-bar");
splitToSpans(mainWord);
splitToSpans(altWord);

// Set altWord chars below
altWord.querySelectorAll(".char").forEach((span) => {
  span.style.transform = "translateY(110%)";
  span.style.opacity = "0";
});

// Animate on hover
const link = document.querySelector(".link-hover");
link.addEventListener("mouseenter", () => {
  // Animate mainWord chars up
  gsap.to(mainWord.querySelectorAll(".char"), {
    y: "-110%",
    opacity: 0,
    stagger: 0.04,
    duration: 0.4,
    ease: "power2.in",
  });
  // Animate altWord chars up into view
  gsap.to(altWord.querySelectorAll(".char"), {
    y: "0%",
    opacity: 1,
    stagger: 0.04,
    duration: 0.4,
    ease: "power2.out",
  });
  // Animate bar to altWord width
  const altWidth = altWord.offsetWidth;
  gsap.to(bar, { width: altWidth, duration: 0.4, ease: "power2.inOut" });
});

link.addEventListener("mouseleave", () => {
  // Animate mainWord chars back
  gsap.to(mainWord.querySelectorAll(".char"), {
    y: "0%",
    opacity: 1,
    stagger: 0.04,
    duration: 0.4,
    ease: "power2.out",
  });
  // Animate altWord chars down
  gsap.to(altWord.querySelectorAll(".char"), {
    y: "110%",
    opacity: 0,
    stagger: 0.04,
    duration: 0.4,
    ease: "power2.in",
  });
  // Animate bar to full width
  gsap.to(bar, {
    width: mainWord.offsetWidth,
    duration: 0.4,
    ease: "power2.inOut",
  });
});

// Footer
function footer() {
  const footerH1 = document.querySelector(".footer-logo h1"); // Select the h1

  // Defensive check: ensure the element exists
  if (!footerH1) {
    console.error("Footer H1 element not found for animation!");
    return;
  }

  // Split the text into characters for the animation
  const text = footerH1.textContent.trim();
  footerH1.innerHTML = ""; // Clear original text

  // Wrap each character in a structure that allows for the slide-in animation
  text.split("").forEach((char) => {
    const charContainer = document.createElement("span");
    charContainer.className = "footer-char-container";
    charContainer.innerHTML = `<span class="footer-char">${
      char === " " ? "&nbsp;" : char
    }</span>`;
    footerH1.appendChild(charContainer);
  });

  // Animate each character with a stagger
  gsap.from(".footer-logo h1 .footer-char", {
    yPercent: -110, // Animate from top to bottom
    opacity: 0,
    stagger: 0.1, // Increased stagger for a slower character-by-character effect
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".site-footer",
      scroller: "#main",
      start: "top 80%",
      end: "top 50%",
      scrub: 5, // Increased scrub value for a slower, smoother animation
    },
  });
}
