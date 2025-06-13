// Elements Refs
const mainEl = document.querySelector("main")
const navTogglerEl = document.querySelector(".nav .toggle")
const navLinksEl = document.querySelector(".nav .links")
const navLinkEls = document.querySelectorAll(".nav .links .link")
// End of elements refs

const bgImage = new Image()
const BG_IMG_SRC = "./assets/background.jpg"
bgImage.src = BG_IMG_SRC

bgImage.onload = () => {
  mainEl.style.backgroundImage = `url("${BG_IMG_SRC}")`

  const observer = new IntersectionObserver(handleObserver)
  document.querySelectorAll(".transition").forEach(el => observer.observe(el))

  function handleObserver(entries) {
    entries.forEach(entry => {
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

navTogglerEl.addEventListener("click", () => {
  navLinksEl.classList.toggle("open")
  navTogglerEl.classList.toggle("open")
})

navLinkEls.forEach(el =>
  el.addEventListener("click", () => {
    navLinksEl.classList.toggle("open", false)
    navTogglerEl.classList.toggle("open", false)
  })
)
