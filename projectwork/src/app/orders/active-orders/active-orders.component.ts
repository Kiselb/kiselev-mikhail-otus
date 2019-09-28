import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

  mockData = [
    {
      orderId: 713123400,
      created: "01-01-2019",
      blocked: true,
      accepted: true,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123401,
      created: "01-01-2019",
      blocked: true,
      accepted: true,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123402,
      created: "01-01-2019",
      blocked: true,
      accepted: true,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123403,
      created: "01-01-2019",
      blocked: true,
      accepted: true,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123404,
      created: "01-01-2019",
      blocked: false,
      accepted: true,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123405,
      created: "01-08-2019",
      blocked: false,
      accepted: true,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123406,
      created: "01-08-2019",
      blocked: true,
      accepted: false,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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
      orderId: 713123407,
      created: "01-08-2019",
      blocked: false,
      accepted: false,
      shipDate: "01-01-2019",
      shipAddress: "Санкт-Петербург Московский пр., д.1, Литера А",
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

  ctrlSeparateMode = new FormControl('');
  currentOrderId: number; // Current Order ID
  
  getMockFiles() {
    return this.mockData.filter((order) => (true));
  }
  getCurrentOrderId(): number { console.log(this.currentOrderId); return this.currentOrderId; }
  setCurrentOrderId(orderID: number) { this.currentOrderId = orderID; }

  constructor() { }

  ngOnInit() {
  }

}
