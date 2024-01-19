window.addEventListener('load', setup);

function setup() {
	const collapsers = document.getElementsByClassName("collapser");
	Array.prototype.forEach.call(
		collapsers,
		(collapser) => collapser.addEventListener('click', (event) => toggleClosed(event || window.event, collapser)),
	);
}

function toggleClosed(event, element) {
	element.parentNode.classList.toggle("closed");
}
