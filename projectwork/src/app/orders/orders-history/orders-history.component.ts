import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  historyMode: number = 0; // View history mode: 0 - All (limited by 1 year), 1 - Search result by text, 2 - Search result by number (part of order number)
  searchPattern: string = "";

  taxonomy: {}

  mockData = [
    {
      orderId: 713123456,
      created: "01-01-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "1", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123457,
      created: "01-01-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "1", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123458,
      created: "01-01-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "1", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123459,
      created: "01-01-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "1", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123456,
      created: "01-01-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "1", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123457,
      created: "01-08-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "2", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123458,
      created: "01-08-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "2", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
    {
      orderId: 713123456,
      created: "01-08-2019",
      user: "Ivanov I.I.",
      sumValue: "1'000 000.00",
      sumCurrency: "RUB",
      refNo: "12345-00",
      comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      taxonomy: {
        week: "2", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
        year: "2019"
      },
    },
  ];
  search = new FormControl('');

  constructor() { }

  buildTaxonomy(data: any[]): any[] {
    return ((data.reduce((accumulator, value) => {
      const index = accumulator.findIndex((element) => element.year === value.taxonomy.year);
      if (index < 0) {
        accumulator.push({ year: value.taxonomy.year, weeks: []});
      } else {
        if (accumulator[index].weeks.indexOf(value.taxonomy.week) < 0) {
          accumulator[index].weeks.push(value.taxonomy.week);
        }
      }
      return accumulator;
    }, [])).map((element) => {
      element.weeks.sort((element1, element2) => {
        if (element1 < element2) return 1;
        if (element1 > element2) return -1;
        return 0;
      });
      return element;
    })).sort((element1, element2) => {
      if (element1.year < element2.year) return 1;
      if (element1.year > element2.year) return -1;
      return 0;
    });  
  }

  getWeekYearOrders(year, week) {
    return (this.mockData.filter((element) => element.taxonomy.year === year && element.taxonomy.week === week)).sort((element1, element2) => {
      if (element1.orderId < element2.orderId) return 1;
      if (element1.orderId > element2.orderId) return -1;
      return 0;
    });
  }

  serachOrders() {}

  ngOnInit() {
    this.taxonomy = this.buildTaxonomy(this.mockData);
    console.log(this.taxonomy);
  }

}
