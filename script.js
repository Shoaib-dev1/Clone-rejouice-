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