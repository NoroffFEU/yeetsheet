import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import toggleDarkMode from '../darkModeToggle/toggleDarkMode.mjs';

describe('toggleDarkMode', () => {
  let darkModeToggleBtn;

  beforeEach(() => {
    document.body.innerHTML = '<button id="darkModeToggleBtn">DRK</button>';
    darkModeToggleBtn = document.querySelector('#darkModeToggleBtn');

    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should toggle dark mode on and off', () => {
    toggleDarkMode();

    darkModeToggleBtn.click();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(darkModeToggleBtn.innerText).toBe('LHT');
    expect(localStorage.getItem('theme')).toBeNull();

    darkModeToggleBtn.click();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(darkModeToggleBtn.innerText).toBe('DRK');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
