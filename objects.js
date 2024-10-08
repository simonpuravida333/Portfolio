function codingProject(links, youtube, imageLinks)
{
	this.work = 'Software Engineering';
	this.links = links;
	this.youtube = youtube;
	this.imageLinks = imageLinks;
}

function designProject(links, youtube, imageLinks)
{
	this.work = 'Design';
	this.links = links;
	this.youtube = youtube;
	this.imageLinks = imageLinks;
}

export const projects = [];

const googleSearch = new codingProject();
googleSearch.name = 'Google Search';
googleSearch.objective = 'Visually identical google search front page, queries will redirect to google results.';
googleSearch.stack = 'Front-end: HTML, CSS';
googleSearch.implementations = 'Mostly a CSS challenge. Links with parameters. Image search page, advanced search parameters page.';
googleSearch.sophistication = '&#x2B24';
googleSearch.links = ['https://github.com/simonpuravida333/GoogleSearch'];
googleSearch.imageLinks = ['captures/Google Search 1.png', 'captures/Google Search 2.png', 'captures/Google Search 2B.png', 'captures/Google Search 3.png', 'captures/Google Search 4.png'];
//projects.push(googleSearch);

const wiki = new codingProject();
wiki.name = 'Wiki';
wiki.objective = 'A simple Wikipedia App for reading, creating & editing articles.';
wiki.stack = 'Back-end: Python / Django<br>Front-end: HTML, CSS';
wiki.implementations = 'Django routing; Django templates; algorithms; use of Markdown';
wiki.sophistication = '&#x2B24 &#x2B24';
wiki.links = ['https://github.com/simonpuravida333/Wiki'];
wiki.imageLinks = ['captures/Wiki 1.png', 'captures/Wiki 2.png', 'captures/Wiki 3.png', 'captures/Wiki 4.png'];
wiki.landscapeTitle = 'Wiki';
//projects.push(wiki);

const auctions = new codingProject();
auctions.name = 'Auctions';
auctions.objective = 'An ebay-like application.<br>Create listings, put articles on watchlist, bid on articles...';
auctions.stack = 'Back-end: Pyton / Django, SQLite, Jinja2<br>Front-end: HTML, CSS';
auctions.implementations = '8 SQL tables / models, additional to user; Django forms; 7 basic pages (like watchlist, active biddings, acquired auctions...); algorithms, bidding with responsive messages; comments; article categories; UI design';
auctions.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24';
auctions.links = ['https://github.com/simonpuravida333/Auctions'];
auctions.youtube = ['https://youtu.be/HGsgk-MQWoE'];
auctions.imageLinks = ['captures/Auctions 1.png', 'captures/Auctions 2.png', 'captures/Auctions 3.png', 'captures/Auctions 4.png', 'captures/Auctions 5.png', 'captures/Auctions 6.png', 'captures/Auctions 7.png', 'captures/Auctions 8.png', 'captures/Auctions 9.png', 'captures/Auctions 10.png', 'captures/Auctions 12.png', 'captures/Auctions 13.png'];
auctions.landscapeTitle = 'Auctions (eBay)';
projects.push(auctions);

const mail = new codingProject();
mail.name = 'Mail';
mail.objective = 'A single-page e-mail application implemention on the front-end.';
mail.stack = 'Front-end: JavaScript, AJAX, JSON REST API, CSS, HTML';
mail.implementations = 'algorithms, UI design, single-page app';
mail.sophistication = '&#x2B24 &#x2B24 &#x2B24';
mail.links = ['https://github.com/simonpuravida333/Mail'];
mail.youtube = ['https://youtu.be/LIokAGj2cc4'];
mail.imageLinks = ['captures/Mail 1.png', 'captures/Mail 2.png', 'captures/Mail 3.png', 'captures/Mail 4.png', 'captures/Mail 5.png', 'captures/Mail 6.png'];
mail.landscapeTitle = 'E-Mail';
projects.push(mail);

