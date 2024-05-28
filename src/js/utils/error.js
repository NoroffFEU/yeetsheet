export function showError(message, target) {
  const errorContainer = document.querySelector(target);

  const errorMessage = document.createElement('h3');
  errorMessage.classList.add('');
  errorMessage.textContent = `${message}`;

  errorContainer.appendChild(errorMessage);
}
