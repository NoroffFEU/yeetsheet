export default function closeOnOutsideClick(ele) {
  const clickOutside = document.addEventListener('click', (e) => {
    if (ele.contains(e.target)) return;
    ele.classList.add('hidden');
    document.removeEventListener('click', clickOutside)
  })
}