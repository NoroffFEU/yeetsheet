/**
 * @description Toggles the visibility of the sidebar and the sidebar icons, and adjusts the sidebar width.
 * If any element is missing, it logs an error message.
 */

export function toggleSidebar() {
  const toggleButton = document.getElementById('toggleSidebarBtn');
  const sidebarContent = document.getElementById('sidebarContent');
  const sidePanel = document.getElementById('sidePanel');
  const sidebarIcons = document.getElementById('sidebarIcons');

  if (!toggleButton || !sidebarContent || !sidePanel || !sidebarIcons) {
    const missingElements = [
      !toggleButton && 'toggleSidebarBtn',
      !sidebarContent && 'sidebarContent',
      !sidePanel && 'sidePanel',
      !sidebarIcons && 'sidebarIcons',
    ]
      .filter(Boolean)
      .join(', ');

    console.error(`toggleSidebar: ${missingElements} not found`);
    return;
  }
  toggleButton.addEventListener('click', () => {
    sidebarContent.classList.toggle('hidden');
    sidePanel.classList.toggle('sidebar-narrow');
    sidebarIcons.classList.toggle('hidden');
  });
}
