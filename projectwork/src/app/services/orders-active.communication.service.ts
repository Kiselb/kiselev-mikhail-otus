import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersActiveCommunicationService {

  public ordersRequest: EventEmitter<any> = new EventEmitter<any>();
  public ordersResponse: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  request(): void {
    this.ordersRequest.emit();
  }
  response(data): void {
    this.ordersResponse.emit(data);
  }
}
