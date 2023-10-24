import {projects, myself} from './objects.js';
import {starSVG, haloSVG, gitHubIconSVG, canvaIconSVG, canvaIconSVGDefsPart, youtubeIconSVG} from './SVGs.js';
import {fullWindow, nextImageFullWindow, frameImageFullWindow, globalImage} from './fullScreenImage.js';
import {placeRenderedText, placeImages} from './placements.js';
import {isMobile, touchResponse, adjustSizesForMobile} from './mobileResponsiveness.js';

const body = document.querySelector('body');
body.innerHTML += canvaIconSVGDefsPart; // adds the "defs" part to body. It contains the styling IDs. This is vital if you have several instances of the same SVG and deal with display none / block of the SVGs. It's because the browser caches IDs only once, so the second, third... copy of a SVG you call won't have styling. Only the first does, unless the first is display = block while another one is display = block. Then the other one will also have proper styling for the time the first SVG is visible. Becuase the SVG get display = block / none in the DOM, the browser can't find the ID of the first SVG (the only one it cached) for the second, third ... SVG; so they won't have styling. That's the tricky thing about having in-place IDs (as in SVGs) get added / removed from the DOM. The brower is fooled in thinking (CSS) IDs are always global. That's why I've seperated the <defs> part from the Canva SVG it belonged to and just place the <defs> part permanently to the body right away, to provide global styling.

const stars = {}

