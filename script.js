const header = document.getElementById('header');
const hero = document.querySelector('.hero');

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach(entry => {
		if (entry.isIntersecting) {
			// hero がまだ画面内にある → 上部の状態
			header.classList.remove('js-active');
		} else {
			// hero が画面外 → 「hero を抜けた」タイミング
			header.classList.add('js-active');
		}
		});
	},
	{
		root: null,
		threshold: 0
	}
);

observer.observe(hero);




// const overlay = document.querySelector('.nav-modal__overlay');
const modal = document.querySelector('.nav-modal');
const hamburger = document.querySelector('.header__hamburger'); 

let isOpen = false;

const tl = gsap.timeline({ paused: true });


// hamburger.addEventListener('click', () => {
// 	overlay.classList.toggle('is-active');
// 	nav.classList.toggle('is-active');
// });


tl.to(hamburger, {
	"--span-scale": 0,
	"--before-top": "8px",
	"--after-top": "-8px",
	duration: 0.15,
	ease: "power2.inOut"
},)
.to(hamburger, {
	"--before-rot": "45deg",
	"--after-rot": "-45deg",
	duration: 0.35,
	ease: "power3.out"
},">0.08");


hamburger.addEventListener("click", () => {
	if (isOpen) {
		tl.reverse();
		modal.classList.remove("js-open");
		header.classList.remove("js-open");
	} else {
		tl.play();
		modal.classList.add("js-open");
		header.classList.add("js-open");
	}
	isOpen = !isOpen;
});











/* ============================================
 * DOM取得
 * ============================================ */
const parents = document.querySelectorAll(".header__nav-item--has-children");
const toggles = document.querySelectorAll(".header__nav-toggle");
const overlay = document.querySelector(".overlay");
const mqPc = window.matchMedia("(min-width: 769px)");

/* ----------------------------------------------------
 * 共通：開閉ロジック
 * ---------------------------------------------------- */
function openMenu(item) {
	item.classList.add("is-open");
	item.querySelector(".header__nav-toggle")?.setAttribute("aria-expanded", "true");
	overlay.classList.add("is-active");  // ← overlay を表示
}

function closeMenu(item) {
	item.classList.remove("is-open");
	item.querySelector(".header__nav-toggle")?.setAttribute("aria-expanded", "false");
}

function closeAll() {
	parents.forEach(item => closeMenu(item));
	overlay.classList.remove("is-active"); // overlay を消す
}

function closeAllExcept(current) {
	parents.forEach(item => {
		if (item !== current) closeMenu(item);
	});
}

/* ----------------------------------------------------
 * PC hover 操作
 * ---------------------------------------------------- */
function enablePcMode() {
	parents.forEach(item => {
		let timerEnter = null;
		let timerLeave = null;

		item.addEventListener("mouseenter", () => {
			clearTimeout(timerLeave);
			timerEnter = setTimeout(() => {
				closeAllExcept(item);
				openMenu(item);
			}, 120);
		});

		item.addEventListener("mouseleave", () => {
			clearTimeout(timerEnter);
			timerLeave = setTimeout(() => {
				closeMenu(item);
				overlay.classList.remove("is-active");
			}, 100);
		});
	});

	/* overlay をクリックしたら全閉じする */
	overlay.addEventListener("click", closeAll);
}

/* ----------------------------------------------------
 * SP：modal がメインなので dropdown は使わない
 * ---------------------------------------------------- */
function enableSpMode() {
	/* PC用の overlay は SP では非表示 */
	overlay.classList.remove("is-active");

	/* dropdown は SP では使わないので何もしない */
}

/* ----------------------------------------------------
 * 初期化
 * ---------------------------------------------------- */
if (mqPc.matches) {
	enablePcMode();
} else {
	enableSpMode();
}

/* ----------------------------------------------------
 * responsive
 * ---------------------------------------------------- */
mqPc.addEventListener("change", e => {
	closeAll();
	if (e.matches) enablePcMode();
	else enableSpMode();
});


