export function toggleSidebar() {
  const toggleButton = document.getElementById('toggleSidebarBtn');
  const sidebarContent = document.getElementById('sidebarContent');
  const sidePanel = document.getElementById('sidePanel');
  const sidebarIcons = document.getElementById('sidebarIcons');

  if (toggleButton && sidebarContent && sidePanel && sidebarIcons) {
    toggleButton.addEventListener('click', () => {
      sidebarContent.classList.toggle('hidden');
      sidePanel.classList.toggle('sidebar-narrow');
      sidebarIcons.classList.toggle('hidden');
    });
  }
}

// Call the function to set up the event listener
document.addEventListener('DOMContentLoaded', () => {
  toggleSidebar();
});
