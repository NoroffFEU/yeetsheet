// Test buttons for showMessage
//remember to delete all this before PR to workflow!
import { showMessage } from './utils/showMessage';

function addTestButtons() {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('flex', 'space-x-4', 'mt-8');
  const messageTypes = ['success', 'error', 'warning', 'info'];
  messageTypes.forEach((type) => {
    const button = document.createElement('button');
    button.textContent = `Show ${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    button.classList.add(
      'bg-blue-500',
      'hover:bg-blue-600',
      'text-white',
      'py-2',
      'px-4',
      'rounded',
    );
    button.onclick = () => {
      showMessage(`This is a ${type} message!`, type);
    };
    buttonContainer.appendChild(button);
  });
  document.body.appendChild(buttonContainer);
}

document.addEventListener('DOMContentLoaded', addTestButtons);

//Simpler test:
//   showMessage("This is a success message!", "success");
//   showMessage("This is a Warning message!", "warning");
//   showMessage("This is a Error message!", "error");
//   showMessage("This is a info message!", "info");