// // main.js
// import initHeader from "./modules/header.js";
// import initNav from "./modules/nav.js";
// import initCursor from "./modules/cursor.js";
// import initAccordion from "./modules/accordion.js";
// import initScrollEffect from "./modules/scrollEffect.js";

// // DOM構築が終わってから実行（安心安全）
// document.addEventListener("DOMContentLoaded", () => {
// 	initHeader();
// 	initNav();
// 	initCursor();
// 	initAccordion();
// 	initScrollEffect();
// });






// // strength
// ScrollTrigger.matchMedia({
// 	"(min-width: 769px)": function () {

// 		// PC画像の img 全取得
// 		const images = document.querySelectorAll(".strength__image-list .strength__image");

// 		// アクティブ切替関数
// 		const activateImage = (num) => {
// 			images.forEach(img => {
// 				img.classList.toggle("strength__image--active", img.dataset.strength == num);
// 			});
// 		};

// 		// Strength 02 に入ったら画像2へ
// 		ScrollTrigger.create({
// 			trigger: ".js-strength-main-02",
// 			start: "top center",
// 			end: "bottom center",
// 			onEnter: () => activateImage(2),
// 			onEnterBack: () => activateImage(2),
// 		});

// 		// Strength 03 に入ったら画像3へ
// 		ScrollTrigger.create({
// 			trigger: ".js-strength-main-03",
// 			start: "top center",
// 			end: "bottom center",
// 			onEnter: () => activateImage(3),
// 			onEnterBack: () => activateImage(3),
// 		});

// 		// 戻って Strength 01 に入ったら画像1へ
// 		ScrollTrigger.create({
// 			trigger: ".js-strength-main-01",
// 			start: "top center",
// 			end: "bottom center",
// 			onEnter: () => activateImage(1),
// 			onEnterBack: () => activateImage(1),
// 		});

// 		// 初期表示
// 		activateImage(1);
// 	}
// });





	// gsap.registerPlugin(ScrollTrigger);

	// document.querySelectorAll(".strength-item").forEach((item) => {
	// 	// const inner = item.querySelector(".inner");

	// 	gsap.fromTo(
	// 		item,
	// 		{ width: "103%" },
	// 		{
	// 			width: "100%",
	// 			ease: "none",
	// 			scrollTrigger: {
	// 				trigger: item,
	// 				start: "top 70%",
	// 				end: "top 30%",
	// 				scrub: true
	// 			}
	// 		}
	// 	);
	// });



gsap.registerPlugin(ScrollTrigger);

// サイドナビ固定
// ScrollTrigger.create({
// 	trigger: ".service",
// 	start: "top top",
// 	end: "bottom bottom",
// 	pin: ".side-nav",
// 	pinSpacing: false,
// });

// 各セクションのハイライト切替
// const sections = gsap.utils.toArray(".section");
// const navItems = gsap.utils.toArray(".side-nav__item");

// sections.forEach((sec, i) => {
// 	ScrollTrigger.create({
// 		trigger: sec,
// 		start: "top center",
// 		// end: "bottom center",
// 		onEnter: () => activate(i),
// 		onEnterBack: () => activate(i),
// 	});
// });

// function activate(index) {
// 	navItems.forEach((item, i) => {
// 		item.classList.toggle("is-active", i === index);
		
// 	});
// }




const item1 = document.querySelector('.service__nav-item:nth-child(1)');
const item2 = document.querySelector('.service__nav-item:nth-child(2)');
const item3 = document.querySelector('.service__nav-item:nth-child(3)');
const item4 = document.querySelector('.service__nav-item:nth-child(4)');
const item5 = document.querySelector('.service__nav-item:nth-child(5)');
const item6 = document.querySelector('.service__nav-item:nth-child(6)');


function activate(el) {
	document.querySelectorAll('.service__nav-item').forEach(i => i.classList.remove('is-active'));
	el.classList.add('is-active');
	// console.log(el);
}

