//TODO make it so splash size is calculated from string length
const randomSplash = false;
const splashSizes = [2, 2, 2, 1.7, 2, 1.8, 0.8, 1.2, 1, 1.4, 1.9];
const splashes = [
"HACKERS",
"Uses HTML!",
"Uses CSS!",
"Random splash!",
"Indev!",
"Decompiling...",
"Uncaught exception in thread \"Minecraft main thread\"",
"RetroMCP-Python is cringe!",
"Welcome to the Los Pollos hermanos family",
"Try to center a &lt;div&gt;",
"<span class=\"darkblue\">C</span><span class=\"darkgreen\">o</span><span class=\"darkaqua\">l</span><span class=\"darkred\">o</span><span class=\"darkpurple\">r</span><span class=\"gold\">m</span><span class=\"gray\">a</span><span class=\"darkgray\">t</span><span class=\"blue\">i</span><span class=\"green\">c</span>"
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function splash() {
	const splash = document.getElementById("randomsplash");
	var index = 0;
	if(randomSplash) {
		index = getRandomInt(splashes.length);
	}
	splash.innerHTML = splashes[index];
	splash.style.cssText = "--scale:" + splashSizes[index];
}