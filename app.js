const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
console.log("test")

//this is the last offset of the previous picture
var last = 0

//widths of slideshows
//we're going to offset left by one of these each time
const siwidths = []
const slideshow = document.getElementById("slideshow")

//for each image in the slideshow we're going to offset
//it's left so that each picture is back to back
for (const img of slideshow.children) {
	img.style.left = last + "px"
	last += img.width
	siwidths.push(img.width)
}

const maxwidth = siwidths.reduce((a,b)=>a+b) - siwidths[siwidths.length-1]

//loop slideshow forever
var currentslide = 0

function moveSlide() {
	for (const img of slideshow.children) {
		//if it's totally off screen we can add it back into the queue
		if (parseInt(img.style.left) + img.width <= 0) {
			//disable transition while moving it
			img.classList.remove("transition")

			//move it to end of queue
			img.style.left = maxwidth + parseInt(img.style.left) + "px"

			//re-enable transition
			setTimeout(()=>img.classList.add("transition"), 2000)

			continue
		}
		
		img.style.left = parseInt(img.style.left) - siwidths[currentslide] + "px"
	}
	currentslide = (currentslide + 1) % siwidths.length
}

setTimeout(()=>setInterval(moveSlide, 4000), 4000)