ScrollTrigger.create({
	trigger: "#sec1",
	start: "top center",
	onEnter: () => activate(item1),
	onEnterBack: () => activate(item1),
});

ScrollTrigger.create({
	trigger: "#sec2",
	start: "top center",
	onEnter: () => activate(item2),
	onEnterBack: () => activate(item2),
});

ScrollTrigger.create({
	trigger: "#sec3",
	start: "top center",
	onEnter: () => activate(item3),
	onEnterBack: () => activate(item3),
});

ScrollTrigger.create({
	trigger: "#sec4",
	start: "top center",
	onEnter: () => activate(item4),
	onEnterBack: () => activate(item4),
});


ScrollTrigger.create({
	trigger: "#sec5",
	start: "top center",
	onEnter: () => activate(item5),
	onEnterBack: () => activate(item5),
});

ScrollTrigger.create({
	trigger: "#sec6",
	start: "top center",
	onEnter: () => activate(item6),
	onEnterBack: () => activate(item6),
});







// const io = new IntersectionObserver((entries, observer) => {
// 	entries.forEach(e => {
// 		if (e.isIntersecting) {
// 			e.target.classList.add('is-visible');
// 			observer.unobserve(e.target); // 一度表示したら監視を外す
// 		}
// 	});
// }, {
// 	root: null,
// 	rootMargin: '0px 0px -40% 0px',
// 	threshold: 0
// });
	
// // document.querySelectorAll('.js-observe').forEach(t => io.observe(t));
// document.querySelectorAll('.reveal, .reveal-item').forEach(t=>{
// 	io.observe(t);
// });


const io = new IntersectionObserver((entries, observer) => {
	entries.forEach(e => {
		if (e.isIntersecting) {

			const el = e.target;

			// -----------------------------
			// ★ クラスに応じて処理を分岐
			// -----------------------------
			if (el.classList.contains("reveal--image")) {
				// 画像はそのまま一括アニメーション
				el.classList.add("is-visible");
			}

			else if (el.classList.contains("reveal--text")) {
				// テキストは 1 文字ずつアニメーション
				el.classList.add("is-visible");
				splitTextAndAnimate(el);
			}

			// 一度だけ実行
			observer.unobserve(el);
		}
	});
}, {
	root: null,
	rootMargin: '0px 0px -20% 0px',
	threshold: 0
});

// 監視開始（両方を対象に）
document.querySelectorAll('.reveal--image, .reveal--text').forEach(t => io.observe(t));


// ==========================
//  テキスト分割 & アニメーション
// ==========================
function splitTextAndAnimate(element){

	// すでに分割済みならスキップ
	if(element.dataset.split === "true") return;

	const text = element.innerText;
	const chars = text.split("");

	const wrapped = chars.map(char => `<span class="ttl">${char}</span>`).join("");
	element.innerHTML = wrapped;

	element.dataset.split = "true";

	const items = element.querySelectorAll("span.ttl");

	items.forEach((item, i) => {
		setTimeout(() => {
			item.classList.add("is-visible");
		}, i * 20);
	});
}









const wrap = document.querySelector('.button-wrap');
const el = wrap.querySelector('.icon-button-contact');
const strength = 0.4;

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;


wrap.addEventListener('mousemove', (e) => {
	const rect = wrap.getBoundingClientRect();
	const relX = e.clientX - (rect.left + rect.width / 2);
	const relY = e.clientY - (rect.top + rect.height / 2);

	gsap.to(el, {
		x: relX * strength,
		y: relY * strength,
		// boxShadow: `${relX * 0.05}px ${relY * 0.05}px 25px rgba(37, 99, 235, 0.25)`,
		duration: 0.35,
		ease: "power3.out"
	});
});

wrap.addEventListener('mouseleave', () => {
	gsap.to(el, {
		x: 0,
		y: 0,
		// boxShadow: `0 0 25px rgba(37, 99, 235, 0.25)`,
		duration: 0.45,
		ease: "power3.out"
	});
});











