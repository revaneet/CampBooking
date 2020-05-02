import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CampFilter } from '../models/campFilter.interface';

@Injectable()
export class DataService {

  campFilter: CampFilter;

  constructor() { }

  set(campFilter: CampFilter) {
    this.campFilter = campFilter;
  }
  get(){
      return this.campFilter;
  }

}