const network = new codingProject();
network.name = 'Network';
network.objective = 'A Twitter-like single-page app for writing messages and following people.'
network.stack = 'Back-end: Python / Django, SQLite, JSON REST API<br>Front-end: JavaScript, AJAX, Web Animations API, HTML, CSS';
network.implementations = '3 SQL tables / models, routing, algoritms (on both stack-ends), UI design, single-page app';
network.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24 ';
network.links = ['https://github.com/simonpuravida333/Network'];
network.youtube = ['https://youtu.be/QBCzfgj4_ow'];
network.imageLinks = ['captures/Network 1.png', 'captures/Network 2.png', 'captures/Network 3.png', 'captures/Network 4.png', 'captures/Network 5.png'];
network.landscapeTitle = 'Network (Twitter)';
projects.push(network);

const life = new codingProject();
life.name = 'Life';
life.objective = 'A single-page app to easily access the data of the GBIF (Global Biodiversity Information Facility). The choice of project was free in this final assignment: I chose the GBIF where two passions come together: nature and tech.';
life.stack = 'Front-end: JavaScript, AJAX, Rest API, Web Animations API, HTML, CSS, mobile responsive<br>Back-end: Rest API written in Django / Python that imitates (simplified) the GBIF Rest API; SQLite; allows for saving of new specieses and occurrences.';
life.implementations = 'deep examination of the GBIF Rest API, sensible user querying and filter options, fetch calls design with thorough server response vetting, everything is fetched and loaded dynamically, dynamic and appealing UI design, animations';
life.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24';
life.links = ['https://github.com/simonpuravida333/Life'];
life.youtube = ['https://youtu.be/QZl-F8OFy-Q', 'https://youtu.be/buld3ph_Uvs'];
life.imageLinks = ['captures/Life 1.png', 'captures/Life 2.png', 'captures/Life 3.png', 'captures/Life 4.png', 'captures/Life 5.png', 'captures/Life 6.png', 'captures/Life 7.png', 'captures/Life 8.png', 'captures/Life 9.png', 'captures/Life 10.png', 'captures/Life 11.png',  'captures/Life 12.png',  'captures/Life 13.png', 'captures/Life 14.png'];
life.landscapeTitle = 'LIFE';
projects.push(life);

const vocz = new codingProject();
vocz.name = 'Vocz';
vocz.objective = "A single-page app for learning vocabulary.";
vocz.stack = 'Front-end: JavaScript, HTML, CSS';
vocz.implementations = 'appealing design and fluent user interactivity to make it feel like a computer game; algorithms<br><br>Creator comment: Vocz was my first JS application, written several years ago out of personal need / desire. Today, knowing JS better, I would write the code differently. It is perfectly stable though and the code is coherent.'
vocz.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24';
vocz.links = ['https://github.com/simonpuravida333/Vocz'];
vocz.imageLinks = ['captures/Vocz 1.png', 'captures/Vocz 2.png', 'captures/Vocz 3.png', 'captures/Vocz 6.png'];
vocz.landscapeTitle = 'Vocz (learning App)';
projects.push(vocz);

const portfolio = new codingProject();
portfolio.name = '(This) Portfolio';
portfolio.objective = "A single-page app for presenting my projects.";
portfolio.stack = "Front-end: vanilla JavaScript, CSS";
portfolio.implementations = "appealing visuals; mobile responsive; browser is essentially used like a game engine, meaning objects are given absolute coordinate values and placed on a 2D landscape; all coordinates and dimensions dynamically calculated; it became more sophisticated than anticipated.";
portfolio.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24';
portfolio.links = ['https://github.com/simonpuravida333/Portfolio'];
portfolio.landscapeTitle = '(This) Portfolio App';
projects.push(portfolio);

