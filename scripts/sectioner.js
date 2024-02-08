window.addEventListener('load', setup);

function setup() {
	const sectionsList = document.getElementById('section-list');
	const sections = document.querySelectorAll('h2');
	var index = 0;
	Array.prototype.forEach.call(
		sections,
		(section) => addSection(sectionsList, section, index++),
	);
}

function addSection(sectionsList, element, index) {
	// Add an indexed id the the section element
	const id = `section-${index}`
	element.id = id;

	// Create the section link
	var sectionName = element.getAttribute('short');

	const sectionLink = document.createElement('a');
	sectionLink.classList.add('section-link');
	sectionLink.href = `#${id}`;
	sectionLink.innerText = sectionName;

	// Add it to the DOM
	sectionsList.appendChild(sectionLink);
}