async function createContent()
{
	const theModule = await import('./startup.js'); // because of hoisting. startup.js is the last module to load.
	let windowDiv = theModule.default;
	const thatManyStars = projects.length;
	const shuffledSuccession = [];
	for (let z = 0; z < thatManyStars; z++) shuffledSuccession[z]=z;
	shuffledSuccession.sort(() => Math.random() - 0.5);

	let colorRange = getRndInteger(0,360);
	while (40 < colorRange && colorRange < 160) colorRange = getRndInteger(0,360); // avoids greens.
	
	// GETTING PLACEMENT RANGES
	// all in %
	let horizontalSection = 100 / thatManyStars;
	const marginPercentage = 0.50; // the higher the marginPercentage, the more evenly the distribution. Also: at a certain margin size it's likely for the rightmost stars to go out of windowDiv-bounds. When using high margins, lower the xProgress instantiation value.
	const margin = horizontalSection*marginPercentage;
	horizontalSection -= margin;
	let xProgress = margin; // when using higher margin, the start value should be smaller. At 99% margin, the value should be negative margin/2.

	for (let z = 0; z < thatManyStars; z++)
	{
		// COLOR
		const colorDegree = getRndInteger(colorRange-30, colorRange+30)
		const color = "hsl("+colorDegree+", 80%, 60%)"; // hsl color can deal with negative degrees
		
		// PLACEMENT COORDINATES IN ABSOLUTE % WITHIN windowDiv
		xProgress += getRndFloat(0, horizontalSection)+margin;
		const xPlacement = xProgress;
		const yPlacement = getRndFloat(10, 50); // arbitrarily adjusted to background-image, where the upper 60% is the night sky above the landscape. Similar to X, it's given a upper and lower cushion.
		// const yPlacement = getRndFloat(30, verticalUpperRangePercent); // DEBUG
		const starAndGlow = document.createElement('div');
		starAndGlow.classList.add('starAndGlow');
		starAndGlow.style.left = xPlacement+'%';
		starAndGlow.style.top = yPlacement+'%';
		
		// GETTING STAR AND HALO (and making the classes and IDs names in SVGs unique to avoid duplicate styling)
		let newStar = `${starSVG}`; // clones the string
		newStar = newStar.replace(/#([0-9]|[A-F]){6}/, color);
		newStar = newStar.replaceAll('st0','st'+z);
		let newHalo = `${haloSVG}`;
		newHalo = newHalo.replaceAll(/#([0-9]|[A-F]){6}/g, color);
		newHalo = newHalo.replaceAll("SVGID_1_","SVGID_"+z+"_");
		newHalo = newHalo.replaceAll("st2","st"+(thatManyStars+z));
		const star = document.createElement('div');
		star.innerHTML = newStar;
		star.style.opacity = 0;
		const halo = document.createElement('div');
		halo.innerHTML = newHalo;
		halo.classList.add('halo');
		halo.style.opacity = 0;
		
		// STAR DIFFRACTION AND TOUCH AREA
		const starDiffractionHorizontal = document.createElement('div');
		const starDiffractionVertical = document.createElement('div');
		starDiffractionHorizontal.classList.add('starDiffractionHorizontal');
		starDiffractionVertical.classList.add('starDiffractionVertical');
		const core = document.createElement('div');
		core.style.opacity = 0;
		core.classList.add('core');
		const starDiffraction = document.createElement('div');
		starDiffraction.classList.add('starDiffraction');
		
		const touchArea = document.createElement('div');
		touchArea.classList.add('star');
		touchArea.classList.add('touchArea');
		touchArea.style.cursor = 'pointer';
		touchArea.style['tabindex'] = 1;
		
		starDiffraction.append(starDiffractionVertical, starDiffractionHorizontal);
		starAndGlow.append(star, halo, starDiffraction, core, touchArea);
		windowDiv.append(starAndGlow);
		
		// STAR BIRTH ANIMATION
		const starBirthCore = document.createElement('div');
		starBirthCore.classList.add('core');
		const starBirthRing = document.createElement('div');
		starBirthRing.classList.add('ring');
		starAndGlow.append(starBirthCore, starBirthRing);
		
		// STAR TEXT
		const renderedText = document.createElement('div');
		renderedText.classList.add('starDescription'/*,'mask'*/);
		for (const key in projects[z])
		{
			if (key === 'links' || key === 'imageLinks' || key === 'youtube') continue;
			renderedText.innerHTML += "<strong><i>"+ key.charAt(0).toUpperCase()+key.slice(1) +"</i></strong><br>";
			const aDiv = document.createElement('div');
			aDiv.style['margin-left'] = '15px';
			aDiv.style['margin-bottom'] = '15px';
			aDiv.innerHTML = projects[z][key]+"<br>";
			renderedText.append(aDiv);
		}
		
		// MOBILE TEXT ADJUSTMENT
		let textAreaBorderWidth = 20;
		if (isMobile) textAreaBorderWidth = adjustSizesForMobile(starAndGlow, renderedText)/10;
		
		// MOBILE SVG ADJUSTMENT
		let iconSVG;
		let youtubeSVG;
		if (isMobile)
		{
			if (projects[z].work === 'Software Engineering') iconSVG = gitHubIconSVG.replace("width='98' height='96'","width='196' height='192'");
			else iconSVG = canvaIconSVG.replace("width='100' height='100'", "width='200' height='200'");
			youtubeSVG = youtubeIconSVG.replace("width='100' height='100'", "width='200' height='200'")
		}
		else
		{
			if (projects[z].work === 'Software Engineering') iconSVG = gitHubIconSVG;
			else iconSVG = canvaIconSVG;
			youtubeSVG = youtubeIconSVG;
		}

		const flexDiv = document.createElement('div');
		flexDiv.style.display = 'flex';
		renderedText.append(flexDiv);
		for (const link of projects[z].links)
		{
			const svgDiv = document.createElement('div');
			if (isMobile) svgDiv.classList.add('svgDivMobile');
			else svgDiv.classList.add('svgDiv');
			const theLink = document.createElement('a');
			theLink.href = link;
			theLink.innerHTML = `${iconSVG}`;
			svgDiv.append(theLink);
			flexDiv.append(svgDiv);
		}
		if (projects[z].work === 'Software Engineering' && projects[z].youtube !== undefined) if (projects[z].youtube.length > 0) for (const link of projects[z].youtube)
		{
			const svgDiv = document.createElement('div');
			if (isMobile) svgDiv.classList.add('svgDivMobile');
			else svgDiv.classList.add('svgDiv');
			const theLink = document.createElement('a');
			theLink.href = link;
			theLink.innerHTML = `${youtubeSVG.replaceAll('youtube', 'youtube'+z)}`;
			svgDiv.append(theLink);
			flexDiv.append(svgDiv);
		}
		
		windowDiv.append(renderedText);
		const renderedTextCoordinatesDimensions = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		}
		
		// IMAGES
		const imagesArea = document.createElement('div');
		if (isMobile)
		{	
			imagesArea.classList.add('imagesAreaMobile');
			renderedText.append(imagesArea);
			let imageFocus = false;
			/*
			imagesArea.onclick = ()=>
			{
				imageFocus ^= true;
				stars[z].imageFocus = imageFocus;
				if (imageFocus)
				{
					for (const child of renderedText.children) child.style.opacity = 0.5;
					imagesArea.style.opacity = 1;
					imagesArea.style.position = 'absolute';
					imagesArea.style.transform = 'translate(-50%,-50%)';
					imagesArea.style.left = '50%';
					imagesArea.style.top = '50%';
					imagesArea.style.width = '95%';
					imagesArea.style.margin = '0px';
					imagesArea.style['z-index'] = 5;
					clearTimeout(theTimeout);
				}
				else
				{
					for (const child of renderedText.children) child.style.opacity = 1;
					imagesArea.style = null;
					theTimeout = setTimeout(nextImage, presentationTime, false);
				}
			}
			*/
		}
		else
		{
			imagesArea.classList.add('imagesArea');
			windowDiv.append(imagesArea);
			imagesArea.onclick = ()=>
			{
				globalImage.array = imageArray;
				globalImage.index = index;
				touchArea.click();
				nextImageFullWindow(true);
			}
		}
		imagesArea.style.display = 'none';
		
		let go = true;
		const imageArray = [];
		let index = -1;
		let openedFirstTime = false;
		
		async function loadImages()
		{
			if(projects[z].imageLinks !== undefined) if (projects[z].imageLinks.length > 0)
			{
				for (const image in projects[z].imageLinks)
				{
					const img = document.createElement('img');
					img.src = projects[z].imageLinks[image];
					//console.log(img.src);
					img.classList.add('starImage');
					imageArray.push(img);
				}
				imagesArea.append(imageArray[0]);
				if (!imageArray[0].complete) await new Promise(wait => imageArray[0].onload = wait);
				return true;
			}
		}
		
		let theTimeout;
		let presentationTime = 3500;
		if (isMobile) presentationTime = 5000;
		async function nextImage(continueAgain)
		{
			if (index >= imageArray.length-1 || index < 0) index = 0;
			else if(!continueAgain) index++;
			if (!imageArray[index].complete) await new Promise(wait => imageArray[index].onload = wait);
			if (!continueAgain) imagesArea.animate({opacity: [1,0]},333).onfinish = ()=>
			{
				if (imagesArea.children.length > 0) imagesArea.removeChild(imagesArea.children[0]);
				imagesArea.append(imageArray[index]);
				if (isMobile) placeRenderedText(null, null, renderedText);
				else placeImages(windowDiv, imagesArea, renderedTextCoordinatesDimensions);
				imagesArea.animate({opacity: [0,1]}, 333).onfinish = ()=> {theTimeout = setTimeout(nextImage, presentationTime, false)};
			}
			else theTimeout = setTimeout(nextImage, presentationTime, false);
		}

		if (!isMobile) window.addEventListener('resize',()=>
		{
			placeRenderedText(windowDiv, starAndGlow, renderedText, renderedTextCoordinatesDimensions);
			placeImages(windowDiv, imagesArea, renderedTextCoordinatesDimensions);
		});	
					
		setTimeout(()=>
		{
			starBirthCore.animate([{width: '10%', height: '10%', opacity: 1},{width: '80%', height: '80%', opacity: 1},{width: '130%', height: '130%',opacity:0}],1700).onfinish = ()=> starBirthCore.style.display = 'none';
			starBirthRing.animate([{width: '10%', height: '10%', opacity: 1},{width: '250%', height: '250%', opacity: 1,  borderWidth: '10px'},{width: '500%', height: '500%', opacity: 0, borderWidth: '10px'}],1500).onfinish = ()=> starBirthRing.style.display = 'none';
			starDiffraction.animate([{width: '130%', height: '130%', opacity: 0},{width: '400%',height: '300%', opacity: 1},{opacity: 1}],1500).onfinish = ()=> starDiffraction.style.opacity = 1;
			star.animate({opacity: [0, 0.2, 1]},1500).onfinish = ()=> star.style.opacity = 1;
			core.animate({opacity: [0, 0.2, 1]},1500).onfinish = ()=> core.style.opacity = 1;
		}, shuffledSuccession[z]*200);
		
		const infoDivAni = renderedText.animate({opacity: [0,1]},300);
		const infoTextAni = renderedText.animate({color: ['rgba(255,255,255,0)','rgba(255,255,255,1)']},333);
		infoDivAni.pause();
		infoTextAni.pause();
		
		let blockAllAni = false;
		let blockMouseOut = false;
		
		touchArea.onmouseover = ()=> {if (!blockAllAni) mouseOver();}
		touchArea.onmouseout = ()=>
		{
			if (!blockAllAni && !blockMouseOut) mouseOut();
			blockMouseOut = false;
		}
		touchArea.onclick = ()=> accessingStar();
		
		async function accessingStar()
		{
			blockAllAni ^= true;
			starBirthRing.style.display = 'block';
			starBirthRing.animate([{width: '60%', height: '60%', opacity: 1},{width: '130%', height: '130%', borderWidth: '3px', opacity: 1},{width: '200%', height: '200%', borderWidth: '3px', opacity: 0}],400).onfinish = ()=> starBirthRing.style.display = 'none';
			
			if (blockAllAni)
			{
				stars[z]['accessed'] = true;
				if (isMobile)
				{
					body.style.overflow = 'hidden';
					touchResponse(renderedText, touchArea);
					lessenStarsBrightness(true);
				}	
				
				//renderedText.classList.remove('mask');
				renderedText.animate([{borderTop: textAreaBorderWidth+'px solid #2D476B', borderBottom: textAreaBorderWidth+'px solid #2D476B', backgroundColor: 'rgba(25,32,53,0.3)'},{borderTop: textAreaBorderWidth+'px solid white', borderBottom: textAreaBorderWidth+'px solid white', backgroundColor: 'rgba(25,32,53,0.3)'},{borderTop: textAreaBorderWidth+'px solid '+ color, borderBottom: textAreaBorderWidth+'px solid '+color, backgroundColor: '#2D476B'}],500).onfinish = ()=>
				{
					renderedText.style['border-bottom'] = textAreaBorderWidth+"px solid " + color;
					renderedText.style['border-top'] = textAreaBorderWidth+"px solid " + color;
					renderedText.style['background-color'] = null;
				}
			
				if (!openedFirstTime)
				{
					openedFirstTime = true;
					await loadImages();
				}
				if /* still */ (blockAllAni)
				{
					imagesArea.style.display = 'block';
					imagesArea.animate({opacity: [0,1]},500);
					if (!isMobile) placeImages(windowDiv, imagesArea, renderedTextCoordinatesDimensions);
					
					if (imageArray.length > 0)
					{
						clearTimeout(theTimeout);
						go = true;
						if (!stars[z].imageFocus) nextImage(true); // for mobile; on desktop it'll always be false.
					}
				}
			}
			else 
			{
				stars[z]['accessed'] = false;
				if (isMobile)
				{
					touchResponse(null);
					body.style.overflow = null;
					lessenStarsBrightness(false);
				}
				//renderedText.classList.add('mask');
				
				renderedText.animate([{borderTop: textAreaBorderWidth+'px solid '+ color, borderBottom: textAreaBorderWidth+'px solid '+color}, {borderTop: textAreaBorderWidth+'px solid #2D476B', borderBottom: textAreaBorderWidth+'px solid #2D476B'}],500).onfinish =()=>
				{
					renderedText.style['border-bottom'] = textAreaBorderWidth+"px solid transparent";
					renderedText.style['border-top'] = textAreaBorderWidth+"px solid transparent";
				}
				imagesArea.animate({opacity: [1,0]},500).onfinish = ()=> imagesArea.style.display = 'none';
				clearTimeout(theTimeout);
			}
			if (!blockAllAni) mouseOut();
			else if (halo.style.opacity < 1) mouseOver();
			blockMouseOut = true;
			touchArea.blur();
		}
		
		function mouseOut()
		{
			starDiffraction.animate([{width: '230%',height: '230%'},{width: '130%', height: '130%'}],200).onfinish = ()=> {starDiffraction.style.width = '130%'; starDiffraction.style.height = '130%';}
			halo.animate({opacity: [1,0]},200).onfinish = ()=> halo.style.opacity = 0;
			core.animate([{width: '15%', height: '15%'},{width: '10%', height: '10%'}],200).onfinish = ()=> {core.style.width = '10%'; core.style.height = '10%';}
			infoDivAni.reverse();
			infoDivAni.onfinish = ()=> renderedText.style.display = 'none';
		}
		
		async function mouseOver()
		{
			starDiffraction.animate([{width: '130%', height: '130%'},{width: '230%',height: '230%'}],200).onfinish = ()=> {starDiffraction.style.width = '230%'; starDiffraction.style.height = '230%';};
			halo.animate({opacity: [0,1]},200).onfinish = ()=> halo.style.opacity = 1;
			core.animate([{width: '10%', height: '10%'},{width: '15%', height: '15%'}],200).onfinish = ()=> {core.style.width = '15%'; core.style.height = '15%';}
			if (isMobile) await new Promise(wait=> setTimeout(wait,1000));
			if (infoDivAni.playbackRate === -1) infoDivAni.playbackRate = 1;
			renderedText.style.display = 'block';
			renderedText.style['background-color'] = 'rgba(25,32,53,0.3)'; //'transparent';
			renderedText.style.color = 'rgba(255,255,255,0)';
			infoDivAni.play();
			infoDivAni.onfinish = ()=>
			{
				infoTextAni.play();
				infoTextAni.onfinish = ()=> renderedText.style.color = 'rgba(255,255,255,1)';
			}
			placeRenderedText(windowDiv, starAndGlow, renderedText, renderedTextCoordinatesDimensions);
		}
		
		stars[z] = {}
		stars[z]['star'] = starAndGlow;
		stars[z]['access'] = accessingStar;
		stars[z]['accessed'] = false;
		stars[z]['imageFocus'] = false;
	
	}
	return true;
}

var inLock = false;
async function hideStars(hide)
{
	if (!inLock)
	{
		inLock = true;
		const allStars = []; //Array.from(document.getElementsByClassName('starAndGlow'));
		for (const star in stars) allStars.push(stars[star].star);
		while (!allHiddenOrVisible(allStars)) await new Promise(resolve => setTimeout(resolve,200));
		if (hide) for (const star of allStars) setTimeout(()=>{star.animate({opacity: [1,0]},400).onfinish = ()=> star.style.display = 'none'},200*getRndInteger(0,allStars.length));
		else for (const star of allStars) setTimeout(()=>{star.style.display = 'block'; star.animate({opacity: [0,1]},400)},200*getRndInteger(0,allStars.length));
		await new Promise(resolve => setTimeout(resolve, allStars.length*200));
		inLock = false;
	}
}

function allHiddenOrVisible(allStars)
{
	let none = 0, block = 0, empty = 0;
	for (const star of allStars)
	{
		if (star.style.display === '') empty++; // the first time will be this, when only the CSS styling is in effect, before any JS-set styling (block/none)
		if (star.style.display === 'none') none++;
		if (star.style.display === 'block') block++;
	}
	if (empty === allStars.length || block === allStars.length || none === allStars.length) return true;
	return false;
}

function lessenStarsBrightness(lessen) // for mobile
{
	const allStars = Array.from(document.getElementsByClassName('starAndGlow'));
	allStars.push(document.getElementById('myselfStar'));
	const aniOpa = (lessen) ? [1,0.3] : [0.3,1];
	for (const star of allStars)
	{
		star.style.opacity = (lessen) ? 0.3 : 1;
		star.animate({opacity: aniOpa},100*getRndInteger(0,allStars.length));
	} 
}

function getRndInteger(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min, max)
{
	return Math.random() * (max - min) + min;
}

export {createContent, hideStars, lessenStarsBrightness, stars}