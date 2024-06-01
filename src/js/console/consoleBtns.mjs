export default function consoleBtnsActiveState() {
  const btns = document.querySelectorAll(".console-btn");
  if (btns) {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.remove("active");
          e.target.classList.add("active");
        }
      })
    })
  }
}