const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const hero = document.querySelector(".hero");




// ==============================
// 設定
// ==============================
// const COUNT = 120;
const COUNT = window.innerWidth < 768 ? 40 : 120;
const RADIUS = 2;
const LINE_DISTANCE = 120;
const LINE_DISTANCE_SQ = LINE_DISTANCE * LINE_DISTANCE;
const MAX_CONNECTIONS = 2; // ★ 1点につき最大2本



// ==============================
// 状態
// ==============================
const points = [];

for (let i = 0; i < COUNT; i++) {
	points.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		vx: (Math.random() - 0.5) * .5,
		vy: (Math.random() - 0.5) * .3,
		r: RADIUS,
	});
}

// ==============================
// ループ
// ==============================
function loop() {
	// --------------------------
	// 移動
	// --------------------------
	for (const p of points) {
		p.x += p.vx;
		p.y += p.vy;

		if (p.x < p.r || p.x > canvas.width - p.r) p.vx *= -1;
		if (p.y < p.r || p.y > canvas.height - p.r) p.vy *= -1;
	}

	// --------------------------
	// 画面クリア
	// --------------------------
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// --------------------------
	// 接続関係を作る
	// --------------------------
	const connected = Array.from({ length: points.length }, () => []);

	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			const a = points[i];
			const b = points[j];

			const dx = a.x - b.x;
			const dy = a.y - b.y;
			const distSq = dx * dx + dy * dy;

			// 衝突
			const minDist = a.r + b.r;
			if (distSq < minDist * minDist) {
				const tx = a.vx;
				const ty = a.vy;
				a.vx = b.vx;
				a.vy = b.vy;
				b.vx = tx;
				b.vy = ty;
			}

			// 線が引ける距離なら接続として記録
			if (distSq < LINE_DISTANCE_SQ) {
				connected[i].push(j);
				connected[j].push(i);
			}
		}
	}

	// --------------------------
	// 三角形を塗る（先に）
	// --------------------------
	// ctx.fillStyle = "rgba(255,255,255,0.04)";
	ctx.fillStyle = "rgba(46, 163, 153, 0.3)";

	

	for (let i = 0; i < connected.length; i++) {
		for (const j of connected[i]) {
			if (j <= i) continue;

			for (const k of connected[j]) {
				if (k <= j) continue;

				// i - j - k - i がすべて繋がっている？
				if (connected[k].includes(i)) {
					const a = points[i];
					const b = points[j];
					const c = points[k];

					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.lineTo(c.x, c.y);
					ctx.closePath();
					ctx.fill();
				}
			}
		}
	}

	// --------------------------
	// 線を描く
	// --------------------------
	for (let i = 0; i < connected.length; i++) {
		for (const j of connected[i]) {
			if (j <= i) continue;

			const a = points[i];
			const b = points[j];

			const dx = a.x - b.x;
			const dy = a.y - b.y;
			const distSq = dx * dx + dy * dy;
			const alpha = 1 - distSq / LINE_DISTANCE_SQ;

			ctx.strokeStyle = `rgba(46, 163, 153, ${alpha})`;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(b.x, b.y);
			ctx.stroke();
		}
	}

	// --------------------------
	// 点を描く
	// --------------------------
	ctx.fillStyle = "rgba(46, 163, 153, 0.8)";
	for (const p of points) {
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
		ctx.fill();
	}

	requestAnimationFrame(loop);
}

loop();




function resize() {
  

  const oldW = canvas.width;
  const oldH = canvas.height;

	canvas.width = hero.clientWidth;
  canvas.height = hero.clientHeight;

  const sx = canvas.width  / oldW;
  const sy = canvas.height / oldH;

  // 位置を比率で補正
  for (const p of points) {
    p.x *= sx;
    p.y *= sy;
  }
}

window.addEventListener("resize", resize);
resize();
