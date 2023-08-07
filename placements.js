import {isMobile} from './mobileResponsiveness.js'

function placeRenderedText(windowDiv, starAndGlow, renderedText, renderedTextCoordinatesDimensions)
{
	if (isMobile)
	{
		const vp = window.visualViewport;
		renderedText.style.width = vp.width-120+'px';
		renderedText.style.left = vp.pageLeft+40+ renderedText.getBoundingClientRect().width/2+'px';
		renderedText.style.top = '40px';
		if (starAndGlow === 'myself') renderedText.style.height = vp.height-180+'px';
		else if (renderedText.getBoundingClientRect().height - 180 > vp.height) renderedText.style.height = vp.height-180+'px';
		return;
	}
	
	// I love using getBoundingClientRect() because of its reliability, but it gives coordinates relative to the window, so once there's scrolling, you have to add scroll offset or use offsetLeft / offsetTop as I do here. CAUTION: offset takes transform-translate into consideration, unlike getBoundingClientRect(). Since starAndGlow is grabbed by its center, the sides are +/- width/2 or height/2. ALSO CAUTION: renderedText only has translateX(-50%), meaning offsetTop is literally the top.

	renderedText.style.top = starAndGlow.offsetTop + starAndGlow.getBoundingClientRect().height/2 +'px'; // renderedText are placed under the star by default
	renderedText.style.left = starAndGlow.offsetLeft + 'px';

	if (renderedText.offsetLeft - renderedText.getBoundingClientRect().width/2 < 0) renderedText.style.left = renderedText.getBoundingClientRect().width/2 + 'px'; // if over left bound of window, place it inside at beginning
	if (renderedText.offsetLeft + renderedText.getBoundingClientRect().width/2 > windowDiv.getBoundingClientRect().width) renderedText.style.left = windowDiv.getBoundingClientRect().width - renderedText.getBoundingClientRect().width/2 + 'px'; // if over right bound of window, place it inside at right side
	if (renderedText.offsetTop + renderedText.getBoundingClientRect().height > windowDiv.getBoundingClientRect().height)
	{
		renderedText.style.top = windowDiv.getBoundingClientRect().height-renderedText.getBoundingClientRect().height + 'px'; // if over bottom bound of window, place it inside on the bottom...
		if (renderedText.offsetTop < starAndGlow.offsetTop+starAndGlow.getBoundingClientRect().height/2) // ...then if top of renderedText overlaps with bottom of star ...
		{
			if (starAndGlow.offsetLeft + starAndGlow.getBoundingClientRect().width/2 > windowDiv.getBoundingClientRect().width/2) renderedText.style.left = starAndGlow.offsetLeft - starAndGlow.getBoundingClientRect().width/2 - renderedText.getBoundingClientRect().width/2 + 'px'; // ...then if star-center is right of background-center, renderedText will be placed left of star, or...
			else renderedText.style.left = starAndGlow.offsetLeft + starAndGlow.getBoundingClientRect().width/2 + renderedText.getBoundingClientRect().width/2 + 'px'; //... if star-center is perfectly center or left of background middle, place rendered text right of star
		}
	}
	
	renderedTextCoordinatesDimensions.x = renderedText.offsetLeft;
	renderedTextCoordinatesDimensions.y = renderedText.offsetTop;
	renderedTextCoordinatesDimensions.width = renderedText.getBoundingClientRect().width;
	renderedTextCoordinatesDimensions.height = renderedText.getBoundingClientRect().height;
}

function placeImages(windowDiv, imagesArea, renderedTextCoordinatesDimensions)
{
	// very curious bug: if you keep clicking on a star without clicking anywhere else, renderedText styling coordinates and dimensions will become 0. offsetTop, getBoundingClientRect().x / .top and getBoundingClientRect().height... everything becomes zero. But the object is perfectly fine, it still has the coordinates and dimensions it should. Only when you click somewhere else and then again on the star it suddenly shows the proper numbers again. ... i bet this is caused by some caching algorithm that realizes there's been no other interaction (clicks elsewhere) that could have affected a change so it just doesn't perform any more readings.
	// the only function that seems to be immunce against this is window.getComputedStyle(element)
	// we don't need it upper in the placeRenderedText because renderedText is placed relative to a steady star it belongs to, but renderedText itself gets turned off and on and relative to it is placed the image.
	
	// and then... window.getComputedStyle(renderedText).getPropertyValue('height') would trip me up. Just as with mentioned upper, from the second opening of the text (when not having clicked anywhere else) it would show 'auto', all the other numbers work. I've tried focus and click (executed by the program) events to simulate click on body in between opening the texts, but it wouldn't work.
	// So I've created an object that gets updated in placeRenderedText, and then read in this function. The most simplest solution.
	//console.log(renderedTextCoordinatesDimensions);

	imagesArea.style.top = renderedTextCoordinatesDimensions.y + renderedTextCoordinatesDimensions.height - imagesArea.getBoundingClientRect().height+'px';

	if (renderedTextCoordinatesDimensions.x > windowDiv.getBoundingClientRect().width/2) imagesArea.style.left = renderedTextCoordinatesDimensions.x - renderedTextCoordinatesDimensions.width/2 - imagesArea.getBoundingClientRect().width - 20 + 'px';
	else imagesArea.style.left = renderedTextCoordinatesDimensions.x + renderedTextCoordinatesDimensions.width/2 + 20 + 'px';
}

export {placeRenderedText, placeImages}