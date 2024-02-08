window.addEventListener('load', setup);

function setup() {
	const imagePanes = document.querySelectorAll('.image-pane');
	Array.prototype.forEach.call(
		imagePanes,
		(imagePane) => {
			addImagePane(imagePane);
		},
	);
}

const scrollAmount = 120 * 2;

const addImagePane = function(imagePane) {
	const imagePaneScroll = imagePane.querySelector('.image-pane-scroll');

	// Generate the next and prev buttons
	const next = document.createElement('a');
	next.classList.add('next');
	next.innerText = '❯';
	const prev = document.createElement('a');
	prev.classList.add('prev');
	prev.innerText = '❮';

	imagePane.appendChild(next);
	imagePane.appendChild(prev);

	next.addEventListener('click', () => { scrollImagePane(imagePaneScroll, +1); });
	prev.addEventListener('click', () => { scrollImagePane(imagePaneScroll, -1); });

	imagePaneScroll.addEventListener('scroll', () => {
		handleLimits(imagePaneScroll, next, prev);
	});
	handleLimits(imagePaneScroll, next, prev);
}

const scrollImagePane = function(imagePaneScroll, direction) {
	imagePaneScroll.scrollLeft += scrollAmount * direction;
}

const handleLimits = function(imagePaneScroll, next, prev) {
	var scrollLeftMax = imagePaneScroll.scrollLeftMax || imagePaneScroll.scrollWidth - imagePaneScroll.clientWidth;
	var isNextHidden = scrollLeftMax <= imagePaneScroll.scrollLeft;
	var isPrevHidden = imagePaneScroll.scrollLeft <= 0;
	next.classList.toggle('hidden', isNextHidden);
	prev.classList.toggle('hidden', isPrevHidden);
}

