import {arrowLeftSVG, arrowRightSVG} from './SVGs.js';
import {hideStars} from './content.js';
import {myselfStar} from './myself.js';

const body = document.querySelector('body');
var globalImage = {
	index: 0,
	array: [],
}

/*
const arrow = document.createElement('div');
arrow.classList.add('fullWindowImageNavigationArrow');
const arrowLeft = arrow.cloneNode();
const arrowRight = arrow.cloneNode();
arrowLeft.innerHTML = '&#x1F8A0';
arrowRight.innerHTML = '&#x1F8A1';
...turns out not every OS knows this unicode (Android e.g. doesn't). So I turned it into a vector.
*/

const arrowLeft = document.createElement('div');
const arrowRight = document.createElement('div');
arrowLeft.classList.add('fullWindowImageNavigationArrowSVG');
arrowRight.classList.add('fullWindowImageNavigationArrowSVG');
arrowLeft.style.left = '5%';
arrowRight.style.left = '95%';
const svgArrowLeftOne = document.createElement('div');
const svgArrowRightOne = document.createElement('div');
svgArrowLeftOne.innerHTML = arrowLeftSVG;
svgArrowRightOne.innerHTML = arrowRightSVG;
const svgArrowLeftTwo = document.createElement('div');
const svgArrowRightTwo = document.createElement('div');
svgArrowLeftTwo.innerHTML = arrowLeftSVG.replace('arrowColor','arrowColorHover');
svgArrowRightTwo.innerHTML = arrowRightSVG.replace('arrowColor','arrowColorHover');
svgArrowLeftTwo.style.display = 'none';
svgArrowRightTwo.style.display = 'none';
arrowLeft.append(svgArrowLeftOne, svgArrowLeftTwo);
arrowRight.append(svgArrowRightOne, svgArrowRightTwo);
arrowLeft.onmouseover = ()=>{svgArrowLeftOne.style.display = 'none'; svgArrowLeftTwo.style.display = 'block'};
arrowLeft.onmouseout = ()=>{svgArrowLeftOne.style.display = 'block'; svgArrowLeftTwo.style.display = 'none'};
arrowRight.onmouseover = ()=>{svgArrowRightOne.style.display = 'none'; svgArrowRightTwo.style.display = 'block'};
arrowRight.onmouseout = ()=>{svgArrowRightOne.style.display = 'block'; svgArrowRightTwo.style.display = 'none'};
//... ok what's all this fuss about the arrows? Originally I just added the unicode ('commented-out block just upper of this arrow block') until I realized that not all OS know this arrow, like Android e.g.. Easy solution: export it as SVG in Figma (because Illustrator doesn't know it either) and add it as svg-inline-element. That worked well, but then there would be a challenge regarding the hover effect: adding an onmouse listener to the SVG would fire frame-wise (onmouseover every frame)! So it needed a parent div, then it would do the escpected behaviour, but it was not possible to just change the styling (for hover effect) of SVG like this. My first guess was to just change the fill property directly in the shape property (as I got it from Figma), meaning I'd replace the innerHTML string that described the fill part within another; but as feared, the browser engine doesn't that readily update the reading of the inline-SVG, meaning when you hover, sometimes it would change colour, sometimes not. So just for trying, I removed the fill property and added a class which described the fill property in CSS. But as expected, because the browser engine wouldn't update frequently the content of the HTML SVG element (with a new class) the color update still wasn't convincing. You could directly add the CSS hover property to it, but because most of the SVG is actually empty space, you'd have to directly hover over the white part (vector area) of the SVG for the arrow to turn blue, it wouldn't work in the center part e.g.. The arrow vector of the SVG was placed in a rectangle originally, but there's no way to add a hover listener to the rectangle that would then address the child arrow vector, or likewise a listener to the viewBox. I later removed the rectangle, it was not needed, it's just something that came from Figma. So I thought: alright, let's just take the class and load the stylestheet in JS to change the class there, because stylesheet changes are updated frame-wise. But that wouldn't work because the browser throws in a CORS block when loading the stylesheet in JS, and it doesn't tell you that it's caused by a CORS block btw, it just tells you that it failed to load the rules part of hte stylehsheet, the part we need. Since I want this script to run directly without a server, it's not an option. So in the end it had to be a simple but a bit blatant solutionof  actually having a two SVGs for every arrow, with different styling classes each. The SVGs get swapped (display block / none) when hovering.
	
const escape = document.createElement('div');
escape.id = 'escape';
escape.innerHTML = '&#x229A';
escape.style['z-index'] = 3;
arrowLeft.addEventListener('click', goLeft);
arrowRight.addEventListener('click', goRight);
escape.addEventListener('click', leaveFullWindow);
/*fullWindow.onwheel = (event)=>
{
	if (event.deltaY > 0) goRight();
	else goLeft();
}*/

