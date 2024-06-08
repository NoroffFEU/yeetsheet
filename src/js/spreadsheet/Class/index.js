import spreadsheet from '../';
import addRow from './helpers/addRow';
import addCol from './helpers/addCol';
import createCells from './helpers/createCells';
import { updateSelect } from './helpers/updateSelect';
import { saveToDB /*deleteFromDB*/ } from '../db';

const addColBtn = document.querySelector('#add-col-btn');
const addRowBtn = document.querySelector('#add-row-btn');
const saveBtn = document.querySelector('#save-changes-btn');

/**
 * Represents a full spreadsheet.
 * This class is responsible for creating the spreadsheet and its cells (and keep updating them).
 * The class will be responsible all updates to the spreadsheet.
 * Any changes to the spreadsheet should be done through this class.
 *
 */
export default class Spreadsheet {
  /**
   * Creates a new instance of the Spreadsheet class.
   * @param {Object} data - The initial data for the spreadsheet.
   * @param {Object} listeners - The event listeners for the spreadsheet.
   */
  constructor(data = {}) {
    // display will be the HTML element that will be appended to the DOM after displaySheet is called
    this.display = false;
    this.title = data.title ? data.title : 'Untitled Spreadsheet';
    this.rows = data.rows ? data.rows : 40;
    this.cols = data.cols ? data.cols : 26;

    this._selectedCell = null;
    this.recentlySelected = [];
    // to find a specific cell, you can use this.allCells[row][col]
    console.log(this.allCells);

    this.allCells = createCells(
      this.rows,
      this.cols,
      data.allCells ? data.allCells : [],
      this,
    );

    // adds eventlisteners to the addCol and addRow buttons (if they exist)
    addColBtn && addColBtn.addEventListener('click', () => this.addCol());
    addRowBtn && addRowBtn.addEventListener('click', () => this.addRow());
    // btn to save sheet
    saveBtn && saveBtn.addEventListener('click', () => this.save());
  }

  displaySheet(container) {
    const sheet = spreadsheet(this.cols, this.rows, this);
    this.display = sheet;
    if (container) {
      container.appendChild(sheet);
    }
    return sheet;
  }

  async save() {
    const data = {
      title: this.title,
      rows: this.rows,
      cols: this.cols,
      allCells: this.allCells.map((row) =>
        row.map((cell) => ({
          id: cell.id,
          row: cell.row,
          col: cell.col,
          code: cell.code,
          value: cell._value,

          callInput: cell.callInput,
          type: cell.type,
        })),
      ),
    };

    try {
      await saveToDB('spreadsheetData', data);
      console.log('Spreadsheet saved successfully');
    } catch (error) {
      console.error('Failed to save spreadsheet:', error);
    }
  }

  addRow() {
    // creates and display a new cell row
    this.allCells.push(addRow(this.cols, this.rows));
    this.rows++;
  }
  addCol() {
    // creates and display a new column
    console.log(this.rows, this.cols);
    this.allCells = addCol(this.rows, this.cols, this.allCells);
    this.cols++;
  }
  set sellect(id) {
    // selects a cell and updates
    this.selectedCell = updateSelect(id, this);
  }

  get sellect() {
    return this.selectedCell;
  }

  runCode(code, callInput) {
    if (!this.selectedCell) return console.error('No cell selected');
    if (!code) return console.error('No code provided');
    if (callInput === '') return console.error('No call input provided');

    this.selectedCell.callInput = callInput;
    this.selectedCell.code = code;

    try {
      const grid = this.allCells;
      if (!grid) return console.error('No grid found');
      const exeCode = eval(`${code} ${callInput}`);
      console.log(exeCode);
      console.log(this.selectedCell);
      exeCode && (this.selectedCell.value = exeCode);
      // this.save();
    } catch (error) {
      console.error('Error executing code: ', error);
    }
  }
}
// deleteFromDB('spreadsheetData');
