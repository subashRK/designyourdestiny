// Elements Refs
const mainEl = document.querySelector("main")
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
