import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private clientDataSource = new BehaviorSubject<any>([]);
  currentClientData = this.clientDataSource.asObservable();

  constructor() { }

  updateClientData(data: any) {
    this.clientDataSource.next(data);
  }
}
