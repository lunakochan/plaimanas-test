document.addEventListener('DOMContentLoaded', function () {
	// Marquee (duplicate content)
	const track = document.querySelector('.marquee-track');
	if (track) {
		track.innerHTML += track.innerHTML;
	}

	// Tabs
	const tabs = document.querySelectorAll('.tab-btn');
	const contents = document.querySelectorAll('.tab-content');

	if (tabs.length && contents.length) {
		tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				tabs.forEach(t => t.classList.remove('active'));
				contents.forEach(c => c.classList.remove('active'));

				tab.classList.add('active');

				const target = document.querySelector('[data-content="' + tab.dataset.tab + '"]');
				if (target) {
					target.classList.add('active');
				}
			});
		});
	}

	// Accordion
	document.querySelectorAll('.acc-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const item = btn.closest('.acc-item');
			const parent = item ? item.parentElement : null;

			if (!item || !parent) return;

			parent.querySelectorAll('.acc-item').forEach(i => {
				if (i !== item) i.classList.remove('open');
			});

			item.classList.toggle('open');
		});
	});

	// Form floating label (have-active-value)
	const fields = document.querySelectorAll('.form-field');

	fields.forEach(function (field) {
		const input = field.querySelector('input, select, textarea');
		const label = field.querySelector('label');

		if (!input || !label) return;

		function checkValue() {
			if (String(input.value || '').trim() !== '') {
				label.classList.add('have-active-value');
			} else {
				label.classList.remove('have-active-value');
			}
		}

		checkValue();

		input.addEventListener('focus', function () {
			label.classList.add('have-active-value');
		});

		input.addEventListener('input', checkValue);
		input.addEventListener('blur', checkValue);
	});

	// Main heading fixed on scroll
	const heading = document.querySelector('.main-heading');
	if (heading) {
		window.addEventListener('scroll', function () {
			heading.classList.toggle('is-fixed', window.scrollY > 5);
		});
	}

	// Desktop overlay submenu (hover)
	const links = document.querySelectorAll('.menu-item .has-submenu');
	links.forEach(link => {
		const targetId = link.dataset.submenu;
		const overlay = targetId ? document.getElementById(targetId) : null;
		if (!overlay) return;

		const list = overlay.querySelector('.box-overlay');
		if (!list) return;

		link.addEventListener('mouseenter', () => {
			overlay.classList.add('active');
		});

		list.addEventListener('mouseleave', () => {
			overlay.classList.remove('active');
		});
	});

	// Mobile menu toggle
	const toggleBtn = document.querySelector('.btn-menu-mobile-toggle');
	const overlayMenuMobile = document.querySelector('.overlay-menu-mobile');

	if (toggleBtn && overlayMenuMobile) {
		const icons = toggleBtn.querySelectorAll('.icon-toggle');

		toggleBtn.addEventListener('click', function () {
			icons.forEach(icon => icon.classList.toggle('active'));
			overlayMenuMobile.classList.toggle('active');
		});
	}

	// Sticky header class
	const header = document.querySelector('.site-header');
	if (header) {
		window.addEventListener('scroll', function () {
			header.classList.toggle('active', window.scrollY > 0);
		});
	}

	// GSAP ScrollTrigger overlay titles
	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);

		const items = document.querySelectorAll('.js-overlay');
		items.forEach((box) => {
			const title = box.querySelector('.title-overlay');
			if (!title) return;

			const gap = Number(box.dataset.gap || 60);
			const startOffset = Number(box.dataset.start || 200);

			const getStopY = () => {
				const boxRect = box.getBoundingClientRect();
				const titleRect = title.getBoundingClientRect();

				const currentBottom = titleRect.bottom;
				const targetBottom = boxRect.bottom - gap;

				return Math.max(0, targetBottom - currentBottom);
			};

			gsap.set(title, { y: 0 });

			const tween = gsap.to(title, {
				y: () => getStopY(),
				ease: 'none',
				overwrite: 'auto',
				paused: true
			});

			ScrollTrigger.create({
				trigger: box,
				start: `top+=${startOffset} top`,
				end: () => `+=${Math.max(1, getStopY())}`,
				scrub: true,
				invalidateOnRefresh: true,
				animation: tween
			});
		});

		window.addEventListener('load', () => {
			ScrollTrigger.refresh();
		});

		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(() => ScrollTrigger.refresh());
		}
	}

	// Currency dropdown toggle (mobile only)
	const currencyItem = document.querySelector('.item-currency');
	const currencyLink = document.querySelector('.item-currency > .currency-link');

	if (currencyItem && currencyLink) {
		currencyLink.addEventListener('click', function (e) {
			if (window.innerWidth <= 991) {
				e.preventDefault();
				currencyItem.classList.toggle('active');
			}
		});
	}

	// Mobile submenu toggle (only inside mobile menu)
	const submenuTriggers = document.querySelectorAll('.main-menu-mobile .has-submenu');
	submenuTriggers.forEach(trigger => {
		trigger.addEventListener('click', function (e) {
			// กัน a href="#" เด้งบน
			e.preventDefault();

			const parentItem = this.closest('.menu-mobile-item');
			if (!parentItem) return;

			const submenu = parentItem.querySelector('.sub-menu-mobile-list');
			if (!submenu) return;

			submenu.classList.toggle('active');
			this.classList.toggle('active');
		});
	});
});