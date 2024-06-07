/**
 * Toggles the visibility of the sidebar and the sidebar icons, and adjusts the sidebar width.
 * Adds an event listener to the toggle button to handle the toggle action.
 */
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
/**
 * Sets up the event listener for the sidebar toggle button when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  toggleSidebar();
});
