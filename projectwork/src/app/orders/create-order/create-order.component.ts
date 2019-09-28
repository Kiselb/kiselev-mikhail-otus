import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  mockFiles = [
    {
      key: 1,
      state: true,
      path: "C:\\Orders\\Legion\\2019\\09\\Konica_Minolta\\Order_201909_1.xlsx", // Loaded full file name
      sheets: [
        {
          name: "Лист1",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
            {
              row: 10,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 20,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 21,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 22,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 23,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 24,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 25,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 26,
              description: "Недопустимое значение в столбце количеств"
            },
          ],
        }, // Sheet
        {
          name: "Лист2",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
            {
              row: 10,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 20,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 21,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 22,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 23,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 24,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 25,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 26,
              description: "Недопустимое значение в столбце количеств"
            },
          ],
        }, // Sheet
      ], // File sheets
    }, // File
    {
      key: 2,
      state: true,
      path: "C:\\Orders\\Legion\\2019\\09\\Konica_Minolta\\Order_201909_2.xlsx", // Loaded full file name
      sheets: [
        {
          name: "Лист1",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
            {
              row: 10,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 20,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 21,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 22,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 23,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 24,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 25,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 26,
              description: "Недопустимое значение в столбце количеств"
            },
          ],
        }, // Sheet
        {
          name: "Лист2",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
            {
              row: 10,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 20,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 21,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 22,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 23,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 24,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 25,
              description: "Недопустимое значение в столбце количеств"
            },
            {
              row: 26,
              description: "Недопустимое значение в столбце количеств"
            },
          ],
        }, // Sheet
      ], // File sheets
    }, // File
    {
      key: 3,
      state: true,
      path: "C:\\Orders\\Legion\\2019\\09\\Konica_Minolta\\Order_201909_1.xlsx", // Loaded full file name
      sheets: [
        {
          name: "Лист1",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
          ],
        }, // Sheet
        {
          name: "Лист2",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
          ],
        }, // Sheet
      ], // File sheets
    }, // File
    {
      key: 4,
      state: true,
      path: "C:\\Orders\\Legion\\2019\\09\\Konica_Minolta\\Order_201909_2.xlsx", // Loaded full file name
      sheets: [
        {
          name: "Лист1",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
          ],
        }, // Sheet
        {
          name: "Лист2",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
          ],
        }, // Sheet
      ], // File sheets
    }, // File
    {
      key: 5,
      state: false,
      path: "C:\\Orders\\Legion\\2019\\09\\Konica_Minolta\\Order_201909_4.xlsx", // Loaded full file name
      sheets: [
        {
          name: "Лист1",
          rowFirst: 1,
          rowLast: 100,
          columnArticle: 1,
          columnQuanity: 2,
          article: 0, // Product article type: 0 - Manufacturer 1 - Legion
          mode: 0, // Sheet structure definition mode: 0 - auto 1 - manual
          errors: [
          ],
        }, // Sheet
      ], // File sheets
    }, // File
  ];
  getMockFiles() {
    return this.mockFiles.filter((file) => (this.getFileErrorStatus(file) || (!this.getFileErrorStatus(file) && !this.getViewMode())));
  }
  getFileImportStatus(file) {
    return file.state;
  }
  getFileErrorStatus(file) {
    return file.sheets.reduce((accumulator, sheet) => accumulator && (sheet.errors.length === 0) , true);
  }
  getFileSheetsInfo(file) {
    return file.sheets.reduce((accumulator, sheet, index, array) => { const delimiter = (index === (array.length - 1))?(''):(', '); return (accumulator + sheet.name + delimiter); }, '');
  }

  key: number; // Current file key
  
  getCurrentFile() { return this.key; }
  setCurrentFile(key) { this.key = key; }

  hideFailed = new FormControl('');

  getViewMode() {
    return this.hideFailed.value;
  }

  constructor() { }

  ngOnInit() {
  }
}
