export function showMessage(message, type) {
  if (!showMessage.errorMessageDisplayed) {
    showMessage.errorMessageDisplayed = true;

    let borderColor, textShadowColor;
    switch (type) {
      case 'success':
        borderColor = 'border-green-500';
        textShadowColor = 'text-green-700';
        break;
      case 'error':
        borderColor = 'border-red-500';
        textShadowColor = 'text-red-700';
        break;
      case 'warning':
        borderColor = 'border-yellow-500';
        textShadowColor = 'text-yellow-700';
        break;
      default:
        borderColor = 'border-blue-500';
        textShadowColor = 'text-blue-700';
    }

    const modalElement = document.createElement('div');
    modalElement.classList.add(
      'fixed',
      'inset-0',
      'flex',
      'items-center',
      'justify-center',
      'bg-gray-800',
      'bg-opacity-50',
      'z-50',
    );

    const modalDialog = document.createElement('div');
    modalDialog.classList.add(
      'bg-white',
      'rounded-lg',
      'shadow-lg',
      'max-w-lg',
      'w-full',
      'mx-4',
    );

    const modalContent = document.createElement('div');
    modalContent.classList.add(
      'border-4',
      borderColor,
      'p-4',
      'rounded-lg',
      'shadow-lg',
    );

    const modalHeader = document.createElement('div');
    modalHeader.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'pb-2',
      'border-b',
      borderColor,
    );
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('text-lg', 'font-bold', textShadowColor);
    modalTitle.id = 'messageModalLabel';
    modalTitle.textContent = type;

    modalHeader.appendChild(modalTitle);

    const modalBody = document.createElement('div');
    modalBody.classList.add('py-3', textShadowColor);
    modalBody.textContent =
      message instanceof Error ? message.message : message;

    const modalFooter = document.createElement('div');
    modalFooter.classList.add(
      'flex',
      'justify-end',
      'pt-2',
      'border-t',
      borderColor,
    );
    const closeButtonFooter = document.createElement('button');
    closeButtonFooter.classList.add(
      'bg-gray-500',
      'hover:bg-gray-600',
      'text-white',
      'py-1',
      'px-4',
      'rounded',
    );
    closeButtonFooter.textContent = 'Close';
    closeButtonFooter.onclick = () => {
      modalElement.remove();
      showMessage.errorMessageDisplayed = false;
    };

    modalFooter.appendChild(closeButtonFooter);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modalElement.appendChild(modalDialog);

    document.body.appendChild(modalElement);

    setTimeout(() => {
      modalElement.remove();
      showMessage.errorMessageDisplayed = false;
    }, 3000);
  }
}

showMessage.errorMessageDisplayed = false;

// Usage Instructions for showMessage Function:

// To display error, warning, success, or information messages to users, follow the syntax below:
//   message: This parameter should contain the text of the message you want to display to the user.
//It can be a string representing the error, warning, success, or information message.
//   type: Use this parameter to specify the type of message you're displaying. Available types include:
//     "error": Indicates an error message.
//     "warning": Indicates a warning message.
//     "success": Indicates a success message.
//     "info": Indicates an information message.

// Example Usage:
// Simulate a failed login attempt
// const errorMessage = "Incorrect username or password. Please try again.";

// Display error message to the user
// showMessage(errorMessage, "error");

// Ensure you replace "message" with the actual text of your message, and "type" with the appropriate message type as listed above.
