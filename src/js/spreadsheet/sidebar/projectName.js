// projectName.js

import { getCurrentFileName, updateFileName, getCurrentFileId } from '../db.js';

export function updateProjectName() {
  const proNameElement = document.getElementById('proName');
  const editButton = document.getElementById('proNameEdit');

  if (proNameElement) {
    getCurrentFileName().then((fileName) => {
      if (fileName) {
        proNameElement.textContent = fileName;
      } else {
        proNameElement.textContent = 'Untitled';
      }
    });
  }

  if (editButton) {
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

      // Set the current file name in the input
      getCurrentFileName().then((fileName) => {
        input.value = fileName || 'Untitled';
      });

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
          input.value = proNameElement.textContent;
        } else {
          proNameElement.textContent = input.value;

          // Update the file name in the database
          const fileId = getCurrentFileId();
          updateFileName(fileId, input.value)
            .then(() => {
              console.log('File name updated successfully.');
            })
            .catch((error) => {
              console.error('Error updating file name:', error);
            });
        }
        confirmIcon.replaceWith(editButton);
        input.replaceWith(proNameElement);
      });

      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          input.blur();
        }
      });

      confirmIcon.addEventListener('click', () => {
        input.blur();
      });

      proNameElement.replaceWith(input);
      input.focus();
    });
  }
}
