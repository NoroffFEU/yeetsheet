import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showDropdownMenu } from '../../header/menu.mjs';

vi.mock('../helpers/closeOnOutsideClick.mjs', () => ({
  default: vi.fn(),
}));

describe('showDropdownMenu', () => {
  let menuBtn;
  let menuDropdown;

  beforeEach(() => {
    document.body.innerHTML = `
      <button data-menu="dropdown1">Menu</button>
      <div id="dropdown1" class="hidden">Dropdown Content</div>
    `;
    menuBtn = document.querySelector('[data-menu]');
    menuDropdown = document.querySelector('#dropdown1');
    showDropdownMenu();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should toggle dropdown menu visibility on button click', () => {
    expect(menuDropdown.classList.contains('hidden')).toBe(true);

    menuBtn.click();
    expect(menuDropdown.classList.contains('hidden')).toBe(false);

    menuBtn.click();
    expect(menuDropdown.classList.contains('hidden')).toBe(true);
  });
});
