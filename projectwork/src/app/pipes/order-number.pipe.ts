import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderNumber'
})
export class OrderNumberPipe implements PipeTransform {

  transform(value: number): string { // , ...args: any[]
    if (value !== undefined && value !== null) {
      return ("00000000" + value.toString()).slice(-7);
    }
    return null;
  }
}