window.addEventListener('keydown', (event)=>
{
	let key = event.keyCode || event.which;

	const escape = 27;
	const arrowLeftKey = 37;
	const arrowRightKey = 39;
	
	if(fullWindow.style.display === 'block')
	{
		if (key === escape) leaveFullWindow();
		if (key === arrowLeftKey) goLeft();
		if (key === arrowRightKey) goRight();
	}
});

var fullWindow;
var fullWindowImage;
var firstTime = true;
function goFullWindow()
{
	if (firstTime)
	{
		fullWindowImage = document.createElement('IMG');
		fullWindowImage.id = 'fullWindowImage';
		fullWindow = document.createElement('div');
		fullWindow.id = 'fullWindow';
		fullWindow.append(fullWindowImage);
		fullWindow.append(arrowRight, arrowLeft, escape);
		body.append(fullWindow);
		firstTime = false;
		// naturally you would have this whole block on the outermost scope level in this module, like the arrows upper e.g.. But for some very obscure reason, it was not possible to do fullWindow.style.display = 'block' / 'none', (or using setAttribute). The browser displayed at the in-line element styling that display was always none, even if it should be 'block'. Inversing it wouldn't work (giving 'block' in the CSS file, and setting it instantly to 'none' in the declaration). I just couldn't make it work to use JS to switch between block / none. Strangely so, this code is unchanged from a previous version where I hadn't split it up into modules yet. But now, in modules it wouldn't work. Eventually I tried this, where the declaration is executed only by the first call of this function, which made it work (even though it's the same execution), finally. But it still puzzles me. Agonisingly, I split this page into modules a couple of days ago, and since then this bug must have been there. I didn't realize it as I was focused on mobile responsiveness, and why would I suspect such a thing? It worked perfectly before; in JS, logic can be obscure. ...this feature is one of the most important of this script, as it makes my work visible, which is the portfolio's purpose after all.
	}
	fullWindow.style.display = 'block';
	body.style.overflow = 'hidden';
	fullWindow.style.left = window.scrollX + 'px';
	fullWindow.style.top = window.scrollY + 'px';
	fullWindow.animate({opacity: [0,1]}, 333);
	hideStars(true);
	myselfStar.animate({opacity: [1,0]},500).onfinish =()=> myselfStar.style.display = 'none';
}
function leaveFullWindow()
{
	fullWindow.animate({opacity: [1,0]}, 200).onfinish = ()=>
	{
		fullWindow.style.display = null;
		body.style.overflow = null;
		hideStars(false);
		myselfStar.style.display = 'block';
		myselfStar.animate({opacity: [0,1]},500);
	};
}
function goRight()
{
	globalImage.index++;
	if (globalImage.index > globalImage.array.length-1) globalImage.index = 0;
	nextImageFullWindow(true);
}
function goLeft()
{
	globalImage.index--;
	if (globalImage.index < 0) globalImage.index = globalImage.array.length-1;
	nextImageFullWindow(true);
}

function nextImageFullWindow(rerender)
{
	if (firstTime) goFullWindow();
	else if (fullWindow.style.display !== 'block') goFullWindow();
	fullWindowImage.src = globalImage.array[globalImage.index].src;
	if (rerender) fullWindowImage.style.opacity = 1/3;
	frameImageFullWindow()
	if (rerender) fullWindowImage.animate({opacity: [0,1]}, 333).onfinish = ()=> fullWindowImage.style.opacity = 1;
}

function frameImageFullWindow()
{
	const windowAspectRatio = fullWindow.clientWidth / fullWindow.clientHeight;
	const imageAspectRatio = fullWindowImage.naturalWidth / fullWindowImage.naturalHeight;
	/*
	console.log('WINDOW X '+fullWindow.clientWidth);
	console.log('WINDOW Y '+fullWindow.clientHeight);
	console.log('WINDOW ASPECT RATIO '+windowAspectRatio);
	console.log('IMAGE X '+fullWindowImage.naturalWidth);
	console.log('IMAGE Y '+fullWindowImage.naturalHeight);
	console.log('IMAGE ASPECT RATIO '+imageAspectRatio);
	*/
	if (fullWindowImage.naturalWidth < fullWindow.clientWidth && fullWindowImage.naturalHeight < fullWindow.clientHeight)
	{
		fullWindowImage.style.width = fullWindowImage.naturalWidth+'px';
		fullWindowImage.style.height = fullWindowImage.naturalHeight+'px';
	}
	else if (imageAspectRatio >= windowAspectRatio)
	{
		fullWindowImage.style.width = '100%';
		fullWindowImage.style.height = fullWindow.clientWidth/imageAspectRatio+'px';
	}
	else
	{
		fullWindowImage.style.height = '100%';
		fullWindowImage.style.width = fullWindow.clientHeight*imageAspectRatio+'px';
	}
}

export {fullWindow, nextImageFullWindow, frameImageFullWindow, globalImage}