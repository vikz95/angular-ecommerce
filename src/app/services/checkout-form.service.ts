import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  constructor() {
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    // wraps data as rxjs observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    const data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    // wraps data as rxjs observable
    return of(data);
  }
}
