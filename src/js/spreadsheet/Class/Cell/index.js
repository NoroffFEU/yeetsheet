/**
 * Represents a single cell from a spreadsheet.
 * @class
 */

let functionString = `function test() {
    // add code here
    return ""
    }`;

export default class Cell {
  /**
   * Creates a new Cell instance.
   * @constructor
   * @param {Object} [data={}] - The data object containing cell properties.
   * @param {string} [data.id=null] - The unique identifier of the cell.
   * @param {string} [data.value=''] - The value of the cell.
   * @param {string} [data.type=null] - The type of the cell value.
   * @param {Array} [data.dependencies=[]] - The list of cell dependencies.
   * @param {Array} [data.dependents=[]] - The list of cells dependent on this cell.
   */
  constructor(data) {
    this.id = data?.id || null;
    this.parent = data?.parent || null;
    this._value = data?.value || '';
    this.type = data?.type || null;
    this.dependencies = data?.dependencies || [];
    this.dependents = data?.dependents || [];
    this.code = data?.code || functionString;
    this.callInput = data?.callInput || 'test()';
    this.row = data.row;
    this.col = data.col;
  }

  set value(value) {
    // whenever you set a value, will update the type and the value
    // It will also update the cell's textContent (the value displayed in the cell)
    if (value === this._value) return;
    if (Number(value)) {
      this.type = typeof Number(value);
    } else {
      this.type = typeof value;
    }
    console.log(Number(value));
    this._value = value;

    console.log(this);

    // if there is a parent container, update the cell's textContent
    this.parent.display &&
      (this.parent.display.querySelector(`#${this.id}`).textContent = value);
  }

  get value() {
    if (this.type == 'number') {
      return Number(this._value);
    }
    return this._value;
  }
}
