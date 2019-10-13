import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersHistoryCommunicationService {

  public historyRequest: EventEmitter<any> = new EventEmitter<any>();
  public historyResponse: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  request(criteria: string): void {
    this.historyRequest.emit(criteria);
  }
  response(data): void {
    this.historyResponse.emit(data);
  }
}
