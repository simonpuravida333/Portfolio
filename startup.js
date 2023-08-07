import {createMyself} from './myself.js';
import {createContent} from './content.js';
import {isMobile} from './mobileResponsiveness.js';
import {fullWindow, frameImageFullWindow} from './fullScreenImage.js';

const body = document.querySelector('body');
// screen.orientation.lock = 'portrait';

const background = document.createElement('img');
if (screen.height <= 1080 && screen.width <= 1920) background.src = "images/nightsky compressed.jpg"; // 2K
else background.src = "images/nightsky upscaled compressed.jpg"; // 8K
background.classList.add('window');
const windowDiv = document.createElement('div');
windowDiv.classList.add('window');
windowDiv.append(background);
body.append(windowDiv);

let windowAspectRatio = (window.innerWidth / window.innerHeight).toFixed(4);
const backgroundAspectRatio = 1.7778; // 16:9, the aspect ratio of the background image
let backgroundImageFullHeight = true;
if (windowAspectRatio > backgroundAspectRatio) backgroundImageFullHeight = false;

const infoBlockScreen = document.createElement('div');
infoBlockScreen.id = 'infoBlockScreen';
infoBlockScreen.innerHTML = 'This app has been developed for portrait (upright) mobile screens. Tilt back to enjoy.';
windowDiv.append(infoBlockScreen);

background.onload = async ()=>
{
	let contentDelivered = false;
	let preventCreatingContent = true;
	
	function adjustBackground() // makes certain that height is always used.
	{
		windowAspectRatio = (window.innerWidth / window.innerHeight).toFixed(4);
		if (windowAspectRatio > backgroundAspectRatio) backgroundImageFullHeight = false;
		else backgroundImageFullHeight = true;
		
		const viewport = document.getElementById('theViewport');
		if (isMobile)
		{
			viewport.setAttribute('content', 'height='+window.innerHeight+'px');
			const allStars = Array.from(document.getElementsByClassName('starAndGlow'));
			allStars.push(document.getElementById('myselfStar'));
			
			if (backgroundImageFullHeight)
			{
				if (contentDelivered) for (const star of allStars) star.style.display = 'block';
				infoBlockScreen.style.display = 'none';
				preventCreatingContent = false;
			}
			else
			{
				if (contentDelivered)
				{
					for (const star of allStars)
					{
						if (star.children[1].style.opacity === '1' && star.id !== 'myselfStar') star.children[4].click();
						else if (star.id === 'myselfStar' && star.style.opacity === '0.3') star.click();
						star.style.display = 'none';
					}
					for (const child of windowDiv.children) if (child.style.display === 'block') child.style.display = 'none'; // opened star texts, no time for animation ...and not necessary, as tilting the screen is an animation - or movement - in the user's hand
				}
				infoBlockScreen.style.display = 'block';
			}
		}
		
		if (backgroundImageFullHeight)
		{
			body.style['overflow-y'] = 'hidden';
			windowDiv.style.height = '100%'; // window.innerHeight + 'px'; // 100% does not include the scroll bar, while window.innerHeight does.
			windowDiv.style.width = background.getBoundingClientRect().height*backgroundAspectRatio + 'px';
		}
		else
		{
			body.style['overflow-y'] = 'visible';
			windowDiv.style.width = '100%'; // window.innerWidth + 'px';
			windowDiv.style.height = background.getBoundingClientRect().width/backgroundAspectRatio + 'px';
		}		
	}
	
	adjustBackground();
	window.addEventListener('resize',()=>
	{
		adjustBackground();
		if (fullWindow.style.display === 'block') frameImageFullWindow();
	});
	if (isMobile)
	{
		const waiting = setInterval(()=>
		{
			if (!preventCreatingContent)
			{
				clearInterval(waiting);
				contentDelivered = createContent();
				createMyself();
			}
		},100)
	}
	else
	{
		contentDelivered = createContent();
		createMyself();
	}
}

export default windowDiv;