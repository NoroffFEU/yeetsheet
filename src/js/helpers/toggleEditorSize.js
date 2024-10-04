export function toggleEditorSize() {
  const toggleEditor = document.getElementById('toggle-editor');

  // Add an event listener for when any of its children are focused
  toggleEditor.addEventListener('focusin', () => {
    toggleClasses();
  });

  // Add an event listener for when any of its children lose focus
  toggleEditor.addEventListener('focusout', () => {
    toggleClasses();
  });
}

// Function to toggle the height classes
function toggleClasses() {
  const toggleEditor = document.getElementById('toggle-editor');
  const codeWrapper = document.getElementById('code-wrapper');

  // Toggle between h-48 and h-96 for the parent
  if (toggleEditor.classList.contains('h-48')) {
    toggleEditor.classList.replace('h-48', 'h-96');
    setTimeout(() => {
      toggleEditor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
  } else if (toggleEditor.classList.contains('h-96')) {
    toggleEditor.classList.replace('h-96', 'h-48');
  }

  // Toggle between h-14 and h-72 for the child
  if (codeWrapper.classList.contains('h-14')) {
    codeWrapper.classList.replace('h-14', 'h-72');
  } else if (codeWrapper.classList.contains('h-72')) {
    codeWrapper.classList.replace('h-72', 'h-14');
  }
}
