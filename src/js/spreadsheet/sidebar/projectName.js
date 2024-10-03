// JSdocs

/**
 * Adds functionality on the sidebar: Change the name of the project
 *
 * When the user clicks on the project name, it will be replaced with an input field
 *
 * The user can then change the name of the project
 *
 * The user can press enter to save the new name or click outside the input field
 */

export default function projectName() {
  const projectName = document.getElementById('proName');
  const editButton = document.getElementById('proNameEdit');

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
