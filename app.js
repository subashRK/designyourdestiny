// Elements Refs
const mainEl = document.querySelector("main")
const navTogglerEl = document.querySelector(".nav .toggle")
const navEl = document.querySelector(".nav")
const navLinkEls = document.querySelectorAll(".nav .links .link")
const cardsEl = document.querySelector("#testimonials .cards")
const activeCardEl = document.querySelector("#testimonials .cards .card.active")
const moverEls = document.querySelectorAll(
	"#testimonials .cards-container .mover"
)
// End of elements refs

const bgImage = new Image()
const BG_IMG_SRC = "./assets/background.jpg"
bgImage.src = BG_IMG_SRC

bgImage.onload = () => {
	mainEl.style.backgroundImage = `url("${BG_IMG_SRC}")`

	const observer = new IntersectionObserver(handleObserver)
	document.querySelectorAll(".transition").forEach((el) => observer.observe(el))

	function handleObserver(entries) {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return
			entry.target.classList.toggle("intersecting", true)
			observer.unobserve(entry.target)
		})
	}
}

setTimeout(
	() =>
		setInterval(() => {
			const activeP_El = document.querySelector(
				"main .content .text .questions p.visible"
			)
			let nextP_el

			if (activeP_El.nextElementSibling == null)
				nextP_el = document.querySelector(
					"main .content .text .questions p:first-child"
				)
			else nextP_el = activeP_El.nextElementSibling

			activeP_El.classList.toggle("visible", false)
			nextP_el.classList.toggle("visible", true)
		}, 3000),
	1000
)

navTogglerEl.addEventListener("click", () => navEl.classList.toggle("open"))

navLinkEls.forEach((el) =>
	el.addEventListener("click", () => navEl.classList.toggle("open"))
)

cardsEl.scrollBy({
	behavior: "smooth",
	left:
		cardsEl.firstElementChild.clientWidth * parseInt(activeCardEl.dataset["i"]),
})

function handleMoverClick({ currentTarget }) {
	const disabledButton = document.querySelector(
		"#testimonials .cards-container .mover:disabled"
	)
	if (disabledButton) disabledButton.disabled = false
	let shouldDisable = false

	const dir =
		currentTarget.dataset.dir === "right"
			? cardsEl.firstElementChild.clientWidth
			: -cardsEl.firstElementChild.clientWidth
	cardsEl.scrollBy({ left: dir })

	const activeCardEl = document.querySelector(
		"#testimonials .cards .card.active"
	)
	activeCardEl.classList.toggle("active", false)

	if (dir > 0) {
		activeCardEl.nextElementSibling.classList.toggle("active", true)
		if (activeCardEl.nextElementSibling.nextElementSibling == null)
			shouldDisable = true
	} else {
		activeCardEl.previousElementSibling.classList.toggle("active", true)
		if (activeCardEl.previousElementSibling.previousElementSibling == null)
			shouldDisable = true
	}

	currentTarget.disabled = shouldDisable
}

moverEls.forEach((el) => el.addEventListener("click", handleMoverClick))
