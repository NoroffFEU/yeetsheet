import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

const [cols, rows] = userColsAndRows();

spreadsheetContainer.append(spreadsheet(cols, rows));
