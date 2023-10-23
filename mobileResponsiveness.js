const body = document.querySelector('body');

const userAgent = navigator.userAgent.toLowerCase();
var isMobile = /iPhone|Android/i.test(navigator.userAgent);
const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent); // credits: eyehunts.com > https://tutorial.eyehunts.com/js/javascript-detect-mobile-or-tablet-html-example-code/
const touch = isMobile || isTablet;
if (isMobile && isTablet) isMobile = false; // assuming it's an Android tablet

function touchResponse(element, touchArea)
{
	if (element === null) // important to detach listener after closing a star.
	{
		body.ontouchstart = null;
		body.ontouchend = null;
		body.ontouchcancel = null;
		body.ontouchmove = null;
		return;
	}
	else
	{
		body.ontouchstart = (event)=>{handleStart(event, element)};
	 	body.ontouchend = ()=>{handleEnd(element, touchArea)};
	 	body.ontouchcancel = ()=>{handleCancel(element)};
	 	body.ontouchmove = (event)=>{handleMove(event, element)};
	}
}

let movement = 0;
let startPosition = 0;
let fullPull = false;
let originalElementPlacement = {
	x:0,
	y:0,
}
let moment;
let locked = false;

function handleStart(event, element)
{
	startPosition = event.changedTouches[0].clientY;
	originalElementPlacement.x = element.offsetLeft;
	originalElementPlacement.y = element.offsetTop;
}

function handleEnd(element, touchArea)
{
	if (fullPull && !locked)
	{
		element.style.display = 'none';
		touchArea.click();
	}
	reset(element);
}

function lockUnlock()
{
	if (moment+500 > new Date().getTime()) locked = true;
	else locked = false;
	// there must be a time gap after you've last used two fingers (pinch zoom). Usually users don't pull away both fingers in the same frame, there's one finger left which may have suddenly have a big delta, triggering fullPull /  handleEnd(). So for half a second after two-finger interaction everything gets reset.
}

function handleMove(event, element)
{
	if (event.touches.length > 1)
	{
		moment = new Date().getTime();
		lockUnlock();
		return; // only one finger allowed, or it would mess when the user tried to zoom (pinch / two finger interaction)
	}
	lockUnlock();
	movement = event.changedTouches[0].clientY;
	let delta = movement - startPosition;
	if (delta < 0) return; // this is a late implementation. As you can see below, it regards both, positive and negative deltas. This implementation limits the swipe-away movement to upwards only. Downwards is a bit tricky, as the div shows alternating images of various heights, which changes the height of the div the user wants to swipe away, causing a messing with the condition readings.
	//console.log(delta)
	if (delta > 0 && element.scrollTop > 0) // if there's scrolling within the div, the scrolling has precedence until it reaches to lower or upper limit, and only then allows the whole div to be pushed up or down, depending on which scroll-end the user is.
	{
		//console.log('NOT REACHED TOP YET');
		return;
	}
	else if (delta < 0 && element.scrollHeight !== element.scrollTop+element.clientHeight)
	{
		//console.log('NOT REACHED BOTTOM YET');
		return;
	}
	
	const pullLimit = 500; // pixels
	element.style.top = delta + originalElementPlacement.y + 'px';
	if (delta > pullLimit) {delta = pullLimit; fullPull = true;} // locks pull at same value
	else if (delta < -pullLimit) {delta = -pullLimit; fullPull = true;}
	let op = ((delta >= 0) ? delta : delta*-1)
	element.style.opacity = (pullLimit-op)/pullLimit;
}

function handleCancel(element)
{
	reset(element);
}

function reset(element)
{
	element.style.top = originalElementPlacement.y + 'px';
	element.style.opacity = 1;
	movement = 0;
	startPosition = 0;
	fullPull = false;
	originalElementPlacement = {
		x:0,
		y:0,
	}
}

function adjustSizesForMobile(starAndGlow, renderedText)
{
	const starGlowWidthHeight = ((window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight)*0.1; // the ruler is the longest side, because only on that matters how big objects should appear visually subjectively. 10% is a good range. We need to keep the starAndGlow with pixel dimensions, only its children can have percentages, and sensibly so. The reason of course being that the direct parent of starAndGlow is the body (or windowDiv, which covers the body) and because the body is not a perfect square usually, the star needs absolute pixel dimensions, not relative percentages. But we still need to scale with the window, which is the job of this if statement.
	if (starAndGlow !== null && starAndGlow !== undefined)
	{
		starAndGlow.style.width = starGlowWidthHeight+'px';
		starAndGlow.style.height = starGlowWidthHeight+'px';
	}
	
	if (renderedText !== undefined)
	{
		renderedText.style['border-bottom'] = starGlowWidthHeight/10+ 'px solid transparent';
		renderedText.style['border-top'] =  starGlowWidthHeight/10+ 'px solid transparent';
		renderedText.style['font-size'] = starGlowWidthHeight/5+'px';
		for (const child of renderedText.children)
		{
			child.style['margin-left'] = starGlowWidthHeight/5+'px';
			child.style['margin-bottom'] = starGlowWidthHeight/5+'px';
		}
	}
	return starGlowWidthHeight;
}

export {isMobile, touchResponse, adjustSizesForMobile}