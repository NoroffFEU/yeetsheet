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

  // Toggle between sm:h-48 and sm:h-96 for the parent
  if (toggleEditor.classList.contains('sm:h-48')) {
    toggleEditor.classList.replace('sm:h-48', 'sm:h-96');
    setTimeout(() => {
      toggleEditor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
  } else if (toggleEditor.classList.contains('sm:h-96')) {
    toggleEditor.classList.replace('sm:h-96', 'sm:h-48');
  }

  // Toggle between sm:h-14 and sm:h-72 for the child
  if (codeWrapper.classList.contains('sm:h-14')) {
    codeWrapper.classList.replace('sm:h-14', 'sm:h-72');
  } else if (codeWrapper.classList.contains('sm:h-72')) {
    codeWrapper.classList.replace('sm:h-72', 'sm:h-14');
  }
}
