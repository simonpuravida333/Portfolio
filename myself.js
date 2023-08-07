import {myself} from './objects.js';
import {hideStars, lessenStarsBrightness} from './content.js';
import {isMobile, touchResponse, adjustSizesForMobile} from './mobileResponsiveness.js';
import {placeRenderedText} from './placements.js';

const body = document.querySelector('body');
const myselfStar = document.createElement('div');
let dimensions;

async function createMyself()
{
	const theModule = await import('./startup.js');
	let windowDiv = theModule.default;
	const myselfCore = document.createElement('div');
	const myselfRing = document.createElement('div');
	myselfStar.classList.add('star');
	myselfStar.id = 'myselfStar';
	myselfCore.classList.add('core');
	myselfRing.classList.add('ring');
	myselfCore.style.width = '50%';
	myselfCore.style.height = '50%';
	myselfCore.style.opacity = 1;
	myselfRing.style.width = '100%';
	myselfRing.style.height = '100%';
	myselfRing.style.opacity = 1;
	myselfStar.append(myselfCore, myselfRing);
	windowDiv.append(myselfStar);
	
	setTimeout(()=>
	{
		myselfStar.style.display = 'block';
		myselfStar.animate({opacity: [0,1]},500).onfinish = ()=> myselfRing.animate({
			width: ['100%','200%','300%'],
			height: ['100%','200%','300%'],
			opacity: [0,1,0],
			easing: ['ease-in','ease-out'],
		},800).onfinish = ()=> myselfRing.animate({opacity: [0,1]},300);
	},3000);

	myselfStar.onmouseover = ()=>
	{
		myselfRing.animate({
			width: ['100%','80%','120%','100%'],
			height: ['100%','80%','120%','100%'],
			easing: ['ease-in','ease-out'],
		},800);
		myselfCore.animate({
			width: ['50%','50%','40%','50%'],
			height: ['50%','50%','40%','50%'],
			easing: ['ease-in','ease-out'],
		},800);
	}
	let myselfInfoVisible = false;
	myselfStar.onclick = ()=>
	{		
		myselfRing.animate({
			width: ['100%','200%','300%'],
			height: ['100%','200%','300%'],
			opacity: [1,1,0],
		},300).onfinish = ()=> myselfRing.animate({opacity: [0,1]},300);
		myselfInfoVisible ^= true;
		if (myselfInfoVisible)
		{
			myselfInfo.style.display = 'block';
			myselfInfo.animate({opacity:[0,1]},500);
			if (!isMobile) hideStars(true);
			else
			{
				touchResponse(myselfInfo, myselfStar);
				lessenStarsBrightness(true);
				placeRenderedText(null, 'myself', myselfInfo);
				myselfStar.animate({opacity: [1,0.3]},1000).onfinish = ()=> myselfStar.style.opacity = 0.3;
			}
			body.style.overflow = 'hidden';
		}
		else
		{
			myselfInfo.animate({opacity:[1,0]},500).onfinish = ()=> myselfInfo.style.display = 'none';
			if (!isMobile) hideStars(false);
			else
			{
				touchResponse(null);
				lessenStarsBrightness(false);
				myselfStar.animate({opacity: [0.3,1]},1000).onfinish = ()=> myselfStar.style.opacity = 1;
			}
			body.style.overflow = null;
		}
	}

	let myselfInfo = document.createElement('div');
	myselfInfo.classList.add('starDescription');
	if (isMobile) myselfInfo.id = 'myselfDescriptionMobile';
	else myselfInfo.id = 'myselfDescription';
	windowDiv.append(myselfInfo);
	if (isMobile)
	{
		dimensions = adjustSizesForMobile(null, myselfInfo);
		myselfStar.style.width = (dimensions/1.5)+'px';
		myselfStar.style.height = (dimensions/1.5)+'px';
		myselfStar.style.left = (dimensions/2)+'px';
		myselfStar.style.top = (dimensions/2)+'px';
	}
	myselfInfo = loopObject(myself, myselfInfo);
}

function loopObject(object, container)
{
	for (const key in object)
	{
		const subHeadline = document.createElement('div');
		subHeadline.innerHTML += key.replaceAll('_',' ').toUpperCase();
		subHeadline.style['font-weight'] = '600';
		subHeadline.style['font-size'] = (dimensions/5)+'px';
		
		if (typeof object[key] === 'object' && !Array.isArray(object[key]))
		{	
			const lineDiv = document.createElement('div');
			if (isMobile) lineDiv.classList.add('lineDivMobile');
			else lineDiv.classList.add('lineDiv');
			
			const pearl = document.createElement('div');
			if (isMobile) pearl.classList.add('pearlMobile');
			else pearl.classList.add('pearl');
			
			const flexy = document.createElement('div');
			flexy.classList.add('flexPart');
			flexy.style['margin-left'] = 0;
			flexy.append(pearl, lineDiv, pearl.cloneNode(true), subHeadline, pearl.cloneNode(true), lineDiv.cloneNode(true), pearl.cloneNode(true));
			
			const subContainer = document.createElement('div');
			subContainer.style.margin = ((isMobile) ? '60px' : '15px')
			subContainer.style['margin-bottom'] = ((isMobile) ? '120px' : '60px')
			container.append(flexy, loopObject(object[key], subContainer));
		}
		else 
		{
			const aDiv = document.createElement('div');
			aDiv.style['margin-bottom'] = ((isMobile) ? '80px' : '20px')
			subHeadline.style['letter-spacing'] = '0.1em';
			subHeadline.style['font-style'] = 'italic';
			subHeadline.style['font-family'] = 'Crimson Pro';
			aDiv.append(subHeadline);
			
			if (Array.isArray(object[key])) for (const point of object[key])
			{
				const subDiv = document.createElement('div');
				subDiv.innerHTML = point;
				if (isMobile) subDiv.style['font-size'] = (dimensions/5)+'px';
				//subDiv.style['margin-left'] = '20px';
				
				const flexy = document.createElement('div');
				flexy.classList.add('flexPart');
				flexy.style['justify-content'] = 'left';
				flexy.style.margin = 0;
				flexy.style['margin-bottom'] = ((isMobile) ? '20px' : '10px')
				
				const bullet = document.createElement('div');
				bullet.style.marginRight = ((isMobile) ? '20px' : '10px')
				bullet.innerHTML = "<strong>&#9679</strong>"
				flexy.append(bullet, subDiv)
				aDiv.append(flexy)
				/*if (x === object[key].length-1) aDiv.append(subDiv)
				else aDiv.append(flexy);*/ // useful when creating style-divisions between the points, so that there's no division after the last point
			}
			else if (key === 'imgLink')
			{
				subHeadline.innerHTML = "";
				const image = document.createElement('img');
				image.src = object[key];
				const frame = document.createElement('div');
				frame.style.border = ((isMobile) ? "16px solid white" : "8px solid white");
				frame.style['border-radius'] =  ((isMobile) ? '20px' : '10px');

				image.onload = ()=>
				{
					frame.style['max-width'] = image.naturalWidth+'px';
					frame.style['max-height'] = image.naturalHeight+'px';
					frame.style.margin = '0 auto';
					frame.append(image);
					aDiv.append(frame);
				}
			}
			else 
			{
				const subDiv = document.createElement('div');
				if (isMobile) subDiv.style['font-size'] = (dimensions/5)+'px';
				subDiv.innerHTML = object[key];
				aDiv.append(subDiv);
			}
			container.append(aDiv);
		}
	}
	return container;
}

export {createMyself, myselfStar};