// JSdocs

/**
 * Adds functionality to change the project name in the sidebar and update it in the associated sheet header. The project name is also temporarily stored in localStorage for persistence across page reloads.
 *
 * Features:
 * - On page load, it checks if a project name is stored in localStorage under the 'yeetsheet' key and sets the project name and sheet header accordingly.
 * - When the user clicks the edit button, the current project name is replaced with an input field to allow renaming.
 * - The user can press Enter or click outside the input field to save the new name.
 * - Updates the project name in both the sidebar and sheet header.
 * - Saves the new project name in localStorage under the 'yeetsheet' key.
 * - Ensures a maximum input length of 20 characters.
 *
 */

export default function projectName() {
  const projectName = document.getElementById('proName');
  const sheetHeader = document.getElementById('proNameSheet');
  const editButton = document.getElementById('proNameEdit');

  // load name from localStorage if there is one
  window.onload = () => {
    const storedProjectName =
      JSON.parse(localStorage.getItem('yeetsheet')) || {};

    if (storedProjectName.projectName) {
      projectName.innerText = storedProjectName.projectName;
      sheetHeader.innerText = storedProjectName.projectName;
    }
  };

  editButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.classList.add(
      'bg-[#17152C]',
      'outline-0',
      'py-1',
      'min-w-52',
      'flex',
      'px-2',
      'uppercase',
      'rounded',
    );
    input.type = 'text';
    input.value = projectName.innerText;

    const confirmIcon = document.createElement('i');
    confirmIcon.classList.add('fas', 'fa-check', 'cursor-pointer', 'ml-2');
    editButton.replaceWith(confirmIcon);

    input.addEventListener('keydown', (e) => {
      if (
        input.value.length >= 20 &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete'
      ) {
        e.preventDefault();
      }
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.value = projectName.innerText;
      } else {
        projectName.innerText = input.value;
        sheetHeader.innerText = input.value;

        // Temporary store to localStorage
        const projectString =
          JSON.parse(localStorage.getItem('yeetsheet')) || {};
        projectString.projectName = input.value;

        const newProjectString = JSON.stringify(projectString);
        localStorage.setItem('yeetsheet', newProjectString);

        //    Need to store the name of the project in the database from here
      }
      confirmIcon.replaceWith(editButton);

      input.replaceWith(projectName);
    });

    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      }
    });

    confirmIcon.addEventListener('click', () => {
      input.blur();
    });

    projectName.replaceWith(input);
    input.focus();
  });
}
