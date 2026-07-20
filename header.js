// header.js

document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.js-header');
	const burger = document.querySelector('.js-burger');
	const modal = document.querySelector('.js-nav-modal');

	// 固定ヘッダーの透明 → 白背景
	window.addEventListener('scroll', () => {
		if (window.scrollY > 30) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
	});

	// ハンバーガー開閉
	burger.addEventListener('click', () => {
		const isOpen = burger.classList.toggle('is-active');
		modal.classList.toggle('is-open', isOpen);

		burger.setAttribute('aria-expanded', isOpen);
		modal.setAttribute('aria-hidden', !isOpen);
	});




});
