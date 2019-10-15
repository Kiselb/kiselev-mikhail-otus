import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOrderInfo } from '../../store/state';
import { OrdersHistoryCommunicationService } from '../../services/orders-history.communication.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  historyMode: number = 0; // View history mode: 0 - All (limited by 1 year), 1 - Search result by text, 2 - Search result by number (part of order number)
  criteria: string = "";

  historyData: any[];
  taxonomy: any[];

  // Data Example
  //
  // {
  //   OrderID: 713123456,
  //   CreateDate: "01-08-2019",
  //   UserName: "Ivanov I.I.",
  //   SumValue: "1'000 000.00",
  //   SumCurrency: "RUB",
  //   CustomerRefNo: "12345-00",
  //   CustomerComments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  //   TaxonomyWeek: "2", // Важно! Таксономию можно вычислить по [created], но номер недели определяется бизнес-правилами на стороне backend
  //   TaxonomyYear: "2019"
  // },

  ctrlSearch = new FormControl('');
  ctrlSeparateMode = new FormControl('');
  
  constructor(private ordersHistoryCommunicationService: OrdersHistoryCommunicationService) { }

  buildTaxonomy(data: any[]): any[] { //IOrderInfo[]
    return ((data.reduce((accumulator, value) => {
      const index = accumulator.findIndex((element) => element.TaxonomyYear === value.TaxonomyYear);
      if (index < 0) {
        accumulator.push({ TaxonomyYear: value.TaxonomyYear, TaxonomyWeek: []});
      } else {
        if (accumulator[index].TaxonomyWeek.indexOf(value.TaxonomyWeek) < 0) {
          accumulator[index].TaxonomyWeek.push(value.TaxonomyWeek);
        }
      }
      return accumulator;
    }, [])).map((element) => {
      element.TaxonomyWeek.sort((element1, element2) => {
        if (element1 < element2) return 1;
        if (element1 > element2) return -1;
        return 0;
      });
      return element;
    })).sort((element1, element2) => {
      if (element1.TaxonomyYear < element2.TaxonomyYear) return 1;
      if (element1.TaxonomyYear > element2.TaxonomyYear) return -1;
      return 0;
    });  
  }

  getWeekYearOrders(year, week) {
    return (this.historyData.filter((element) => element.TaxonomyYear === year && element.TaxonomyWeek === week)).sort((element1, element2) => {
      if (element1.OrderID < element2.OrderID) return 1;
      if (element1.OrderID > element2.OrderID) return -1;
      return 0;
    });
  }

  viewSelectedOrders(): any[] {
    let pattern: string = this.ctrlSearch.value;
    pattern = pattern.trim();
    if (pattern.length > 0) {
      // ToDo
      // if (!/\D/.test(pattern)) { // Select orders for which the number is accordance to the pattern
      //
      // } else { // Select orders for which pattern is matched for any text order attributes, include articles text attributes
      //
      // }
      this.criteria = pattern;
      this.ordersHistoryCommunicationService.request(this.criteria);
    }
    return [];
  }
  viewAllOrders() {
    this.criteria = "";
    this.ctrlSearch.setValue("");
    this.ordersHistoryCommunicationService.request(this.criteria);
  }

  ngOnInit() {
    this.ordersHistoryCommunicationService.historyResponse.subscribe(data => {
      this.historyData = data;
      this.taxonomy = this.buildTaxonomy(data); 
    });
    this.ordersHistoryCommunicationService.request(this.criteria);
  }
}