const vela = new designProject();
vela.name = 'Vela';
vela.concept = "A design concept (UX and UI) for a novel way of creating, managing and developing ideas, information and big projects.<br>...Vela has been a huge undertaking that was years in the making as it breaks with conventional UI and UX designs. The concept went through four revisions over three years.<br>In the near future I want to realize the concept technically.";
vela.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24';
vela.links = ['https://www.canva.com/design/DAFR2g6jMGE/Uq9ObLDajJBAQm3uq4PKOg/edit?utm_content=DAFR2g6jMGE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', 'https://www.canva.com/design/DAFQpdEimPw/9MUFDx3xx5s9yrCGljKjnw/edit?utm_content=DAFQpdEimPw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', 'https://www.canva.com/design/DAFX91MbUIE/Tq-tpr-geISHcNbDTI1xfA/edit?utm_content=DAFX91MbUIE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'];
vela.imageLinks = ['captures/Vela 1.png', 'captures/Vela 2.png', 'captures/Vela 3.png', 'captures/Vela 4.png', 'captures/Vela 5.png'];
vela.landscapeTitle = 'VELA (Design)';
projects.push(vela);

const berlioz = new designProject();
berlioz.name = 'Berlioz';
berlioz.concept = "A design concept for a novel way of composing melodies. It combines the strengths of MIDI keys with conventional notation, something that doesn't exist currently, but has huge potential.";
berlioz.sophistication = '&#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24 &#x2B24';
berlioz.links = ['https://www.canva.com/design/DAFSzcX9FIE/nsbMCeFcpSsz7-xhMKUsIw/edit?utm_content=DAFSzcX9FIE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'];
berlioz.imageLinks = ['captures/Berlioz 1.png', 'captures/Berlioz 2.png', 'captures/Berlioz 3.png', 'captures/Berlioz 4.png'];
berlioz.landscapeTitle = 'Berlioz (Design)';
projects.push(berlioz);

export const myself = {
	myself:
	{
		name: "Simon R&#246sch",
		passions: ["I &#x1F49C to conceptualize and design apps.","I &#x1F49C programming and technically design systems.","Interaction design serves my strong interests in aesthetics, conceptualization and creating an engaging flow state.","Programming serves my passions for building things and solving problems."],
		what_I_Want: "To create ;)",
		what_fascinates_me_the_most: "Creativity, nature and tech. My app designs draw strongly from nature &#x1F33A &#x1F99A &#x1F338 aesthetically and functionally, and are often about aiding the ideation process",
		why_You_want_me: "Generally, I like any programming challenge. I can develop Fullstack Apps, but feel especially at home on the frontend. I've always loved puzzle games and programming is the <i>ultimate</i> puzzle game.<br><br>My full potential comes to the fore where I'm allowed to explore new user interfaces and visual interactivities, when I'm given space to let my creativity loose and develop novel and appealing interactive functionalities, designs and art." ,
		further_interests: "Astronomy, ancient history, cultures and anthropology, composing music, creative writing, the conservation of the natural world.",
		imgLink: "images/myself close-up 1000px.jpg",
	},
	software_engineering:
	{
		junior_skills: 'Java <strong>&#9679</strong> Python <strong>&#9679</strong> Django <strong>&#9679</strong> Git <strong>&#9679</strong> SQL <strong>&#9679</strong> HTML <strong>&#9679</strong> CI',
		advanced_skill: 'Lua <strong>&#9679</strong> LÖVE <strong>&#9679</strong> JavaScript <strong>&#9679</strong> CSS',
		programming_background: ["completed 'Fundamentals of Programming' and 'Algorithm and Datastructures' at university + two more CS Uni courses", "completed Harvard's CS50W (Webdevelopment with Python and JavaScript)<br>"],
	},
	design:
	{
		skills: ["proficiency in Figma and Adobe Creative Suite","proficiency in conceptualization (wireframes, mockups and interactive, functional visuals)","deep knowledge of visual and functional design rules and concepts.", "proficiency in DaVinci Resolve"],
	},
	acknowledgements:
	{
		regarding_this_app: "",
		tools: ["Sublime Text", "Adobe Illustrator","Figma"],
		credits: "Background (night sky): Comix Wave Films"
	}
}