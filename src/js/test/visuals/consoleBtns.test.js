import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import consoleBtnsActiveState from '../../console/consoleBtns.mjs';

describe('consoleBtnsActiveState', () => {
  let btns;

  beforeEach(() => {
    document.body.innerHTML = `
      <button class="console-btn">Button 1</button>
      <button class="console-btn">Button 2</button>
      <button class="console-btn">Button 3</button>
    `;
    btns = document.querySelectorAll('.console-btn');
    consoleBtnsActiveState();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should toggle active state of console buttons', () => {
    btns.forEach((btn) => {
      expect(btn.classList.contains('active')).toBe(false);
    });

    btns[1].click();
    expect(btns[1].classList.contains('active')).toBe(true);

    btns.forEach((btn, index) => {
      if (index !== 1) {
        expect(btn.classList.contains('active')).toBe(false);
      }
    });

    btns[2].click();
    expect(btns[2].classList.contains('active')).toBe(true);

    btns.forEach((btn, index) => {
      if (index !== 2) {
        expect(btn.classList.contains('active')).toBe(false);
      }
    });
  });
});
