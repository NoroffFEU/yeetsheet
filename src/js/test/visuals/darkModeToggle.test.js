import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import toggleDarkMode from '../../darkModeToggle/toggleDarkMode.mjs';

describe('toggleDarkMode', () => {
  let darkModeToggleBtn;
  let darkModeToggleText;

  beforeEach(() => {
    document.body.innerHTML = '<button id="darkModeToggleBtn">DRK</button>';
    document.body.innerHTML += '<div class="toggle-text">Dark on</div>';
    darkModeToggleBtn = document.querySelector('#darkModeToggleBtn');
    darkModeToggleText = document.querySelector('.toggle-text');

    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should toggle dark mode on and off', () => {
    toggleDarkMode();

    darkModeToggleBtn.click();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(darkModeToggleText.innerText).toBe('Dark on');
    expect(localStorage.getItem('theme')).toBeNull();

    darkModeToggleBtn.click();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(darkModeToggleText.innerText).toBe('Dark off');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
