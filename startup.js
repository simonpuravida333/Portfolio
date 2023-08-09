import {createMyself} from './myself.js';
import {createContent, stars} from './content.js';
import {isMobile, adjustSizesForMobile} from './mobileResponsiveness.js';
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
			
			if (backgroundImageFullHeight)
			{
				if (contentDelivered) for (const star in stars) stars[star].star.style.display = 'block';
				infoBlockScreen.style.display = 'none';
				preventCreatingContent = false;
			}
			else
			{
				if (contentDelivered)
				{
					for (const star in stars)
					{
						if (stars[star].accessed === true) stars[star].access();
						stars[star].star.style.display = 'none';
					}
					const myselfStar = document.getElementById('myselfStar');
					if (myselfStar.style.opacity === '0.3') myselfStar.click();
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



// DEBUG - HARD REFRESH TRIGGER (since there's no quick option in Chrome mobile)
const refreshStar = document.createElement('div');
const refreshCore = document.createElement('div');
const refreshRing = document.createElement('div');
refreshStar.classList.add('star');
refreshCore.classList.add('core');
refreshRing.classList.add('ring');
refreshCore.style.width = '50%';
refreshCore.style.height = '50%';
refreshCore.style.opacity = 1;
refreshCore.style['background-color'] = 'rgb(0,175,255)';
refreshRing.style.width = '100%';
refreshRing.style.height = '100%';
refreshRing.style.opacity = 1;
refreshRing.style.border = ((isMobile) ? '20px' : '5px') + ' solid white';
refreshStar.style.cursor = 'pointer';
refreshStar.style['z-index'] = '10';
refreshStar.style.width = '50px';
refreshStar.style.height = '50px';
refreshStar.style.left = '50px';
refreshStar.style.top = '500px';
if (isMobile)
{
	let dimensions = adjustSizesForMobile();
	refreshStar.style.width = dimensions+'px';
	refreshStar.style.height = dimensions+'px';
	refreshStar.style.left = dimensions+'px';
	refreshStar.style.top = (dimensions*10)+'px';
}
refreshStar.append(refreshCore, refreshRing);
windowDiv.append(refreshStar);
refreshStar.onclick = ()=> window.location.reload(true);
// END DEBUG