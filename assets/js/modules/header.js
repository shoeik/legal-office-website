export default function initHeader() {
	const header = document.querySelector(".header");
	if (!header) return;

	let lastScroll = 0;

	window.addEventListener("scroll", () => {
		const current = window.scrollY;

		if (current > lastScroll) {
		header.classList.add("is-hide");
		} else {
		header.classList.remove("is-hide");
		}

		lastScroll = current;
	});
}