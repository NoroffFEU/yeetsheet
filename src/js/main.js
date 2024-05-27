import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';

const [cols, rows] = userColsAndRows();

spreadsheet(cols, rows);
